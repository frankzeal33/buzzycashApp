import { View, Text } from 'react-native'
import React from 'react'
import { useThemeStore } from '@/store/ThemeStore';

const ProfileBox = ({label, value}: {label: string; value: string}) => {

  const { theme } = useThemeStore();

  return (
    <View className='w-full h-16 bg-gray-200 gap-4 rounded-md flex-row justify-between px-4 items-center'>
        <Text className='text-gray-500 font-mmedium'>{label}</Text>
        <View className="flex-1">
        <Text className='text-black font-msbold text-right' numberOfLines={2}>{value}</Text>
        </View>
    </View>
  )
}

export default ProfileBox