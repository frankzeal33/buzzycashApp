import { ActivityIndicator, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import { router } from 'expo-router'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import GameTitleBox from '@/components/GameTitleBox'
import TransparentGameCard from '@/components/TransparentGameCard'
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const games: any = [
    // {
    //     id: "1",
    //     title: "Lucky Scratch",
    //     image: images.luckyScratch,
    //     route: "/(landing)"
    // },
    // {
    //     id: "2",
    //     title: "Aviator",
    //     image: images.aviator,
    //     route: "/(landing)"
    // },
    {
        id: "3",
        title: "Card",
        image: images.card,
        route: "/(landing)/LandingCard"
    },
    {
        id: "4",
        title: "Dice",
        image: images.dice,
         route: "/(landing)/LandingDice"
    },
    {
        id: "5",
        title: "Coin",
        image: images.coin,
         route: "/(landing)/LandingCoin"
    },
    {
        id: "6",
        title: "Hot Cold",
        image: images.hotCold,
        route: "/(landing)/LandingHotCold"
    },
    {
        id: "7",
        title: "Lucky Box",
        image: images.box,
        route: "/(landing)/LandingLuckyBox"
    },
    {
        id: "8",
        title: "Reel Streak",
        image: images.fruit,
         route: "/(landing)/LandingReelStreak"
    },
    {
        id: "9",
        title: "RPS Bet",
        image: images.betting,
        route: "/(landing)/LandingRpsBet"
    },
    {
        id: "10",
        title: "Spin 2 Win",
        image: images.spinToWin,
        route: "/(landing)/LandingSpin"
    },
]

const VirtualGamesScreen = () => {

    const { theme } = useThemeStore();
    const { top, bottom } = useSafeAreaInsets()
    const Bottom = bottom + 57
    const [loadingGames, setLoadingGames] = useState(false)

    const [loadingGame, setLoadingGame] = useState(false)
    const [currentGame, setCurrentGame] = useState<any>(null)

   const renderGameCard = ({ item, index }: { item: any; index: number }) => (
        <TransparentGameCard
            item={item}
            index={index}
            loadingGame={loadingGame}
            currentGame={currentGame}
            setLoadingGame={setLoadingGame}
            setCurrentGame={setCurrentGame}
        />
    )

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={['left', 'right']} className='bg-blue flex-1'>
        <ImageBackground source={images.lotteryBg} resizeMode="cover" className='flex-1' style={{paddingTop: top}}>
            <View className='flex-1 px-4'>
                <Header icon onpress={() => router.back()}/>
                <View className='py-4'>
                    <GameTitleBox title='Virtual Games'/>
                </View>
                {loadingGames ? (
                    <ActivityIndicator size="large" color="#EF9439" />
                ) : (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={games}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderGameCard}
                        columnWrapperStyle={{gap: 6, justifyContent: 'space-between', width: '100%'}}
                        contentContainerStyle={
                            games.length === 0
                            ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
                            : {gap: 15, paddingBottom: bottom + 16}
                        }
                        ListEmptyComponent={() => (
                            <View className='flex-1'>
                                <View className="w-full items-center mx-auto justify-center my-6 max-w-64 flex-1">
                                    <MaterialIcons name="games" size={30} color="#EF9439" className="mx-auto"/>
                                    <Text className="text-2xl text-center text-brown-500 mt-4 font-rbold">No Virtual Games Found.</Text>
                                </View>
                            </View>
                        )}
                    />
                )}
                
            </View>

        </ImageBackground>
        </SafeAreaView>
        <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

export default VirtualGamesScreen