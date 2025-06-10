import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const ReferralScreen = () => {
  return (
   <SafeAreaView className='h-full flex-1 bg-gray-100 px-4'>
        <Header title='Referral' icon onpress={() => router.back()}/>

    </SafeAreaView>
  )
}

export default ReferralScreen