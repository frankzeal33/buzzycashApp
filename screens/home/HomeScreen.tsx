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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StickyHeaderScrollView, useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';
import Carousel from "react-native-reanimated-carousel";
import Header from '@/components/Header';
import BalanceCard from '@/components/BalanceCard';
import { images } from '@/constants';
import { Link, router } from 'expo-router';
import GameCard from '@/components/GameCard';
import LiveWinnerTicker from '@/components/LiveWinnerTicker'
import LottieView from 'lottie-react-native';

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

  const CarouselComponent = memo(({ width, itemWidth, fullWidth }: { width: number; itemWidth: number, fullWidth: number }) => {
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
        parallaxScrollingOffset: fullWidth > 350 ? 50 : 40,
      }}
      renderItem={({ item }) => (
        <Pressable
          style={{
            width: itemWidth,
            height: 140,
            alignSelf: 'center',
            borderRadius: 14,
            overflow: 'hidden',
            backgroundColor: "#1F1F1F"
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

  const [showSplash, setShowSplash] = useState(true);
  const [parallaxHeight, setParallaxHeight] = useState(275);
  const SNAP_START_THRESHOLD = 10;
  const headerMeasured = useRef(false);

  const screen = useWindowDimensions();
  const fullWidth = screen.width
  console.log("wiidth", screen.width)
  const width = fullWidth - 32
  const itemWidth = width * 0.85;  // 85% of screen width for item

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

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
    <SafeAreaView edges={['top', 'left', 'right']} className='flex-1 bg-gray-100'>
      <View className='flex-1 px-4'>
        <Header/>
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
                <CarouselComponent width={width} itemWidth={itemWidth} fullWidth={fullWidth}/>
              </View>
            </View>
          )}

          renderTabs={() => (
            <View className='bg-gray-100'>
               {/* Featured Games */}
              <View>
                <View className='w-full flex-row items-center justify-between mt-2 mb-1'>
                  <Text className='text-sm font-mbold'>Featured Games</Text>
                  <TouchableOpacity onPress={() => router.push("/(protected)/(routes)/AllTickets")}>
                    <Text className='text-sm font-mbold mt-2 text-orange'>See All</Text>
                  </TouchableOpacity>
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
                        backgroundColor: "#1F1F1F"
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
                    ? { flexGrow: 1, justifyContent: 'center', paddingBottom: 100, alignItems: 'center' }
                    : {paddingBottom: 100}
              }
              ListEmptyComponent={() => (
              <View className='flex-1'>
                  <View className="w-full items-center mx-auto justify-center my-6 max-w-64 flex-1">
                      {/* <Image source={images.withdrawEmpty} className="mx-auto" resizeMode='contain'/> */}
                      <Text className="text-2xl text-center text-blue mt-4 font-rbold">You have no transactions yet.</Text>
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
            <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>

            <LottieView
              source={images.homeAnimation}
              autoPlay
              speed={2}
              loop
              style={{ width: "95%", height: "100%" }}
            />
            </View>
        </Modal>

        <StatusBar style="dark" backgroundColor=" #E9E9E9" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
