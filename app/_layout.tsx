import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import { useThemeStore } from '@/store/ThemeStore';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
  });

 const { initializeTheme, theme, toggleTheme, preference } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const handleDeepLink = ({ url }: {url: any}) => {
      const data = Linking.parse(url);
      console.log('Received payment callback:', data);
      // router.push("/(tabs)/home")
      // e.g. data.query.status === 'success'
    };

    const sub = Linking.addEventListener('url', handleDeepLink);

    // Check if app was opened from a link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      sub.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="Splash"/>
        <Stack.Screen name="(onboarding)"/>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="(routes)"/>
      </Stack>
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              text1NumberOfLines={2}
              text2NumberOfLines={2}
              style={{ 
                backgroundColor: 'white',
                borderLeftColor: 'green',
                zIndex: 9999,
                minHeight: 55,
                height: 'auto',
                paddingVertical: 10,
              }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              text1Style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}
              text2Style={{ fontSize: 13, color: 'black' }}
            />
          ),
          error: (props) => (
            <ErrorToast
              {...props}
              text1NumberOfLines={2}
              text2NumberOfLines={2}
              style={{ 
                backgroundColor: 'white',
                borderLeftColor: '#EF4734',
                zIndex: 9999,
                minHeight: 55,
                height: 'auto',
                paddingVertical: 10,
              }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              text1Style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}
              text2Style={{ fontSize: 13, color: 'black' }}
            />
          ),
          info: (props) => (
            <BaseToast
              {...props}
              text1NumberOfLines={2}
              text2NumberOfLines={2}
              style={{ 
                backgroundColor: 'white',
                borderLeftColor: '#EF4734',
                zIndex: 9999,
                minHeight: 55,
                height: 'auto',
                paddingVertical: 10,
              }}
              contentContainerStyle={{ paddingHorizontal: 15}}
              text1Style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}
              text2Style={{ fontSize: 13, color: 'black' }}
            />
          ),
        }}
      />
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  }
});
