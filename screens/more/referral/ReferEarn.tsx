import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants'
import { AntDesign, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import { useThemeStore } from '@/store/ThemeStore';

const ReferEarn = () => {

    const { theme } = useThemeStore();
    const [code, setCode] = useState<string | null>('')

    const copyCode = async () => {
        if(code){
            const copyCode = await Clipboard.setStringAsync(code);

            // toast.show("Referral Code Copied", {
            //     type: "success",
            //     });
        } 
    }

  return (
    <View className='flex-1 px-4'>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className='flex-1 my-6'>
                <View className='mb-8'>
                    <View className='size-[220px] mx-auto'>
                        <Image source={images.referralBox} width={220} height={220} resizeMode='cover' className='w-full h-full'/>
                    </View>
                </View>
                <View>
                    <View className='mb-8'>
                        <Text className="text-xl font-mbold text-center">Refer and Enjoy Bonus</Text>
                        <Text className="font-mmedium mt-1 text-center">You'll get commission against your referral's activities. Level has been decided by the Buzzycash authority. If you reach the level, you'll get commission.</Text>
                    </View>
                    <Pressable onPress={copyCode} className='flex-row items-center justify-between rounded-md bg-brown-500 p-4'>
                        <View className='flex-1'>
                            <Text className="text-lg font-mbold">Referral Code</Text>
                            <Text className="text-lg font-mmedium mt-1">frankzeal</Text>
                        </View>
                        <View className='flex-row items-center gap-1'>
                            <FontAwesome6 name="copy" size={18} color="#000000" />
                            <Text className="text-sm font-mbold">Copy</Text>
                        </View>
                    </Pressable>
                    <View className='mt-6'>
                        <Text className="text-xl font-mbold mb-4 text-center">Share via:</Text>
                        <View className='w-full flex-row items-center justify-between'>
                            <TouchableOpacity className='bg-white rounded-md px-2 py-4 items-center justify-center w-[31%]'>
                                <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
                                <Text className="text-xs text-center font-msbold mt-1">Whatsapp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-white rounded-md px-2 py-4 items-center justify-center w-[31%]'>
                                <FontAwesome5 name="facebook" size={24} color="#1877F2" />
                                <Text className="text-xs text-center font-msbold mt-1">Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-white rounded-md px-2 py-4 items-center justify-center w-[31%]'>
                                <AntDesign name="sharealt" size={24} color="black" />
                                <Text className="text-xs text-center font-msbold mt-1">Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default ReferEarn