import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useThemeStore } from '@/store/ThemeStore';

export default function goto() {

  const { theme } = useThemeStore();

  return (
    <View className='flex-1 bg-white items-center justify-center'>
      <ActivityIndicator size="large" color={theme.dark ? "#fff" : "#000"}/>
      <Text className="text-base mt-2 font-mbold" style={{color: theme.colors.text}}>Please wait</Text>
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </View>
  )
}