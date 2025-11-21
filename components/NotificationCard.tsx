import { View, Text, Pressable } from 'react-native'
import React from 'react'
import displayCurrency from '@/utils/displayCurrency';
import { useThemeStore } from '@/store/ThemeStore';

const NotificationCard = ({item, section, handlePress}: {item: any; section: any; handlePress: () => void}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={handlePress} className="px-4 py-4 border-b-2 relative" style={{ backgroundColor: theme.colors.darkGray, borderColor: theme.colors.background}}>
      <View className="justify-between w-full flex-row items-start gap-3">
          <View className='flex-1'>
              <Text className="font-mbold text-base capitalize" numberOfLines={1} style={{color: theme.colors.text}}>{item?.title}</Text>
          </View>
          <View className='items-end justify-end gap-2'>
              <Text className="font-bold text-base" numberOfLines={2} style={{color: theme.colors.text}}>{displayCurrency(Number(item?.amount))}</Text>
          </View>
      </View>
      <Text className="font-mregular text-sm my-1" numberOfLines={1} style={{color: theme.colors.text}}>{item?.status}</Text>
      <View className="flex-row justify-between gap-3">
          <Text className="font-mregular text-sm flex-1" numberOfLines={1} style={{color: theme.colors.text}}>
            {item?.subtitle}
          </Text>
          <Text className="font-mregular text-sm" style={{color: theme.colors.text}}>{item?.time}</Text>
      </View>
  </Pressable>
  )
}

export default NotificationCard