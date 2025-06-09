import { View, Text, Pressable } from 'react-native'
import React from 'react'
import moment from 'moment'
import displayCurrency from '@/utils/displayCurrency';

const TicketCard = ({item, handlePress, index}: {item: any; handlePress: () => void, index: number}) => {
  return (
    <Pressable onPress={handlePress} className='border-b-2 w-full border-gray-100 bg-white h-24'>
        <View className="flex-1 justify-between w-full flex-row items-start gap-3 bg-inputBg rounded-lg px-4 py-2 my-1">
          <View className="items-start flex-row gap-2 flex-1">
            <View>
              <Text className="font-mbold text-base capitalize" numberOfLines={1}>{item?.name}</Text>
              <Text className="font-mregular text-sm my-1" numberOfLines={1}>{moment(item?.createdAt).format('llll')}</Text>
              <Text className="font-mregular text-sm" numberOfLines={1}>{item?.quantity} x {displayCurrency(Number(item?.amount), 'NGN')}</Text>
            </View>
          </View>

          <View className='items-end justify-end gap-2 max-w-[70%]'>
            <Text className="font-bold text-base">{displayCurrency(Number(item?.amount), 'NGN')}</Text>
          </View>
        </View>
    </Pressable >
  )
}

export default TicketCard