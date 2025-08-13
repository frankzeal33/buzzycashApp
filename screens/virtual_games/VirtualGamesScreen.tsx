import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
    const [showModal, setShowModal] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [loadingGames, setLoadingGames] = useState(false)

    const purchase = () => {
        setShowSuccess(true)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setShowSuccess(false)
    }

    const goto = () => {

    }

    const virtualGames = async () => {
        setLoadingGames(true)
        try {

            const result = await axiosClient.get("/virtual/get-games")

            // setGames(result.data?.data?.data?.games || [])
            console.log("v-games",result.data.data.gamesResponse)

        } catch (error: any) {

        } finally {
           setLoadingGames(false)
        }
    }

    useEffect(() => {
        virtualGames()
    }, [])

    const renderGameCard = ({item, index}: {item: any, index: number}) => (
        <TransparentGameCard item={item} index={index} handlePress={() => goto()}/>
    )

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={['left', 'right']} className='bg-blue flex-1'>
        <ImageBackground source={images.lotteryBg} resizeMode="cover" className='flex-1' style={{paddingTop: top, paddingBottom: Bottom}}>
            <View className='flex-1 px-4'>
                <Header icon home onpress={() => router.back()}/>
                <FlatList
                    ListHeaderComponent={() => (
                        <GameTitleBox title='Virtual Games'/>
                    )}
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
                        : {gap: 15, paddingBottom: 100, paddingTop: 30}
                    }
                    ListEmptyComponent={() => (
                    <View>
                        <View className="w-full items-center mx-auto justify-center max-w-64">
                            {/* <Image source={images.InvestmentEmpty} className='mx-auto'/> */}
                            <Text className="text-2xl text-center text-blue mt-4 font-rbold">Games have not been added yet</Text>
                        </View>
                    </View>
                    )}
                />
                
            </View>
            <Menu/>

        </ImageBackground>
        </SafeAreaView>
        <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

export default VirtualGamesScreen