import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { router } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'

const FundPaymentGatewayScreen = () => {

  const { theme } = useThemeStore();

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{backgroundColor: theme.colors.background}}>
      <Header title='Payment Gateway' icon onpress={() => router.back()}/>
    </SafeAreaView>
  )
}

export default FundPaymentGatewayScreen

const styles = StyleSheet.create({})