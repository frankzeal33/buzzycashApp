import { View, Text } from 'react-native'
import React from 'react'
import { useThemeStore } from '@/store/ThemeStore';

const GameTitleBox = ({title}: {title: string}) => {
  const { theme } = useThemeStore();
  return (
    <View className='bg-brown-500 rounded-lg p-4 w-full'>
      <Text className='text-white text-xl font-bold text-center' style={{color: theme.colors.textOpposite}}>{title}</Text>
    </View>
  )
}

export default GameTitleBox