import { View, Text, TouchableOpacity, ActivityIndicator, Pressable, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import displayCurrency from '@/utils/displayCurrency'
import Feather from '@expo/vector-icons/Feather';
import IconButton from './IconButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';
import useWalletStore from '@/store/WalletStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BalanceCard() {

  const { theme } = useThemeStore();
  const { wallet, balanceLoading, hideWallet, setHideWallet } = useWalletStore((state) => state);
  const [showModal, setShowModal] = useState(false)

  const hideBalance = async (hideValue: string) => {

    setHideWallet(hideValue)
    await AsyncStorage.setItem("hideBalance", hideValue)

  }

  return (
    <>
      <View className='w-full rounded-xl mb-3 p-4' style={{ backgroundColor: theme.colors.darkGray, borderWidth: theme.dark ? 1 : 0, borderColor: theme.dark ? theme.colors.inputBg : undefined,}}>
        <Pressable className='flex-row items-center gap-1' onPress={() => setShowModal(true)}>
          <Text className="font-mmedium" style={{ color: theme.colors.text}}>AVAILABLE BALANCE</Text>
          <Ionicons name="grid-outline" size={13} color={theme.colors.text} />
        </Pressable>
        <View className='flex-row items-center justify-between mt-1'>
          <View>
            {balanceLoading ? (
              <View className='min-h-8'>
                <ActivityIndicator size="small" color={theme.colors.text}/>
              </View>
            ) : 
              hideWallet === "true" ? (
                <Text className="font-ablack text-2xl" style={{ color: theme.colors.text}}>*****</Text>
              ) : (
                <Text className="font-semibold text-2xl" style={{ color: theme.colors.text}}>{displayCurrency(Number(wallet?.total))}</Text>
            )}
          </View>
          {hideWallet === "false" || !hideWallet ? (
              <TouchableOpacity activeOpacity={0.8} className='items-center flex-row gap-1'  onPress={() => hideBalance('true')}>
                <Feather name="eye" size={20} color={theme.colors.text} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.8} className='items-center flex-row gap-1' onPress={() => hideBalance('false')}>
                <Feather name="eye-off" size={20} color={theme.colors.text} />
              </TouchableOpacity>
            )}
        </View>
        <View className='flex-row items-center justify-between gap-2 mt-3 w-full'>
          <IconButton title='DEPOSIT' handlePress={() => router.push("/(protected)/(routes)/FundWallet")} textStyles='text-white' icon={<Fontisto name="wallet" size={12} color="white" />} containerStyles='bg-brown-500 w-[38%] px-2'/>
          <IconButton title='PURCHASE TICKET' handlePress={() => router.push("/(protected)/(routes)/Games")} textStyles='text-white' icon={<MaterialCommunityIcons name="ticket-outline" size={16} color="white" />} containerStyles='bg-blue w-[58%] px-2' border/>
        </View>
      </View>

      <Modal
            transparent={true}
            visible={showModal}
            statusBarTranslucent={true}
            onRequestClose={() => setShowModal(false)}>
            <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                {/* TouchableWithoutFeedback only around the background */}
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View className="absolute top-0 left-0 right-0 bottom-0" />
                </TouchableWithoutFeedback>

                {/* Actual modal content */}
                <View className="rounded-2xl max-h-[60%] px-4 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                    <View className='my-7 gap-5'>
                      <View>
                        <Text className="font-mmedium text-sm" style={{ color: theme.colors.text}}>MAIN BALANCE</Text>
                        <Text className="font-semibold text-xl" style={{ color: theme.colors.text}}>{displayCurrency(Number(wallet?.total))}</Text>
                      </View>
                      <View>
                        <Text className="font-mmedium text-sm" style={{ color: theme.colors.text}}>BONUS BALANCE</Text>
                        <Text className="font-semibold text-xl" style={{ color: theme.colors.text}}>{displayCurrency(Number(wallet?.bonus))}</Text>
                      </View>
                      <View>
                        <Text className="font-mmedium text-sm" style={{ color: theme.colors.text}}>PLAYING BALANCE</Text>
                        <Text className="font-semibold text-xl" style={{ color: theme.colors.text}}>{displayCurrency(Number(wallet?.playing))}</Text>
                      </View>
                      <View>
                        <Text className="font-mmedium text-sm" style={{ color: theme.colors.text}}>WINNING BALANCE</Text>
                        <Text className="font-semibold text-xl" style={{ color: theme.colors.text}}>{displayCurrency(Number(wallet?.winning))}</Text>
                      </View>
                    </View>
                </View>
            </View>
        </Modal>
    </>
  )
}