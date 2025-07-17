import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import CountDown from 'react-native-countdown-component'
import { getCountdownSeconds } from '@/utils/CountdownSeconds'
import TicketButton from '@/components/TicketButton'
import GradientButton from '@/components/GradientButton'
import displayCurrency from '@/utils/displayCurrency'
import TicketModal from '@/components/TicketModal'
import LottieView from 'lottie-react-native'
import SpinGradientButton from '@/components/SpinGradientButton'
import { useThemeStore } from '@/store/ThemeStore'
import Header from '@/components/Header'

const Spin2WinScreen = () => {

    const { theme } = useThemeStore();
    const { top, bottom } = useSafeAreaInsets()
    const [showModal, setShowModal] = useState(false)

    const purchase = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={['left', 'right']} className='bg-blue flex-1'>
        <ImageBackground source={images.starBg} resizeMode="cover" className='flex-1 px-4' style={{paddingTop: top, paddingBottom: bottom + 5}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <View>
                    <View className='pt-2 py-4'>
                        <Header icon home onpress={() => router.back()}/>
                        <Text className="text-2xl text-brown-500 font-mbold mt-1 text-center">Spin 2 Win</Text>
                    </View>
                    <SpinGradientButton
                        title="Available Spins: 0"
                        containerStyles="w-[70%] mx-auto my-4"
                        textStyles="text-black"
                    />
                </View>
                <View className='flex-1 items-center justify-center'>
                    <Pressable className='size-[250px] mx-auto'>
                        <Image source={images.spin} width={250} height={250} resizeMode='cover' className='w-full h-full overflow-hidden'/>
                    </Pressable>
                </View>
                <View className='min-h-40'>
                    <SpinGradientButton
                        title="Purchase Spins"
                        handlePress={purchase}
                        containerStyles="w-[70%] mx-auto mt-4"
                        textStyles="text-white"
                    />
                </View>
            </ScrollView>
            
            <TicketModal title={`You won ${displayCurrency(Number(400), "NGN")}`} visible={showModal} onClose={closeModal}>
                <View className='w-full'>
                    <View className='w-full items-center justify-center'>
                        <LottieView
                            autoPlay
                            style={{
                                width: 150,
                                height: 150,
                                alignSelf: 'center',
                            }}
                            source={images.won}
                        />
                    </View>
                    <Text className="font-mmedium text-center mb-6" style={{color: theme.colors.text}}>
                        You are one of the luckiest in the world.
                    </Text>
                    <GradientButton
                        title="Continue"
                        containerStyles="w-[70%] mx-auto"
                        textStyles="text-white"
                    />
                </View>
            </TicketModal>

        </ImageBackground>
        </SafeAreaView>
        <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

export default Spin2WinScreen