import { View, Text, Pressable } from 'react-native'
import React from 'react'
import moment from 'moment'
import displayCurrency from '@/utils/displayCurrency';
import Feather from '@expo/vector-icons/Feather';
import { useThemeStore } from '@/store/ThemeStore';
import { transactionsType } from '@/types/types';

const TransactionCard = ({item, handlePress, index}: {item: transactionsType; handlePress: () => void, index: number}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable onPress={handlePress} className='border-b-2 w-full h-28' style={{ backgroundColor: theme.colors.darkGray, borderColor: theme.colors.background}}>
        <View className="flex-1 justify-between w-full flex-row items-start gap-2 rounded-lg px-4 py-2 my-1">
          <View className="items-start flex-row gap-2 flex-1">
            <View className={`flex items-center justify-center size-10 rounded-full ${item?.payment_status === "SUCCESSFUL" ? "bg-green-100" : item?.payment_status === "FAILED" ? "bg-red-100" : "bg-yellow-100"} `}>
                <Feather name={item?.payment_status === "SUCCESSFUL" ? "arrow-down-right" : item?.payment_status === "FAILED" ? "arrow-up-right" : "minus"} color={item?.payment_status === "SUCCESSFUL" ? "#22c55e" : item?.payment_status === "FAILED" ? "#ef4444" : "#ca8a04"} size={20}/>
            </View>
            <View className='flex-1'>
              <Text className="font-mbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>{item?.category} -</Text>
              <Text className="font-mregular text-sm my-1" numberOfLines={1} style={{ color: theme.colors.text}}>{moment(item?.paid_at).format('llll')}</Text>
              <Text className="font-mmedium text-base mt-1" numberOfLines={1} style={{ color: theme.colors.text}}>{item?.transaction_reference}</Text>
            </View>
          </View>

          <View className='items-end justify-end'>
            <Text className="font-bold text-base" style={{ color: theme.colors.text}}>{displayCurrency(Number(item?.amount))}</Text>
          </View>
        </View>
    </Pressable >
  )
}

export default TransactionCard