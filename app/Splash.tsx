import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { images } from "../constants";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const logoParts = [
  images.part1,
  images.part2,
  images.part3,
  images.part4,
  images.part5,
];

export default function Splash() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalLogoVisible, setFinalLogoVisible] = useState(false);

  useEffect(() => {
    if (currentIndex < logoParts.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // All parts done, show final logo
      setTimeout(() => {
        setFinalLogoVisible(true);
        // Navigate after final logo is shown
        setTimeout(() => {
          router.replace('/(onboarding)');
        }, 3000);
      }, 100);
    }
  }, [currentIndex]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={images.splash} resizeMode="cover" style={styles.image}>
          <View className="justify-center items-center">
            {/* Animate current part only */}
            {currentIndex < logoParts.length && (
              <Animated.Image
                key={currentIndex}
                source={logoParts[currentIndex]}
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(200)}
                style={styles.logo}
                resizeMode="contain"
              />
            )}

            {/* Final logo + Buzzycash */}
            {finalLogoVisible && (
              <View className="items-center justify-center">
                <Animated.Image
                  source={images.logo}
                  entering={FadeIn.duration(200)}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Animated.Text
                  entering={FadeIn.duration(2000).delay(800).springify()}
                  className="text-white font-mbold text-4xl mt-1"
                >
                  Buzzycash
                </Animated.Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
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
    width: 160,
    height: 160,
  },
});
