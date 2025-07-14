import { View, Text, Pressable } from 'react-native'
import React from 'react'
import moment from 'moment'
import displayCurrency from '@/utils/displayCurrency';
import Feather from '@expo/vector-icons/Feather';
import { useThemeStore } from '@/store/ThemeStore';

const TransactionCard = ({item, handlePress, index}: {item: any; handlePress: () => void, index: number}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={handlePress} className='border-b-2 w-full border-gray-100 bg-white h-28'>
        <View className="flex-1 justify-between w-full flex-row items-start gap-3 bg-inputBg rounded-lg px-4 py-2 my-1">
          <View className="items-start flex-row gap-2 max-w-[50%]">
            <View className={`flex items-center justify-center size-10 rounded-full ${item?.paymentStatus === "SUCCESSFUL" ? "bg-green-100" : item?.paymentStatus === "FAILED" ? "bg-red-100" : "bg-yellow-100"} `}>
                <Feather name={item?.paymentStatus === "SUCCESSFUL" ? "arrow-down-right" : item?.paymentStatus === "FAILED" ? "arrow-up-right" : "minus"} color={item?.paymentStatus === "SUCCESSFUL" ? "#22c55e" : item?.paymentStatus === "FAILED" ? "#ef4444" : "#ca8a04"} size={20}/>
            </View>
            <View>
              <Text className="font-mbold text-base capitalize" numberOfLines={1}>{item?.name} -</Text>
              <Text className="font-mregular text-sm my-1" numberOfLines={1}>{moment(item?.createdAt).format('llll')}</Text>
              <Text className="font-mmedium text-base mt-1" numberOfLines={1}>#{item?.id}</Text>
            </View>
          </View>

          <View className='items-end justify-end max-w-[35%]'>
            <Text className="font-bold text-base">{displayCurrency(Number(item?.amount), 'NGN')}</Text>
            <Text className="font-light text-sm">Bal: {displayCurrency(Number(item?.amount), 'NGN')}</Text>
          </View>
        </View>
    </Pressable >
  )
}

export default TransactionCard