import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import GradientButton from '@/components/GradientButton'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import OnboardModal from '@/components/OnboardModal'
import { OtpInput } from 'react-native-otp-entry'
import { useThemeStore } from '@/store/ThemeStore'

const ForgotPassword = () => {

const { theme } = useThemeStore();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [switchToEmail, setSwitchToEmail] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleSwitch = () => {
    setSwitchToEmail(!switchToEmail)
  }
  
    const closeModal = () => {
      setOpenModal(false)
    }
  
    const verify = async () => {
      setOpenModal(true)
    }
  
    const resendOTP = async () => {
      
    }

    const submitOTP = async () => {
      setOpenModal(false)
      router.replace("/(onboarding)/NewForgotPassword")
    }
 
  return (
    <SafeAreaView className='h-full flex-1' style={{ backgroundColor: theme.colors.background}}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-8'>
                <View className='flex-1 py-6'>
                    <View className="flex-1 w-full justify-center items-center my-6">
                        <Text className="text-2xl mt-4 font-mbold" style={{color: theme.colors.text}}>Forgot Password</Text>
                        <Text className="mt-1 font-mmedium text-center px-6" style={{color: theme.colors.text}}>{`Enter Your ${switchToEmail ? 'Email Address' : 'Phone Number'} to reset password`}</Text>
                        {switchToEmail ? (
                                <FormField placeholder="Email" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" labelStyle='text-white'/>
                            ) : (

                                <FormField placeholder="Phone Number" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" labelStyle='text-white'/>
                            )
                        }
                        <TouchableOpacity onPress={handleSwitch} className='mt-7'>
                          <Text className="text-orange font-mbold">{switchToEmail ? 'Use Phone Number' : 'Use Email'}</Text>
                        </TouchableOpacity>
                        <View className='w-full justify-center my-7'>
                            <GradientButton title="Continue" handlePress={verify} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                        </View>
                         <View className='w-full justify-center mb-7'>
                            <CustomButton title="Cancel" handlePress={() => router.back()} containerStyles="w-[80%] mx-auto"/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <OnboardModal buttonTitle="Verify" buttonPress={submitOTP} title='OTP Verification' visible={openModal} onClose={closeModal}>
            <View className='my-2 items-center justify-center'>
                {switchToEmail ? (
                    <Text className="text-brown-100 font-mmedium text-center">
                        Enter the 6-digit code sent via the Email <Text className='text-brown-400'>frankzeal93@gmail.com</Text>
                    </Text>
                ) : (
                    <Text className="text-brown-100 font-mmedium text-center">
                        Enter the 6-digit code sent via the phone number <Text className='text-brown-400'>+2349012121314</Text>
                    </Text>
                )}
                <View className="items-center justify-center my-6">
                <OtpInput
                    numberOfDigits={6}
                    onTextChange={(text) => console.log(text)}
                    theme={{
                    containerStyle: styles.container,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                    focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                    placeholderTextStyle: styles.placeholderText,
                    filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                    disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                }}
                />
                <View className="flex-row gap-1 items-center justify-center mt-8">
                    <Text className="text-center text-brown-100 font-msbold">Didn’t receive OTP?</Text>
                    <TouchableOpacity onPress={resendOTP}>
                        <Text className="text-brown-400 font-msbold">Resend OTP</Text>
                    </TouchableOpacity >
                </View>
                </View>
            </View>
        </OnboardModal>
        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default ForgotPassword


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: 280
  },
  pinCodeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 40,
    height: 45
  },
  pinCodeText: {
    color: '#111625',
    fontSize: 20,
    fontWeight: 'bold',
  },
  focusStick: {
    backgroundColor: '#FFAE4D',
  },
  activePinCodeContainer: {
    borderColor: '#FFAE4D',
    borderWidth: 2,
  },
  placeholderText: {
    color: '#ffffff',
  },
  filledPinCodeContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#FFAE4D',
  },
  disabledPinCodeContainer: {
    backgroundColor: '#e0e0e0',
  },
});
