import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
// import { Provider} from 'react-redux'
// import { store } from "@/redux/store"
// import { ToastProvider } from 'react-native-toast-notifications'
// import AntDesign from '@expo/vector-icons/AntDesign';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import {
//   BottomSheetModalProvider
// } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
// import { StripeProvider} from "@stripe/stripe-react-native"
import * as Linking from 'expo-linking';

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
    // <Provider store={store}>
    //   <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}>
        <GestureHandlerRootView style={styles.container}>
          {/* <BottomSheetModalProvider> */}
            {/* <ToastProvider
              placement="top"
              animationType='slide-in'
              successColor="#FFE1CC"
              dangerColor="#FFE1CC"
              warningColor="#FFE1CC"
              normalColor="#FFE1CC"
              textStyle={{ color: "#003366" }}
              offset={70}
              successIcon={<AntDesign name="checkcircle" size={16} color="#003366" />}
              dangerIcon={<AntDesign name="closecircle" size={16} color="#003366" />}
              warningIcon={<Ionicons name="warning" size={16} color="#003366" />}
            > */}
              <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index"/>
                  <Stack.Screen name="Splash"/>
                  <Stack.Screen name="(onboarding)"/>
                  <Stack.Screen name="(tabs)"/>
                  <Stack.Screen name="(routes)"/>
              </Stack>
            {/* </ToastProvider> */}
          {/* </BottomSheetModalProvider> */}
        </GestureHandlerRootView>
    //   </StripeProvider>
    // </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  }
});
