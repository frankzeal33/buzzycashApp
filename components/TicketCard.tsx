import { View, Text, Pressable } from 'react-native'
import React from 'react'
import moment from 'moment'
import displayCurrency from '@/utils/displayCurrency';
import { useThemeStore } from '@/store/ThemeStore';

const TicketCard = ({item, handlePress, index}: {item: any; handlePress: () => void, index: number}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={handlePress} className='border-b-2 w-full h-24' style={{ backgroundColor: theme.colors.darkGray, borderColor: theme.colors.background}}>
        <View className="flex-1 justify-between w-full flex-row items-start gap-3 rounded-lg px-4 py-2 my-1">
          <View className="items-start flex-row gap-2 flex-1">
            <View>
              <Text className="font-mbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>{item?.game_id__name}</Text>
              <Text className="font-mregular text-sm my-1" numberOfLines={1} style={{ color: theme.colors.text}}>{moment(item?.purchased_at).format('llll')}</Text>
              <Text className="font-mregular text-sm" numberOfLines={1} style={{ color: theme.colors.text}}>Game Status: <Text className={`capitalize ${item?.game_id__status === "active" ? "text-green-500" : "text-red-500"}`}>{item?.game_id__status}</Text></Text>
            </View>
          </View>

          <View className='items-end justify-end gap-2 max-w-[70%]'>
            <Text className="font-bold text-base" style={{ color: theme.colors.text}}>{displayCurrency(Number(item?.game_id__amount))}</Text>
          </View>
        </View>
    </Pressable >
  )
}

export default TicketCard