import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import displayCurrency from '@/utils/displayCurrency'
import Feather from '@expo/vector-icons/Feather';
import IconButton from './IconButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function BalanceCard() {
  return (
    <View className='w-full bg-white rounded-xl mb-3 p-4'>
      <Text className="font-mmedium text-black">AVAILABLE BALANCE</Text>
      <View className='flex-row items-center justify-between mt-1'>
        <View>
            <Text className="font-semibold text-2xl">{displayCurrency(Number(756000), 'NGN')}</Text>
        </View>
        <TouchableOpacity className='items-center flex-row gap-1'>
            <Feather name="eye" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
      <View className='flex-row items-center justify-between gap-2 mt-3 w-full'>
        <IconButton title='DEPOSIT' textStyles='text-white' icon={<Fontisto name="wallet" size={14} color="white" />} containerStyles='bg-orange w-[38%] px-2'/>
        <IconButton title='PURCHASE TICKET' textStyles='text-white' icon={<MaterialCommunityIcons name="ticket-outline" size={18} color="white" />} containerStyles='bg-blue w-[58%] px-2'/>
      </View>
    </View>
  )
}