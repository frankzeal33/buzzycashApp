import { StatusBar } from 'expo-status-bar';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useAnimatedReaction,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import Header from '@/components/Header';
import { images } from '@/constants';
import { router } from 'expo-router';
import GameCard from '@/components/GameCard';
import LiveWinnerTicker from '@/components/LiveWinnerTicker';
import { useThemeStore } from '@/store/ThemeStore';
import { axiosClient } from '@/globalApi';
import { Skeleton } from 'moti/skeleton';
import { useSkeletonCommonProps } from '@/utils/SkeletonProps';
import { Ionicons } from '@expo/vector-icons';
import { ticketGameType } from '@/types/types';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingBalanceCard from '@/components/landing/LandingBalanceCard';

type StickySectionProps = {
  theme: any;
  itemWidth: number;
  loadingLeaderBoard: boolean;
};

type ListHeaderProps = {
  theme: any;
  width: number;
  itemWidth: number;
  fullWidth: number;
  loadingLeaderBoard: boolean;
  notificationCount: number;
  onStickySectionLayout: (y: number) => void;
};

const sliderImages = [images.card1, images.card2, images.card1, images.card3];
const featuredGames = [images.featured1, images.featured2, images.featured3, images.featured4];

const winnerMessages = [
  { phone: '+234********490', amount: 7000, timestamp: new Date() },
  { phone: '+234********123', amount: 5000, timestamp: new Date(Date.now() - 2 * 60 * 1000) },
  { phone: '+234********678', amount: 10000, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
];

const CarouselComponent = memo(
  ({
    width,
    itemWidth,
    fullWidth,
    theme,
  }: {
    width: number;
    itemWidth: number;
    fullWidth: number;
    theme: any;
  }) => (
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
      onConfigurePanGesture={(panGesture) => {
        panGesture.activeOffsetX([-10, 10]);
        panGesture.failOffsetY([-5, 5]);
      }}
      renderItem={({ item }) => (
        <Pressable
          style={{
            width: itemWidth,
            height: 140,
            alignSelf: 'center',
            borderRadius: 14,
            overflow: 'hidden',
            backgroundColor: theme.dark ? theme.colors.inputBg : '#1F1F1F',
            borderWidth: theme.dark ? 1 : 0,
            borderColor: theme.dark ? theme.colors.inputBg : undefined,
          }}
          onPress={() => router.push("/(landing)/LandingLottery")}
        >
          <Image
            source={item}
            style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 14 }}
          />
        </Pressable>
      )}
    />
  ),
);

const StickySection = memo(
  ({ theme, itemWidth, loadingLeaderBoard }: StickySectionProps) => (
    <View style={{ backgroundColor: theme.colors.background }}>
      <View className='w-full flex-row items-center justify-between mt-2 mb-1'>
        <Text className='text-sm font-mbold' style={{ color: theme.colors.text }}>Featured Games</Text>
      </View>

      {/* Horizontal featured games strip */}
      <FlatList
        nestedScrollEnabled
        horizontal
        scrollEnabled
        data={featuredGames}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={{
              width: itemWidth,
              height: 95,
              alignSelf: 'center',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: theme.dark ? theme.colors.inputBg : '#1F1F1F',
              borderWidth: theme.dark ? 1 : 0,
              borderColor: theme.dark ? theme.colors.inputBg : undefined,
              marginBottom: theme.dark ? 2 : 0,
            }}
            onPress={() => router.push('/(landing)/LandingTicketGames')}
          >
            <Image
              source={item}
              style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 8 }}
            />
          </Pressable>
        )}
      />

      {/* Live winner ticker */}
      <LiveWinnerTicker winnerMessages={winnerMessages} loading={loadingLeaderBoard} />
    </View>
  ),
);

const ListHeader = memo(
  ({
    theme,
    width,
    itemWidth,
    fullWidth,
    loadingLeaderBoard,
    notificationCount,
    onStickySectionLayout,
  }: ListHeaderProps) => (
    <View style={{ backgroundColor: theme.colors.background }}>
      {/* Scrolls away */}
      <LandingBalanceCard />

      <CarouselComponent
        width={width}
        itemWidth={itemWidth}
        fullWidth={fullWidth}
        theme={theme}
      />

      {/* Inline StickySection — measures its Y within the scroll content */}
      <View onLayout={(e) => onStickySectionLayout(e.nativeEvent.layout.y)}>
        <StickySection
          theme={theme}
          itemWidth={itemWidth}
          loadingLeaderBoard={loadingLeaderBoard}
        />
      </View>
    </View>
  ),
);

const index = () => {

  const { theme } = useThemeStore();
  const { bottom } = useSafeAreaInsets();
  const Bottom = bottom + 55;

  const screen = useWindowDimensions();
  const fullWidth = screen.width;
  const width = fullWidth - 32;
  const itemWidth = width * 0.85;

  const skeletonProps = useSkeletonCommonProps();
  const [loadingTickets, setLoadingTickets] = useState(false);
  const loadingList = new Array(3).fill(null);
  const [games, setGames] = useState<ticketGameType[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loadingLeaderBoard, setLoadingLeaderBoard] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // --- FIX: track whether overlay is active in JS state ---
  const [overlayActive, setOverlayActive] = useState(false);

  const scrollY = useSharedValue(0);
  const stickySectionOffsetY = useSharedValue(9999);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // --- FIX: react to scroll crossing the sticky threshold ---
  useAnimatedReaction(
    () => scrollY.value >= stickySectionOffsetY.value,
    (isActive, prev) => {
      if (isActive !== prev) {
        runOnJS(setOverlayActive)(isActive);
      }
    },
  );

  // --- FIX: pointerEvents via animated style removed; only opacity remains ---
  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [stickySectionOffsetY.value - 4, stickySectionOffsetY.value],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  const AllTickets = async () => {
    setLoadingTickets(true);
    try {
      // const result = await axiosClient.get('/tickets/all-games');
      // setGames(result.data?.games || []);
      // console.log("ticket=",result.data)
    } catch (error: any) {
      console.log('t-error', error.response?.data || error.message);
    } finally {
      setLoadingTickets(false);
    }
  };

  const getUnReadNotificationCount = async () => {
    try {
      // const result = await axiosClient.get('/notification/unread');
      // setNotificationCount(result.data?.unreadCount || 0);
    } catch (_) {}
  };

  const leaderBoard = async () => {
    setLoadingLeaderBoard(true);
    try {
      // await axiosClient.get('/result/leaderboard');
    } catch (_) {
    } finally {
      setLoadingLeaderBoard(false);
    }
  };

  useEffect(() => {
    AllTickets();
    leaderBoard();
    getUnReadNotificationCount();
  }, []);

  const handleStickySectionLayout = useCallback((y: number) => {
    stickySectionOffsetY.value = y;
  }, []);

  const renderListHeader = useCallback(
    () => (
      <ListHeader
        theme={theme}
        width={width}
        itemWidth={itemWidth}
        fullWidth={fullWidth}
        loadingLeaderBoard={loadingLeaderBoard}
        notificationCount={notificationCount}
        onStickySectionLayout={handleStickySectionLayout}
      />
    ),
    [theme, width, itemWidth, fullWidth, loadingLeaderBoard, notificationCount, handleStickySectionLayout],
  );

  const renderItem: ListRenderItem<ticketGameType> = useCallback(
    ({ item, index }) => (
      <GameCard
        item={item}
        index={index}
        handlePress={() =>
          router.push({
            pathname: '/(protected)/(routes)/TicketDetails',
            params: { ticketData: JSON.stringify(item) },
          })
        }
      />
    ),
    [],
  );

  const ListEmpty = useCallback(
    () =>
      loadingTickets ? (
        <View style={{ width: '100%', justifyContent: 'center', marginTop: 32 }}>
          <Skeleton.Group show>
            {loadingList.map((_, i) => (
              <View key={i} style={{ width: '100%', marginBottom: 16 }}>
                <Skeleton height={30} width={'100%'} {...skeletonProps} />
              </View>
            ))}
          </Skeleton.Group>
        </View>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
          <Ionicons name="ticket-outline" size={24} color="#EF9439" />
          <Text
            style={{ fontSize: 18, textAlign: 'center', marginTop: 16, color: theme.colors.text }}
          >
            There is no ticket games yet.
          </Text>
        </View>
      ),
    [loadingTickets, theme, skeletonProps],
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: Bottom }}>

        <LandingHeader profile notificationCount={notificationCount}/>

        <Animated.FlatList
          data={games}
          keyExtractor={(item) => item.game_id}
          renderItem={renderItem}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={ListEmpty}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
        />

        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 16,
              right: 16,
              top: 0,
              zIndex: 10,
            },
            overlayStyle,
          ]}
          pointerEvents={overlayActive ? 'box-none' : 'none'}
        >
          <Header
            profile
            notificationCount={notificationCount}
          />
          <StickySection
            theme={theme}
            itemWidth={itemWidth}
            loadingLeaderBoard={loadingLeaderBoard}
          />
        </Animated.View>

      </View>

      <StatusBar
        style={theme.dark ? 'light' : 'dark'}
        backgroundColor={theme.colors.background}
      />
    </SafeAreaView>
  );
};

export default index;
