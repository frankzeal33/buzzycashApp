import { View, Text, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { images } from '@/constants'
import displayCurrency from '@/utils/displayCurrency'
import { useThemeStore } from '@/store/ThemeStore'

const Referrals = () => {

  const { theme } = useThemeStore();

  return (
    <View className='flex-1 mt-6 px-4'>
        <View className='flex-1'>
            <View className='w-full flex-row justify-between rounded-md bg-brown-500 px-4 py-6'>
                <View className='w-[55%] gap-1'>
                    <View className='flex-row items-center gap-1'>
                        <View className='size-[20px]'>
                            <Image source={images.referralCoin} width={20} height={20} resizeMode='cover' className='w-full h-full'/>
                        </View>
                        <Text className="text-lg font-mbold" style={{color: theme.colors.text}}>Total Earned</Text>
                    </View>
                    <Text className="text-lg font-mmedium" style={{color: theme.colors.text}}>{displayCurrency(Number(500), 'NGN')}</Text>
                </View>
                <View className='gap-1 w-[40%]'>
                    <View className='flex-row items-center gap-1'>
                        <View className='size-[20px]'>
                            <Image source={images.inviteUser} width={20} height={20} resizeMode='cover' className='w-full h-full'/>
                        </View>
                        <Text className="text-lg font-mbold" style={{color: theme.colors.text}}>Invites</Text>
                    </View>
                    <Text className="text-lg font-mmedium" style={{color: theme.colors.text}}>2</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Referrals