import { View, Text, ScrollView, TouchableOpacity, Pressable, Modal, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import GradientButton from '@/components/GradientButton'
import { Link, router } from 'expo-router'
import Checkbox from 'expo-checkbox';
import OnboardModal from '@/components/OnboardModal'
import { OtpInput } from "react-native-otp-entry";
import { Entypo } from '@expo/vector-icons'
import { CountryPicker } from 'react-native-country-codes-picker';
import DisablePartInput from '@/components/DisablePartInput'
import { useThemeStore } from '@/store/ThemeStore'

const Register = () => {

  const { theme } = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false)
  const [showOTP, setShowOTP] = useState(false)

  const [showCountry, setShowCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>({});

  const [form, setForm] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    ConfirmPassword: ''
  })

  const confirm = () => {
    setConfirmModal(true)
  }

  const closeConfirmModal = () => {
    setConfirmModal(false)
    setShowOTP(false)
  }

  const getOTP = async () => {
    setShowOTP(true)
  }

  const verify = async () => {
    setConfirmModal(false)
    setShowOTP(false)
    router.push("/(onboarding)/CreateProfile")
  }

  const resendOTP = async () => {
    
  }

 
  return (
    <SafeAreaView className='h-full flex-1'  style={{ backgroundColor: theme.colors.background}}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-8'>
              <View className='flex-1 py-6'>
                <View className="flex-1 w-full justify-center items-center my-6">
                  <Text className="text-2xl mt-4 font-mbold" style={{ color: theme.colors.text}}>Sign Up</Text>
                  <Text className="mt-1 font-mmedium text-center px-6" style={{ color: theme.colors.text}}>Turn your dreams into reality, your path to wealth Begins Here</Text>
                  
                  <TouchableOpacity onPress={() => setShowCountry(true)} style={{ backgroundColor: theme.colors.inputBg}} className={`w-full h-16 px-4 mt-7 rounded-md items-center justify-between flex-row gap-1`}>
                    <View className='flex-1'>
                      <Text className='text-lg text-gray-500 font-mmedium' numberOfLines={1}>{selectedCountry?.name?.en ?? 'Country'}</Text>
                    </View>
                    <Entypo name='chevron-small-down' size={30} color="#979797" />
                  </TouchableOpacity>

                  <DisablePartInput value={form.phoneNumber} disabledValue={selectedCountry?.dial_code ?? "+000"} placeholder="Phone Number" handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e })} otherStyles="mt-7" labelStyle='text-white'/>
                  
                  <FormField title="Password*" value={form.password} placeholder="Create Password" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7" labelStyle='text-white'/>
                  <FormField title="Confirm Password*" value={form.ConfirmPassword} placeholder="Confirm Password" handleChangeText={(e: any) => setForm({ ...form, ConfirmPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                  <View className='w-full flex-row items-start gap-2 my-5'>
                    <Checkbox value={isChecked} onValueChange={setChecked} color='#EF4734' style={{borderRadius: 5}}/>
                    <View className="flex-row flex-wrap flex-1 -mt-1">
                      <Text className="font-rlight" style={{ color: theme.colors.text}}>I am 18+ and I agree with <Link href={"/(onboarding)/Terms"}><Text className="font-mbold">Privacy Policy. Terms of Service. All Game Policy. Responsible Gaming. About Us.</Text></Link></Text>
                    </View>
                  </View>
                  <View className='w-full justify-center mb-7'>
                    <GradientButton title="Register" handlePress={confirm} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                  </View>
                  <View className="flex-row gap-1 items-center justify-center">
                    <Text className="text-center font-msbold" style={{ color: theme.colors.text}}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/(onboarding)/LogIn")}>
                        <Text className="text-orange font-mbold">Log In</Text>
                    </TouchableOpacity >
                  </View>
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <OnboardModal buttonTitle={showOTP ? "Verify" : "Get OTP"} buttonPress={showOTP ? verify : getOTP} title='OTP Verification' visible={confirmModal} onClose={closeConfirmModal}>
          {showOTP ? (
            <View className='my-2 items-center justify-center'>
              <Text className="text-brown-100 font-mmedium text-center">
                Enter the 6-digit code sent via the phone number <Text className='text-brown-400'>+2349012121314</Text>
              </Text>
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
          ) : (
            <View className='my-2 items-center justify-center'>
              <Text className="text-brown-100 font-mmedium text-center">
                We will send a One-Time Password to your phone number below
              </Text>
              <View className="items-center justify-center my-8">
                <Text className="text-white font-mbold text-xl">+2349189764627</Text>
                <View className='h-0.5 w-52 bg-orange' />
              </View>
            </View>
          )}
        </OnboardModal>

        <CountryPicker
          lang='en'
          show={showCountry}
          pickerButtonOnPress={(item) => {
            setSelectedCountry(item);
            setShowCountry(false);
          }}
          style={{
            modal: {
              height: '90%',
            }
          }}
        />

        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default Register

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
