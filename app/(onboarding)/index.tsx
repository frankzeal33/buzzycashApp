import { router } from 'expo-router';
import React, { useRef, useState, memo, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '@/components/GradientButton';
import { useThemeStore } from '@/store/ThemeStore';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Take risk with that counts',
    subtitle: 'The bigger the risk the bigger the wins, risk takers win often. Take The Risk And Win Big!',
    image: images.onboardPic1
  },
  {
    id: 2,
    title: 'Stake your winnings with ease',
    subtitle: 'You are on your path to win your big lottery. Stake Daily To Be The Next Winner.',
    image: images.onboardPic2
  }
];

type OnboardType = typeof slides[0];

const Slide = memo(({ item, statusBarHeight, statusBarBottom, onRegister, onLogin, currentSlideIndex, goToSlide }: {
  item: OnboardType;
  statusBarHeight: number;
  statusBarBottom: number;
  onRegister: () => void;
  onLogin: () => void;
  currentSlideIndex: number;
  goToSlide: (index: number) => void;
}) => {
  return (
    <LinearGradient colors={['#FFAE4D', '#EF4734', '#EF4734']} style={styles.container} start={{ x: 0, y: 0.1 }} end={{ x: 0, y: 1 }}>
      <View className='flex-1' style={{ marginTop: statusBarHeight }}>
        <View className='mt-10 mb-2'>
          <StatusBar style="light" />
          <View className='p-4 min-h-24 w-screen'>
            <View className='items-center justify-center mx-auto w-[85%]'>
              <Text className={`font-mblack text-xl text-center text-white`}>{item.title}</Text>
              <Text className={`font-mmedium text-sm text-center text-white mt-3`}>{item.subtitle}</Text>
            </View>
          </View>
        </View>

        <View className={`h-full w-screen justify-end flex-1 items-center`}>
          <ImageBackground source={item.image} resizeMode="cover" className='w-full flex-1'>
            <View className="justify-center items-center mt-auto w-full mx-auto max-w-[75%]" style={{ marginBottom: statusBarBottom }}>
              <View className='w-full gap-6'>
                <GradientButton title="Register" handlePress={onRegister} containerStyles="w-full border border-white" textStyles='text-white' />
                <GradientButton title="Log In" handlePress={onLogin} containerStyles="w-full border border-white" gradientColors={['#323746', '#323746', '#111625']} textStyles='text-white' />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, width: "80%" }}>
                {slides.map((_, i) => (
                  <TouchableOpacity onPress={() => goToSlide(i)} key={i} className='w-1/2 py-4'>
                    <View className={`w-full h-1 rounded-full ${currentSlideIndex === i ? 'bg-orange' : 'bg-white'}`} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </LinearGradient>
  );
});

const Onboarding = () => {
  
  const { theme } = useThemeStore();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top + 10;
  const statusBarBottom = insets.bottom + 5;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToSlide = useCallback((index: number) => {
    ref?.current?.scrollToOffset({ offset: index * width });
    setCurrentSlideIndex(index);
  }, []);

  // Move to second slide
  useEffect(() => {
    if (currentSlideIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        goToSlide(1);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleRegister = () => {
    router.push('/(onboarding)/Register');
  };

  const handleLogin = () => {
    router.push('/(onboarding)/LogIn');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['left', 'right']} className='flex-1'>
        <StatusBar style='light' />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={slides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Slide
              item={item}
              statusBarHeight={statusBarHeight}
              statusBarBottom={statusBarBottom}
              onRegister={handleRegister}
              onLogin={handleLogin}
              currentSlideIndex={currentSlideIndex}
              goToSlide={goToSlide}
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: "100%"
  }
});

export default Onboarding;
