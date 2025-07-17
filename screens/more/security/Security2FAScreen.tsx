import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { images } from '@/constants'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import GradientButton from '@/components/GradientButton'
import { useThemeStore } from '@/store/ThemeStore'
import { StatusBar } from 'expo-status-bar'

const Security2FAScreen = () => {

  const { theme } = useThemeStore();
  const copyCode = () => {

  }

  const security = () => {

  }

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{backgroundColor: theme.colors.background}}>
      <Header title='Two Factor Authentication' icon onpress={() => router.back()}/>
      <ScrollView>
        <View className='gap-6 pb-8'>
          <View>
            <Text className="font-mmedium text-center" style={{color: theme.colors.text}}>Your account will be more secure if you use this feature. A 6-digit verification code from your Google Authenticator app must be input whenever someone tries to log in to your account without your consent. This is to protectyour account.</Text>
          </View>
          <View className='rounded-md p-4' style={{backgroundColor: theme.colors.darkGray}}>
            <Text className="text-xl font-mbold mt-1 text-center" style={{color: theme.colors.text}}>Add Your Account</Text>
            <Text className="font-msbold mt-1" style={{color: theme.colors.text}}>Use the QR code or setup key on your Google Authenticator app to add your account.</Text>

            <View className='size-[170px] mx-auto my-4'>
              <Image source={images.qrcode} width={170} height={170} resizeMode='cover' className='w-full h-full'/>
            </View>
            <Text className="font-msbold mt-1" style={{color: theme.colors.text}}>Setup Key</Text>
            <Pressable onPress={copyCode} className='my-4 flex-row items-center justify-between rounded-md bg-gray-500 p-4' style={{backgroundColor: theme.dark ? theme.colors.inputBg : "#979797"}}>
              <View className='flex-1'>
                <Text className="text-base font-msbold" style={{color: theme.colors.text}}>DOSWODRVBSRM7NST</Text>
              </View>
              <View className='flex-row items-center gap-1'>
                <FontAwesome6 name="copy" size={18} color="#FFAE4D" />
                <Text className="text-sm font-mbold text-brown-400">Copy</Text>
              </View>
            </Pressable>
            <View>
              <View className='flex-row items-center gap-1'>
                <FontAwesome5 name="info-circle" size={16} color="#8bb7f0" />
                <Text className="font-mmedium" style={{color: theme.colors.text}}>Help</Text>
              </View>
              <Text className="font-mmedium" style={{color: theme.colors.text}}>Google Authenticator is a multifactor app for mobile devices. It generates timed codes used during the 2-step verification process. To use Google Authenticator, install the Google Authenticator application on your mobile device.</Text>
              <Pressable><Text className='font-mmedium underline' style={{color: theme.colors.text}}>Download</Text></Pressable>
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
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default Security2FAScreen