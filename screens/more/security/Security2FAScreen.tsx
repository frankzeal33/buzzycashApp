import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { images } from '@/constants'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import GradientButton from '@/components/GradientButton'
import { useThemeStore } from '@/store/ThemeStore'

const Security2FAScreen = () => {

  const { theme } = useThemeStore();
  const copyCode = () => {

  }

  const security = () => {

  }

  return (
    <SafeAreaView className='h-full flex-1 bg-gray-100 px-4'>
      <Header title='Two Factor Authentication' icon onpress={() => router.back()}/>
      <ScrollView>
        <View className='gap-6 pb-8'>
          <View>
            <Text className="font-mmedium text-center">Your account will be more secure if you use this feature. A 6-digit verification code from your Google Authenticator app must be input whenever someone tries to log in to your account without your consent. This is to protectyour account.</Text>
          </View>
          <View className='bg-white rounded-md p-4'>
            <Text className="text-xl text-blue font-mbold mt-1 text-center">Add Your Account</Text>
            <Text className="text-blue font-msbold mt-1">Use the QR code or setup key on your Google Authenticator app to add your account.</Text>

            <View className='size-[170px] mx-auto my-4'>
              <Image source={images.qrcode} width={170} height={170} resizeMode='cover' className='w-full h-full'/>
            </View>
            <Text className="text-blue font-msbold mt-1">Setup Key</Text>
            <Pressable onPress={copyCode} className='my-4 flex-row items-center justify-between rounded-md bg-gray-500 p-4'>
              <View className='flex-1'>
                <Text className="text-base font-msbold">DOSWODRVBSRM7NST</Text>
              </View>
              <View className='flex-row items-center gap-1'>
                <FontAwesome6 name="copy" size={18} color="#FFAE4D" />
                <Text className="text-sm font-mbold text-brown-400">Copy</Text>
              </View>
            </Pressable>
            <View>
              <View className='flex-row items-center gap-1'>
                <FontAwesome5 name="info-circle" size={16} color="#8bb7f0" />
                <Text className="font-mmedium">Help</Text>
              </View>
              <Text className="font-mmedium">Google Authenticator is a multifactor app for mobile devices. It generates timed codes used during the 2-step verification process. To use Google Authenticator, install the Google Authenticator application on your mobile device.</Text>
              <Pressable><Text className='font-mmedium underline'>Download</Text></Pressable>
            </View>
          </View>
          <GradientButton
              title="Enable 2FA Security"
              handlePress={security}
              containerStyles="w-[85%] mx-auto"
              textStyles="text-white"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Security2FAScreen