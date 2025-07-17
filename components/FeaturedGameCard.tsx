import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';

const FeaturedGameCard = ({item, handlePress, index}: {item: any; handlePress: () => void; index: number}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={() => router.push(item.route)} className={`w-[48%] rounded-lg border border-brown-500 overflow-hidden`} style={{backgroundColor: theme.colors.background}}>
        <View className='flex-row gap-1 px-2 py-5 items-center'>
            <View className='size-[50px] rounded-full'>
              <Image source={item.image} width={50} height={50} resizeMode='cover' className='w-full h-full overflow-hidden'/>
            </View>
            <Text className='font-mmedium flex-1' style={{color: theme.colors.text}}>{item.description}</Text>
        </View>
        <View className='bg-brown-500 flex-1 w-full'>
          <Text className='text-center font-mbold px-2 py-4' style={{color: theme.colors.text}}>{item.title}</Text>
        </View>
    </Pressable>
  )
}

export default FeaturedGameCard