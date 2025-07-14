import { View, Text, Pressable } from 'react-native'
import React from 'react'
import moment from 'moment';
import displayCurrency from '@/utils/displayCurrency';
import { useThemeStore } from '@/store/ThemeStore';

const NotificationCard = ({item, section, handlePress}: {item: any; section: any; handlePress: () => void}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={handlePress} className="bg-white px-4 py-4 border-b-2 border-gray-100 relative">
      {item.unread && <View className="w-3 h-3 bg-brown-500 rounded-full absolute top-1 left-1" />}
      <View className="justify-between w-full flex-row items-start gap-2">
          <View className='max-w-[50%]'>
              <Text className="font-mbold text-base capitalize" numberOfLines={1}>{item?.title}</Text>
          </View>
          <View className='items-end justify-end gap-2 max-w-[48%]'>
              <Text className="font-bold text-base" numberOfLines={2}>{displayCurrency(Number(item?.amount), 'NGN')}</Text>
          </View>
      </View>
      <Text className="font-mregular text-sm my-1" numberOfLines={1}>Ongoing</Text>
      <View className="flex-row justify-between">
          <Text className="font-mregular text-sm">
          {item.endsIn ? `Ends in: ${item.endsIn}` : '––'}
          </Text>
          <Text className="font-mregular text-sm">{item.time}</Text>
      </View>
  </Pressable>
  )
}

export default NotificationCard