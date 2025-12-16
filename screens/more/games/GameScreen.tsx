import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import Header from '@/components/Header'
import FeaturedGameCard from '@/components/FeaturedGameCard'
import Menu from '@/components/Menu'
import GameTitleBox from '@/components/GameTitleBox'
import { useThemeStore } from '@/store/ThemeStore'

const games: any = [
    {
        id: "1",
        title: "Ticket Games",
        image: images.ticketGame,
        description: "Purchase Ticket to play",
        route: "/(protected)/(routes)/AllTickets"
    },
    {
        id: "2",
        title: "Trivia Games",
        image: images.triviaGame,
        description: "Answer Questions",
        route: "/(protected)/(routes)/Home"
    },
    {
        id: "3",
        title: "Lottery Game",
        image: images.lotteryGame,
        description: "Select Randomly to Win",
        route: "/(protected)/(routes)/LotteryGames"
    },
    {
        id: "4",
        title: "Virtual Games",
        image: images.instantGame,
        description: "Play for Immediate Reward",
        route: "/(protected)/(routes)/VirtualGames"

    }
]

const GameScreen = () => {
      
    const { theme } = useThemeStore();
    const { top, bottom } = useSafeAreaInsets()
    const Bottom = bottom + 57
    const [showModal, setShowModal] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

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

    const renderGameCard = ({item, index}: {item: any, index: number}) => (
        <FeaturedGameCard item={item} index={index} handlePress={() => goto()}/>
    )

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={['left', 'right']} className='bg-blue flex-1'>
        <ImageBackground source={images.featuredGame} resizeMode="cover" className='flex-1' style={{paddingTop: top, paddingBottom: Bottom}}>
            <View className='flex-1 px-4'>
                <Header icon onpress={() => router.back()}/>
                <FlatList
                    ListHeaderComponent={() => (
                        <GameTitleBox title='Featured Games'/>
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
                            <Text className="text-2xl text-center text-white mt-4 font-rbold">Games have not been added yet</Text>
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

export default GameScreen