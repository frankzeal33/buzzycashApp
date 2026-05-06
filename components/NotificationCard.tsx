import { View, Text, Pressable } from 'react-native'
import React from 'react'
import displayCurrency from '@/utils/displayCurrency';
import { useThemeStore } from '@/store/ThemeStore';

const NotificationCard = ({item, section, handlePress}: {item: any; section: any; handlePress: () => void}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={handlePress} className="px-3 py-5 border-b-2 relative" style={{ backgroundColor: theme.colors.darkGray, borderColor: theme.colors.background}}>
      {!item?.is_read && <View className='bg-brown size-2.5 rounded-full absolute left-2 top-2'/>}
      <View className="justify-between w-full flex-row items-start gap-3">
        <View className='flex-1'>
          <Text className="font-mbold text-base capitalize" numberOfLines={1} style={{color: theme.colors.text}}>{item?.title}</Text>
        </View>
        <View className='items-end justify-end gap-2'>
          <Text className="font-bold text-base" numberOfLines={2} style={{color: theme.colors.text}}>{displayCurrency(Number(item?.amount))}</Text>
        </View>
      </View>
      <Text className={`font-mmedium text-sm my-1 capitalize ${item?.status === "failed" ? "text-red-600" : item?.status === "successful" ? "text-green-600" : "text-amber-600"}`} numberOfLines={1}>{item?.status}</Text>
      <View className="flex-row justify-between gap-3">
        <Text className="font-mregular text-sm flex-1" numberOfLines={1} style={{color: theme.colors.text}}>
          {item?.message}
        </Text>
        <Text className="font-mregular text-sm" style={{color: theme.colors.text}}>{item?.created_at}</Text>
      </View>
  </Pressable>
  )
}

export default NotificationCard