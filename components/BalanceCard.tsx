import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import displayCurrency from '@/utils/displayCurrency'
import Feather from '@expo/vector-icons/Feather';
import IconButton from './IconButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';

export default function BalanceCard() {

  const { theme } = useThemeStore();

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
        <IconButton title='DEPOSIT' handlePress={() => router.push("/(protected)/(routes)/FundWallet")} textStyles='text-white' icon={<Fontisto name="wallet" size={14} color="white" />} containerStyles='bg-brown-500 w-[38%] px-2'/>
        <IconButton title='PURCHASE TICKET' handlePress={() => router.push("/(protected)/(routes)/Games")} textStyles='text-white' icon={<MaterialCommunityIcons name="ticket-outline" size={18} color="white" />} containerStyles='bg-blue w-[58%] px-2'/>
      </View>
    </View>
  )
}