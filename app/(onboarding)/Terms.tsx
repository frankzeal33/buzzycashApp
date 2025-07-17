import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeStore } from '@/store/ThemeStore';
import { StatusBar } from 'expo-status-bar';

const Terms = () => {
  const { theme } = useThemeStore();
  return (
    <SafeAreaView className='h-full flex-1' style={{ backgroundColor: theme.colors.background}}>
        <View>
            <Text style={{ backgroundColor: theme.colors.text}}>Terms</Text>
        </View>
        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
   
  )
}

export default Terms