import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeStore } from '@/store/ThemeStore';

const notFound = () => {

  const { theme } = useThemeStore();

  return (
    <SafeAreaView>
      <Text>not found</Text>
    </SafeAreaView>
  )
}

export default notFound