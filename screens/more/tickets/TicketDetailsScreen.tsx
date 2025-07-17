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
import { useThemeStore } from '@/store/ThemeStore'
import Header from '@/components/Header'

const TicketDetailsScreen = () => {

    const { theme } = useThemeStore();
    const { top, bottom } = useSafeAreaInsets()
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

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={['left', 'right']} className='bg-blue flex-1'>
        <ImageBackground source={images.splash} resizeMode="cover" className='flex-1 px-4' style={{paddingTop: top, paddingBottom: bottom + 5}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <View className='flex-1'>
                    <View className='pt-2 py-4'>
                        <Header icon home onpress={() => router.back()}/>
                        <Text className="text-2xl text-brown-500 font-mbold mt-1 text-center">Play Weekend Allawee</Text>
                    </View>
                    <View className='w-full rounded-xl bg-white' style={{backgroundColor: theme.colors.darkGray}}>
                        <View className='w-full bg-brown-500 rounded-t-xl px-2 py-3'>
                            <Text className="text-xl font-mbold mt-1 text-center" style={{color: theme.colors.darkGray}}>Ticket Summary</Text>
                        </View>
                        <View className='m-4 gap-2 items-center justify-center'>
                            <Image source={images.darkLogo}/>
                            <Text className="text-xl font-msbold mt-1 text-center" style={{color: theme.colors.text}}>Weekend Allawee</Text>
                        </View>
                        <View className='items-center mx-2 mt-2 mb-5'>
                            {/* Custom Labels Row */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 1 }}>
                                {['Days', 'Hours', 'Mins', 'Secs'].map((label, index) => (
                                    <View key={index} style={{ width: 45, alignItems: 'center', marginHorizontal: 4 }}>
                                    <Text style={{ color: theme.colors.text, fontSize: 12 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
            
                            {/* Countdown Digits */}
                            <CountDown
                                until={getCountdownSeconds("2025-06-21 14:30:00")}
                                size={20}
                                onFinish={() => console.log('Time up!')}
                                digitStyle={{
                                    backgroundColor: '#EF9439',
                                    width: 30,
                                    height: 30,
                                    borderRadius: 6,
                                }}
                                digitTxtStyle={{
                                    color: theme.colors.text,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                                separatorStyle={{ color: theme.colors.text, fontSize: 30, fontWeight: 'bold', marginHorizontal: 5 }}
                                timeToShow={['D', 'H', 'M', 'S']}
                                timeLabels={{}} // Hide default labels
                                showSeparator
                            />
                        </View>
                        <View className='flex-1 flex-row items-center mx-4 h-16 mb-6 rounded-lg' style={{backgroundColor: theme.colors.inputBg}}>
                            <TicketButton/>
                            <View className={`flex-1 flex-row gap-3 items-center justify-between`}>
                                
                                <TouchableOpacity className='px-4'>
                                    <Entypo name="chevron-left" size={30} color="#EF9439" />
                                </TouchableOpacity>
                                
                                <TouchableOpacity>
                                    <Text className='text-blue font-msbold text-xl' style={{color: theme.colors.text}}>1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className='px-4'>
                                    <Entypo name="chevron-right" size={30} color="#EF9439" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className='w-full mt-6 rounded-xl' style={{backgroundColor: theme.colors.darkGray}}>
                        <View className='w-full bg-brown-500 rounded-t-xl px-2 py-3'>
                            <Text className="text-xl font-mbold mt-1 text-center" style={{color: theme.colors.darkGray}}>Purchase Summary</Text>
                        </View>
                        <View className='my-4 mx-4 gap-5'>
                            <View className='w-full flex-row items-start justify-between gap-3'>
                                <View>
                                    <Text className='font-mmedium text-xl' style={{color: theme.colors.text}}>Total Tickets</Text>
                                </View>
                                <Text className="text-xl font-mmedium items-end" style={{color: theme.colors.text}}>1</Text>
                            </View>
                            <View className='w-full flex-row items-start justify-between gap-3'>
                                <View>
                                    <Text className='font-mmedium text-xl' style={{color: theme.colors.text}}>Ticket Price</Text>
                                    <Text className='font-mmedium text-xl' style={{color: theme.colors.text}}>(2 x 200)</Text>
                                </View>
                                <Text className="text-xl font-mmedium items-end" style={{color: theme.colors.text}}>{displayCurrency(Number(400), 'NGN')}</Text>
                            </View>
                            <View className='border border-brown-200'/>
                            <View className='w-full flex-row items-start justify-between gap-3'>
                                <View>
                                    <Text className='font-mbold text-xl' style={{color: theme.colors.text}}>Total Amount</Text>
                                </View>
                                <Text className="text-xl font-mbold items-end" style={{color: theme.colors.text}}>{displayCurrency(Number(400), 'NGN')}</Text>
                            </View>
                            <GradientButton
                                title="Purchase Tickets"
                                handlePress={purchase}
                                containerStyles="w-[70%] mx-auto my-4"
                                textStyles="text-white"
                            />
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
            
            <TicketModal title={showSuccess ? "TIcket Successfully Purchased" : "Insufficient wallet balance"} visible={showModal} onClose={closeModal}>
               {showSuccess ? (
                    <View className='w-full'>
                        <View className='w-full items-center justify-center mt-6'>
                            <LottieView
                                autoPlay
                                style={{
                                    width: 70,
                                    height: 70,
                                    alignSelf: 'center',
                                }}
                                source={images.check}
                            />
                        </View>
                         <Text className="font-mmedium text-center my-6" style={{color: theme.colors.text}}>
                            You are one step closer to your big win. Take more risk to gain more.
                        </Text>
                    </View>
               ) : (
                    <View className='w-full'>
                        <View className='w-full items-center justify-center mt-6'>
                            <LottieView
                                autoPlay
                                style={{
                                    width: 70,
                                    height: 70,
                                    alignSelf: 'center',
                                }}
                                source={images.info}
                            />
                        </View>
                        <Text className="font-mmedium text-center my-6">
                            You are one step closer to your big win. Take more risk to gain more.
                        </Text>
                        <GradientButton
                            title="Fund Wallet"
                            handlePress={() => router.push("/(protected)/(routes)/FundWallet")}
                            containerStyles="w-[70%] mx-auto"
                            textStyles="text-white"
                        />
                    </View>
               )}
            </TicketModal>

        </ImageBackground>
        </SafeAreaView>
        <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

export default TicketDetailsScreen