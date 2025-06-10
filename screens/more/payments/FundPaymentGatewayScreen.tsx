import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { router } from 'expo-router'

const FundPaymentGatewayScreen = () => {
  return (
    <SafeAreaView className='h-full flex-1 bg-gray-100 px-4'>
      <Header title='Payment Gateway' icon onpress={() => router.back()}/>
    </SafeAreaView>
  )
}

export default FundPaymentGatewayScreen

const styles = StyleSheet.create({})