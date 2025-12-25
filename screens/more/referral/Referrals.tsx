import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { images } from '@/constants'
import displayCurrency from '@/utils/displayCurrency'
import { useThemeStore } from '@/store/ThemeStore'
import { Skeleton } from 'moti/skeleton'
import { useSkeletonCommonProps } from '@/utils/SkeletonProps'
import { useReferralStore } from '@/store/ReferralStore'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'

const Referrals = ({ isFocused }: { isFocused: boolean }) => {

  const { theme } = useThemeStore();
   const hasFetched = useRef(false);
  const skeletonProps = useSkeletonCommonProps();
   const { referralLoading, refData, setReferralInfo, setReferralLoading } = useReferralStore();

    const referralData = async () => {

        setReferralLoading(true)

        try {

            const result = await axiosClient.get("/referrals/referral-details")
            setReferralInfo(result?.data)
            
            console.log(result.data)

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error.response.data.message
            });
        } finally {
            setReferralLoading(false)
        }
    }

    useEffect(() => {
        if (isFocused && !hasFetched.current) {
            hasFetched.current = true;
            referralData()
        }
    }, [isFocused]);

  return (
    <View className='flex-1 mt-6 px-4'>
        <View className='flex-1'>
            {referralLoading ? 
            (
                <View className="w-full justify-center">
                    <Skeleton.Group show={referralLoading}>
                        <View className='w-full mb-4 flex-row items-center'>
                            <Skeleton height={100} width={'100%'} {...skeletonProps} />
                        </View>
                    </Skeleton.Group>
                </View>
            ) : (
                <View className='w-full flex-row justify-between rounded-md bg-brown-500 px-4 py-6'>
                    <View className='w-[55%] gap-1'>
                        <View className='flex-row items-center gap-1'>
                            <View className='size-[20px]'>
                                <Image source={images.referralCoin} width={20} height={20} resizeMode='cover' className='w-full h-full'/>
                            </View>
                            <Text className="text-lg font-mbold" style={{color: theme.colors.text}}>Total Earned</Text>
                        </View>
                        <Text className="text-lg font-mmedium" style={{color: theme.colors.text}}>{displayCurrency(Number(refData.totalEarned))}</Text>
                    </View>
                    <View className='gap-1 w-[40%]'>
                        <View className='flex-row items-center gap-1'>
                            <View className='size-[20px]'>
                                <Image source={images.inviteUser} width={20} height={20} resizeMode='cover' className='w-full h-full'/>
                            </View>
                            <Text className="text-lg font-mbold" style={{color: theme.colors.text}}>Invites</Text>
                        </View>
                        <Text className="text-lg font-mmedium" style={{color: theme.colors.text}}>{refData.invitees}</Text>
                    </View>
                </View>  
            )}
        </View>
    </View>
  )
}

export default Referrals