import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import displayCurrency from '@/utils/displayCurrency'
import Feather from '@expo/vector-icons/Feather';
import IconButton from './IconButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/ThemeStore';

export default function MenuBalanceCard({showModal, setShowModal}: {showModal: boolean; setShowModal: any}) {

  const { theme } = useThemeStore();

  return (
    <View className='w-full rounded-2xl p-4' style={{backgroundColor: theme.colors.darkGray}}>
      <Text className="font-mmedium text-sm" style={{ color: theme.colors.text}}>AVAILABLE BALANCE</Text>
      <View className='flex-row items-center justify-between mt-1'>
        <View>
            <Text className="font-semibold text-xl" style={{ color: theme.colors.text}}>{displayCurrency(Number(756000), 'NGN')}</Text>
        </View>
        <TouchableOpacity className='items-center flex-row gap-1'>
            <Feather name="eye" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <View className='flex-row items-center justify-between gap-2 mt-3 w-full'>
        <IconButton title='DEPOSIT' handlePress={() => { router.push("/(protected)/(routes)/FundWallet"); setShowModal(!showModal) }} textStyles='text-white' icon={<Fontisto name="wallet" size={14} color="white" />} containerStyles='bg-brown-500 w-[40%] px-2'/>
        <IconButton title='WITHDRAWAL' handlePress={() => { router.push("/(protected)/(routes)/Withdrawal"); setShowModal(!showModal) }} textStyles='text-white' icon={<Ionicons name="cash" size={18} color="white" />} containerStyles='bg-blue w-[56%] px-2'/>
      </View>
    </View>
  )
}