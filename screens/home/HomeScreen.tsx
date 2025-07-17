import { StatusBar } from 'expo-status-bar';
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StickyHeaderScrollView, useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';
import Carousel from "react-native-reanimated-carousel";
import Header from '@/components/Header';
import BalanceCard from '@/components/BalanceCard';
import { images } from '@/constants';
import { Link, router } from 'expo-router';
import GameCard from '@/components/GameCard';
import LiveWinnerTicker from '@/components/LiveWinnerTicker'
import LottieView from 'lottie-react-native';
import Menu from '@/components/Menu';
import { useThemeStore } from '@/store/ThemeStore';

const sliderImages = [
	images.card1,
  images.card2,
	images.card1,
  images.card3
];

const featuredGames = [
	images.featured,
	images.featured,
	images.featured,
	images.featured,
];

const winnerMessages = [
  {
    phone: '+234********490',
    amount: 7000,
    timestamp: new Date(),
  },
  {
    phone: '+234********123',
    amount: 5000,
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  },
  {
    phone: '+234********678',
    amount: 10000,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
  },
];


const games: any = [
    {
      id: "1",
      title: "Weekend Allawee",
      amount: 200,
      expiryTime: "2025-06-15 14:30:00"
    },
    {
      id: "1",
      title: "BuzzyBall 45",
      amount: 100,
      expiryTime: "2025-06-20 14:30:00"
    },
    {
      id: "1",
      title: "Daily ChopChop",
      amount: 1000,
      expiryTime: "2025-06-13 14:30:00"
    },
    {
      id: "1",
      title: "Oil Money",
      amount: 500,
      expiryTime: "2025-06-11 14:30:00"
    },
     {
      id: "1",
      title: "Weekend Allawee",
      amount: 200,
      expiryTime: "2025-06-08 14:30:00"
    },
    {
      id: "1",
      title: "BuzzyBall 45",
      amount: 100,
      expiryTime: "2025-06-20 14:30:00"
    },
    {
      id: "1",
      title: "Daily ChopChop",
      amount: 1000,
      expiryTime: "2025-06-10 14:30:00"
    },
    {
      id: "1",
      title: "Oil Money",
      amount: 500,
      expiryTime: "2025-06-17 14:30:00"
    },
     {
      id: "1",
      title: "Weekend Allawee",
      amount: 200,
      expiryTime: "2025-06-08 14:30:00"
    },
    {
      id: "1",
      title: "BuzzyBall 45",
      amount: 100,
      expiryTime: "2025-06-09 14:30:00"
    },
    {
      id: "1",
      title: "Daily ChopChop",
      amount: 1000,
      expiryTime: "2025-06-10 14:30:00"
    },
    {
      id: "1",
      title: "Oil Money",
      amount: 500,
      expiryTime: "2025-06-11 14:30:00"
    },
  ]

  const CarouselComponent = memo(({ width, itemWidth, fullWidth, theme }: { width: number; itemWidth: number, fullWidth: number, theme: any }) => {
  return (
    <Carousel
      autoPlayInterval={5000}
      data={sliderImages}
      height={140}
      autoPlay
      loop
      pagingEnabled
      snapEnabled
      width={width}
      style={{ width }}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 1,
        parallaxScrollingOffset: fullWidth > 350 ? 47 : 40,
      }}
      renderItem={({ item }) => (
        <Pressable
          style={{
            width: itemWidth,
            height: 140,
            alignSelf: 'center',
            borderRadius: 14,
            overflow: 'hidden',
            backgroundColor: theme.dark ? theme.colors.inputBg : "#1F1F1F",
            borderWidth: theme.dark ? 1 : 0,
            borderColor: theme.dark ? theme.colors.inputBg : undefined
          }}
          onPress={() => router.push("/(protected)/(routes)/AllTickets")}
        >
          <Image
            source={item}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 14,
            }}
          />
        </Pressable>
      )}
    />
  );
});


const HomeScreen = () => {

  const { theme } = useThemeStore();
  const { bottom } = useSafeAreaInsets()
  const Bottom = bottom + 55;

  const [showSplash, setShowSplash] = useState(true);
  const [parallaxHeight, setParallaxHeight] = useState(275);
  const SNAP_START_THRESHOLD = 10;
  const headerMeasured = useRef(false);

  const screen = useWindowDimensions();
  const fullWidth = screen.width
  const width = fullWidth - 32
  const itemWidth = width * 0.85;  // 85% of screen width for item

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: parallaxHeight,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: parallaxHeight,
    snapToEdge: true,
  });

  const renderGames = ({item, index}: {item: any, index: number}) => (
    <GameCard item={item} index={index} handlePress={() => router.push({
        pathname: "/(protected)/(routes)/TicketDetails",
        params: { ticketData: JSON.stringify(item) },
    })}/>
  )

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='flex-1' style={{ backgroundColor: theme.colors.background}}>
      <View className='flex-1 px-4' style={{paddingBottom: Bottom}}>
        <Header profile/>
        <StickyHeaderScrollView
          ref={scrollViewRef}
          containerStyle={{ flex: 1 }}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          renderHeader={() => (
            <View pointerEvents="box-none" 
              onLayout={(event) => {
                if (!headerMeasured.current) {
                  const { height } = event.nativeEvent.layout;
                  setParallaxHeight(height);
                  headerMeasured.current = true;
                  console.log(height)
                }
              }}
              // style={{ height: scrollHeight }}
            >
              
              {/* balance */}
              <View>
                <BalanceCard />
              </View>

              {/* first carousel */}
              <View>
                <CarouselComponent width={width} itemWidth={itemWidth} fullWidth={fullWidth} theme={theme}/>
              </View>
            </View>
          )}

          renderTabs={() => (
            <View style={{ backgroundColor: theme.colors.background}}>
               {/* Featured Games */}
              <View>
                <View className='w-full flex-row items-center justify-between mt-2 mb-1'>
                  <Text className='text-sm font-mbold' style={{ color: theme.colors.text}}>Featured Games</Text>
                </View>
                <FlatList
                  nestedScrollEnabled={true}
                  horizontal
                  scrollEnabled={true}
                  data={featuredGames}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <Pressable style={{
                        width: itemWidth - 26,
                        height: 95,
                        alignSelf: 'center',
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor: theme.dark ? theme.colors.inputBg : "#1F1F1F",
                        borderWidth: theme.dark ? 1 : 0,
                        borderColor: theme.dark ? theme.colors.inputBg : undefined,
                        marginBottom: theme.dark ? 2 : 0,

                      }} onPress={() => router.push("/(protected)/(routes)/TicketDetails")}>
                        <Image source={item} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 8}}
                        />
                    </Pressable>
                  )}
                  // contentContainerStyle={{ paddingBottom: 30 }}
                  />
              </View>
              {/* live game */}
              <LiveWinnerTicker winnerMessages={winnerMessages}/>
            </View>
          )}

          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View>
            <FlatList
              scrollEnabled={false}
              data={games}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderGames}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                games.length === 0
                    ? { flexGrow: 1, justifyContent: 'center', paddingBottom: 50, alignItems: 'center' }
                    : {paddingBottom: 50}
              }
              ListEmptyComponent={() => (
              <View className='flex-1'>
                  <View className="w-full items-center mx-auto justify-center my-6 max-w-64 flex-1">
                      {/* <Image source={images.withdrawEmpty} className="mx-auto" resizeMode='contain'/> */}
                      <Text className="text-2xl text-center mt-4 font-rbold" style={{color: theme.colors.text}}>You have no transactions yet.</Text>
                  </View>
              </View>
              )}
          /> 
          </View>
        </StickyHeaderScrollView>

        <Modal
          transparent={true}
          visible={showSplash}
          statusBarTranslucent={true}
          onRequestClose={() => setShowSplash(false)}>
            <TouchableWithoutFeedback onPress={() => setShowSplash(false)}>
              <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                <LottieView
                  source={images.homeAnimation}
                  autoPlay
                  speed={2}
                  loop
                  style={{ width: "95%", height: "100%" }}
                />
              </View>
            </TouchableWithoutFeedback>
        </Modal>

        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
      </View>
      <Menu/>
    </SafeAreaView>
  );
};

export default HomeScreen;
