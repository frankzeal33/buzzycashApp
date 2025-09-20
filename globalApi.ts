import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useProfileStore } from './store/ProfileStore';
import { useAuthStore } from './store/AuthStore';

const axiosClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_SERVER_URI}`,
  withCredentials: true,
});

// Attach access token to every request
axiosClient.interceptors.request.use(async (config) => {
  //  const accessToken = await SecureStore.getItemAsync("accessToken")
  const accessToken = useAuthStore.getState().token;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Handle 401 errors and try refreshing the token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    console.log("run refresh error=", error.response)
    
    const isFirstRetry = !originalRequest._retry;

    if (isUnauthorized && isFirstRetry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const refreshResponse = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URI}/auth/refresh-token`,
          { refreshToken }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        await SecureStore.setItemAsync('accessToken', newAccessToken);
        useAuthStore.getState().login(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);

        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await AsyncStorage.removeItem('userProfile');
        useAuthStore.getState().logout();

        useProfileStore.getState().clearProfile();

        router.replace('/(onboarding)/LogIn');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosClient };
