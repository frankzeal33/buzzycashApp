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
                        <Text className="text-xl font-mbold text-center" style={{color: theme.colors.text}}>Refer and Enjoy Bonus</Text>
                        <Text className="font-mmedium mt-1 text-center" style={{color: theme.colors.text}}>You'll get commission against your referral's activities. Level has been decided by the Buzzycash authority. If you reach the level, you'll get commission.</Text>
                    </View>
                    <Pressable onPress={copyCode} className='flex-row items-center justify-between rounded-md bg-brown-500 p-4'>
                        <View className='flex-1'>
                            <Text className="text-lg font-mbold" style={{color: theme.colors.text}}>Referral Code</Text>
                            <Text className="text-lg font-mmedium mt-1" style={{color: theme.colors.text}}>frankzeal</Text>
                        </View>
                        <View className='flex-row items-center gap-1'>
                            <FontAwesome6 name="copy" size={18} color={theme.colors.text} />
                            <Text className="text-sm font-mbold" style={{color: theme.colors.text}}>Copy</Text>
                        </View>
                    </Pressable>
                    <View className='mt-6'>
                        <Text className="text-xl font-mbold mb-4 text-center" style={{color: theme.colors.text}}>Share via:</Text>
                        <View className='w-full flex-row items-center justify-between'>
                            <TouchableOpacity className='rounded-md px-2 py-4 items-center justify-center w-[31%]' style={{backgroundColor: theme.colors.darkGray}}>
                                <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
                                <Text className="text-xs text-center font-msbold mt-1" style={{color: theme.colors.text}}>Whatsapp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='rounded-md px-2 py-4 items-center justify-center w-[31%]' style={{backgroundColor: theme.colors.darkGray}}>
                                <FontAwesome5 name="facebook" size={24} color="#1877F2" />
                                <Text className="text-xs text-center font-msbold mt-1" style={{color: theme.colors.text}}>Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='rounded-md px-2 py-4 items-center justify-center w-[31%]' style={{backgroundColor: theme.colors.darkGray}}>
                                <AntDesign name="sharealt" size={24} color={theme.colors.text} />
                                <Text className="text-xs text-center font-msbold mt-1" style={{color: theme.colors.text}}>Share</Text>
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