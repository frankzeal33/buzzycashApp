import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'

const Security2FAScreen = () => {
  return (
    <SafeAreaView className='h-full flex-1 bg-gray-100 px-4'>
        <Header title='2FA' icon onpress={() => router.back()}/>

    </SafeAreaView>
  )
}

export default Security2FAScreen