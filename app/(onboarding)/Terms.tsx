import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeStore } from '@/store/ThemeStore';

const Terms = () => {
  const { theme } = useThemeStore();
  return (
    <SafeAreaView>
        <View>
            <Text>Terms</Text>
        </View>
    </SafeAreaView>
   
  )
}

export default Terms