import { View, Text, Image, TouchableOpacity, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';

const TransparentGameCard = ({item, handlePress, index}: {item: any; handlePress: () => void; index: number}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={() => router.push(item.route)} className={`w-[48%] h-44 relative rounded-lg border border-brown-500 bg-gray-100/60 overflow-hidden`}>
       <ImageBackground source={item.image} resizeMode="cover" className='relative w-full h-full'>
          <View className='flex-1 w-full bg-brown-500/90 absolute bottom-0'>
              <Text className='text-center font-mbold px-2 py-4'>{item.title}</Text>
          </View>
       </ImageBackground>
    </Pressable>
  )
}

export default TransparentGameCard