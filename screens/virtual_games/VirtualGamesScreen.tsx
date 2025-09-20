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
    {
        id: "1",
        title: "Lucky Scratch",
        image: images.luckyScratch,
        route: "/(protected)/(routes)/Home"
    },
    {
        id: "2",
        title: "Spin 2 Win",
        image: images.spinToWin,
        route: "/(protected)/(routes)/Spin2Win"
    },
    {
        id: "2",
        title: "Aviator",
        image: images.aviator,
        route: "/(protected)/(routes)/Home"
    }
]

const VirtualGamesScreen = () => {

    const { theme } = useThemeStore();
    const { top, bottom } = useSafeAreaInsets()
    const Bottom = bottom + 57
    const [loadingGames, setLoadingGames] = useState(true)
    const [games, setGames] = useState([])
    const hasFetched = useRef(false);

    const [loadingGame, setLoadingGame] = useState(false)
    const [currentGame, setCurrentGame] = useState<any>(null)

    const virtualGames = async () => {
        setLoadingGames(true)
        try {

            const result = await axiosClient.get("/virtual/get-games")

            setGames(result.data?.data || [])
            console.log("v-games",result.data.data)

        } catch (error: any) {

        } finally {
           setLoadingGames(false)
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            virtualGames()
        }
    }, []);

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
        <ImageBackground source={images.lotteryBg} resizeMode="cover" className='flex-1' style={{paddingTop: top, paddingBottom: Bottom}}>
            <View className='flex-1 px-4'>
                <Header icon home onpress={() => router.back()}/>
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
                            : {gap: 15, paddingBottom: 100}
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
            <Menu/>

        </ImageBackground>
        </SafeAreaView>
        <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

export default VirtualGamesScreen