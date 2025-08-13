import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { images } from "@/constants";
import { StyleSheet } from "react-native";
import { useAuthStore } from "@/store/AuthStore";
import { useProfileStore } from "@/store/ProfileStore";
import useWalletStore from "@/store/WalletStore";

export default function App() {

  const {login, logout, isLoading, setLoading, isAuthenticated } = useAuthStore((state) => state);
  const setProfile = useProfileStore((state) => state.setProfile);
const setHideWallet = useWalletStore((state) => state.setHideWallet);
  useEffect(() => {
    const getData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("accessToken");
        const userProfile = await AsyncStorage.getItem('userProfile');
        const hideStatus = await AsyncStorage.getItem('hideBalance');
        const user = userProfile ? JSON.parse(userProfile) : null;

        if (storedToken) {
          if (user) {
            console.log("redux user", user)
            setProfile(user);
          }
          login(storedToken)
          setHideWallet(hideStatus)
        } else {
          logout();
        }

      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
      
    };

    getData();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue">
        <StatusBar backgroundColor="#003366" style="light" />
        <View className="items-center justify-center">
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* <Text className="text-white font-mbold text-3xl mt-1">Buzzycash</Text> */}
        </View>
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(protected)/(routes)/Home" : "/Splash"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 150,
  },
});
