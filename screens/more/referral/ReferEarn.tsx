import { View, Text, ScrollView, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants'
import { AntDesign, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import { useThemeStore } from '@/store/ThemeStore';
import { Skeleton } from 'moti/skeleton'
import Toast from 'react-native-toast-message';
import { useSkeletonCommonProps } from '@/utils/SkeletonProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReferralStore } from '@/store/ReferralStore';
import { axiosClient } from '@/globalApi';

const width = Dimensions.get("screen").width;

const ReferEarn = ({ isFocused }: { isFocused: boolean }) => {

    const { theme } = useThemeStore();
    const [code, setCode] = useState<string | null>('')
    const skeletonProps = useSkeletonCommonProps();
    const { referralLoading, refData, setReferralInfo, setReferralLoading } = useReferralStore();

    const referralData = async () => {

        const referralCode = await AsyncStorage.getItem('referralCode');
      
        const code = referralCode != null ? referralCode : null;

        if(!code){
          setReferralLoading(true)
    
          try {
    
            const result = await axiosClient.get("/referrals/referral-details")

            setCode(result?.data?.data?.referralCode)
            await AsyncStorage.setItem("referralCode", result?.data?.data?.referralCode);
            setReferralInfo(result?.data?.data)
            
            console.log(result.data)
  
          } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error.response.data.message
            });
          } finally {
            setReferralLoading(false)
          }
        }else{
          const referralCode = await AsyncStorage.getItem('referralCode');
        
          const code = referralCode != null ? referralCode : null;

          setCode(code)
        }
      }

    useEffect(() => {
        if (isFocused) {
            referralData()
        }
    }, [isFocused]);

    const copyCode = async () => {
        if(code){
            const copyCode = await Clipboard.setStringAsync(code);

           Toast.show({
                type: 'info',
                text1: "Referral Code Copied",
                text2: code,
            });
        } 
    }

  return (
    <View className='flex-1 px-4'>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className='flex-1 my-6'>
                 {referralLoading ? 
                    (
                    <View className="w-full justify-center">
                        <Skeleton.Group show={referralLoading}>
                            <View className='w-full mb-4 flex-row items-center justify-center'>
                               <Skeleton height={200} width={200} radius={100} {...skeletonProps} />
                            </View>
                            <View className='w-full mb-4 flex-row items-center'>
                                <Skeleton height={150} width={'100%'} {...skeletonProps} />
                            </View>
                            <View className='w-full mb-4'>
                                <Skeleton height={100} width={'100%'} {...skeletonProps} /> 
                            </View>
                            <View className="w-full flex-row flex-wrap justify-between gap-3">
                                <Skeleton height={width/4} width={width/4} {...skeletonProps} />
                                <Skeleton height={width/4} width={width/4} {...skeletonProps} />
                                <Skeleton height={width/4} width={width/4} {...skeletonProps} />
                            </View>
                        </Skeleton.Group>
                    </View>
                    ) : (
                        <View>
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
                                        <Text className="text-lg font-mmedium mt-1" style={{color: theme.colors.text}}>{code || refData.referralCode}</Text>
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
                    )
                }    
            </View>
        </ScrollView>
    </View>
  )
}

export default ReferEarn