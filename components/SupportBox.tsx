import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { useThemeStore } from '@/store/ThemeStore';

const SupportBox = ({image, label, value}: {image: ImageSourcePropType, label: string; value?: string}) => {

  const { theme } = useThemeStore();

  return (
    <View className='w-full h-24 bg-gray-200 gap-4 rounded-md flex-row px-4 items-center' style={{backgroundColor: theme.colors.inputBg}}>
      <View className='size-[40px]'>
        <Image source={image} width={40} height={40} resizeMode='cover' className='w-full h-full'/>
      </View>
      <View className='flex-1'>
        <Text className='text-xl font-msbold' style={{color: theme.colors.text}}>{label}</Text>
        {value && (
          <Text className='font-lg font-mmedium' numberOfLines={2} style={{color: theme.colors.text}}>{value}</Text>
        )}
      </View>
    </View>
  )
}

export default SupportBox