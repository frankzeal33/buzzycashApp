import { StatusBar } from 'expo-status-bar';
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  Pressable,
  FlatList
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StickyHeaderScrollView, useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';
import Carousel from "react-native-reanimated-carousel";
import { images } from '@/constants';
import { router } from 'expo-router';
import GameCard from '@/components/GameCard';
import LiveWinnerTicker from '@/components/LiveWinnerTicker'
import { useThemeStore } from '@/store/ThemeStore';
import { axiosClient } from '@/globalApi';
import { Skeleton } from 'moti/skeleton';
import { useSkeletonCommonProps } from '@/utils/SkeletonProps';
import { Ionicons } from '@expo/vector-icons';
import { leaderBoardType, ticketGameType } from '@/types/types';
import LandingBalanceCard from '@/components/landing/LandingBalanceCard';
import LandingHeader from '@/components/landing/LandingHeader';
import VirtualGameCard from '@/components/landing/VirtualGameCard';

const sliderImages = [
	images.card1,
  images.card2,
	images.card1,
  images.card3
];

const featuredGames = [
	images.featured1,
	images.featured2,
	images.featured3,
	images.featured4,
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
          onPress={() => router.push("/(landing)/Lottery")}
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


const index = () => {

  const { theme } = useThemeStore();
  const { bottom } = useSafeAreaInsets()

  const [parallaxHeight, setParallaxHeight] = useState(275);
  const SNAP_START_THRESHOLD = 10;
  const headerMeasured = useRef(false);

  const screen = useWindowDimensions();
  const fullWidth = screen.width
  const width = fullWidth - 32
  const itemWidth = width * 0.85;  // 85% of screen width for item

  const skeletonProps = useSkeletonCommonProps();
  const [loadingTickets, setLoadingTickets] = useState(false)
  const loadingList = new Array(3).fill(null)
  const [games, setGames] = useState<ticketGameType[]>([])
  const [leaderBoardItems, setLeaderBoardItems] = useState<leaderBoardType[]>([])
  const [notificationCount, setNotificationCount] = useState(0);
  const [loadingLeaderBoard, setLoadingLeaderBoard] = useState(false);
  const [virtualGames, setVirtualGames] = useState([])
  const [loadingVirtualGames, setLoadingVirtualGames] = useState(false)
  const dummy = new Array(5).fill(null)
  
  const AllTickets = async () => {
    setLoadingTickets(true)
    try {

      const result = await axiosClient.get("/ticket/games")

      setGames(result.data?.results?.games || [])
      console.log("tickets", result.data?.results?.games)

    } catch (error: any) {

    } finally {
      setLoadingTickets(false)
    }
  }

  const getVirtualGames = async () => {
    setLoadingVirtualGames(true)
    try {

      const result = await axiosClient.get("/virtual")

      setVirtualGames(result.data?.data || [])
      console.log("v-games",result.data.data)

    } catch (error: any) {

    } finally {
      setLoadingVirtualGames(false)
    }
  }

  useEffect(() => {
    AllTickets()
    leaderBoard()
    getUnReadNotificationCount()
    getVirtualGames()
  }, [])

  const getUnReadNotificationCount = async () => {
    try {
    //   const result = await axiosClient.get('/notification/unread')
    //   console.log("noti=", result.data)
    //   setNotificationCount(result.data?.unreadCount || 0)

    } catch (error: any) {
      
    }
  };

  const leaderBoard = async () => {
    setLoadingLeaderBoard(true)
    try {

    //   const result = await axiosClient.get("/result/leaderboard")

    //   setLeaderBoardItems(result.data?.items || [])
    //   console.log("this is")
    //   console.log("leader=", result.data)

    } catch (error: any) {

    } finally {
      setLoadingLeaderBoard(false)
    }
  }
  
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

  const renderGames = ({item, index}: {item: ticketGameType, index: number}) => (
    <GameCard item={item} index={index} handlePress={() => router.push("/(onboarding)/LogIn")}/>
  )

  const renderVirtualGameCard = ({ item, index }: { item: any; index: number }) => (
    <VirtualGameCard
      item={item}
      index={index}
    />
  )

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='flex-1' style={{ backgroundColor: theme.colors.background}}>
      <View className='flex-1 px-4'>
        <LandingHeader profile notificationCount={notificationCount}/>
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
                <LandingBalanceCard />
              </View>

              {/* first carousel */}
              <View>
                <CarouselComponent width={width} itemWidth={itemWidth} fullWidth={fullWidth} theme={theme}/>
              </View>
            </View>
          )}

          renderTabs={() => (
            <View style={{ backgroundColor: theme.colors.background}}>
               {/* Virtual Games */}
              <View>
                <View className='w-full flex-row items-center justify-between mt-2 mb-1'>
                  <Text className='text-sm font-mbold' style={{ color: theme.colors.text}}>Virtual Games</Text>
                </View>
                {loadingVirtualGames ? (
                  <FlatList
                    data={dummy}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View className="w-3" />}
                    renderItem={({ item }) => (
                      <View style={{ width: 125 }}>
                        <Skeleton.Group show={loadingVirtualGames}>
                          <Skeleton height={135} width={125} radius={8} {...skeletonProps} />
                        </Skeleton.Group>
                      </View>
                    )}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                  />
                ) : (
                  <FlatList
                    nestedScrollEnabled={true}
                    horizontal
                    scrollEnabled={true}
                    data={virtualGames}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderVirtualGameCard}
                    // contentContainerStyle={{ paddingBottom: 30 }}
                  />
                )}
              </View>
              {/* live game */}
              <LiveWinnerTicker winnerMessages={winnerMessages} loading={loadingLeaderBoard} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View>
            {loadingTickets ? (
              <View className="w-full justify-center mt-8">
                <Skeleton.Group show={loadingTickets}>
                  {loadingList.map((item, index) => (
                    <View className='w-full mb-4 flex-row items-center' key={index}>
                      <Skeleton height={30} width={'100%'} {...skeletonProps} />
                    </View>
                  ))}
                </Skeleton.Group>
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={games}
                keyExtractor={(item, index) => item.game_id}
                renderItem={renderGames}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                  games.length === 0
                      ? { flexGrow: 1, justifyContent: 'center', paddingBottom: 50, alignItems: 'center' }
                      : {paddingBottom: 0}
                }
                style={{paddingBottom: bottom}}
                ListEmptyComponent={() => (
                    <View className='flex-1'>
                    <View className="w-full items-center mx-auto justify-center my-8 max-w-64 flex-1">
                        <Ionicons name="ticket-outline" size={24} color="#EF9439" className="mx-auto"/>
                        <Text className="text-lg text-center mt-4 font-rbold" style={{color: theme.colors.text}}>There is no ticket games yet.</Text>
                    </View>
                    </View>
                )}
              /> 
            )}
          </View>
        </StickyHeaderScrollView>

        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
      </View>
    </SafeAreaView>
  );
};

export default index;
