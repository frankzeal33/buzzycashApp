import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const TicketDetailsScreen = () => {

    const { top, bottom } = useSafeAreaInsets()

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={['left', 'right']} className='bg-blue flex-1'>
        <ImageBackground source={images.splash} resizeMode="cover" className='flex-1 px-4' style={{paddingTop: top, paddingBottom: bottom + 5}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <View>
                    <View className='py-2'>
                        <View className='flex-row items-center justify-between gap-2'>
                            <View/>
                            <TouchableOpacity onPress={() => router.back()}><AntDesign name="arrowleft" size={28} color="#EF9439"/></TouchableOpacity>
                        </View>
                        <Text className="text-2xl text-brown-500 font-mbold mt-1 text-center">Play Weekend allawee</Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
        </SafeAreaView>
        <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

export default TicketDetailsScreen