import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import GradientButton from '@/components/GradientButton'
import { router } from 'expo-router'
import { OtpInput } from 'react-native-otp-entry'
import OnboardModal from '@/components/OnboardModal'
import { useThemeStore } from '@/store/ThemeStore'
import RNPickerSelect from 'react-native-picker-select';
import { data } from '@/constants'
import { MaterialIcons } from '@expo/vector-icons'

const CreateProfile = () => {

  const { theme } = useThemeStore();
  const [openModal, setOpenModal] = useState(false)
  const [selectedGender, setSelectedGender] = useState();
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    gender: '',
    username: ''
  })

  
    const handleModal = () => {
      setOpenModal(true)
    }
  
    const closeModal = () => {
      setOpenModal(false)
    }
  
    const verify = async () => {
      setOpenModal(false)
      router.replace("/(protected)/(routes)/Home")
    }
  
    const resendOTP = async () => {
      
    }
 
  return (
    <SafeAreaView className='h-full flex-1' style={{ backgroundColor: theme.colors.background}}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-8'>
                <View className='flex-1 py-6'>
                    <View className="flex-1 w-full justify-center items-center my-6">
                        <Text className="text-2xl mt-4 font-mbold" style={{color: theme.colors.text}}>Create Your Profile</Text>
                        <FormField value={form.fullname} placeholder="Fullname" handleChangeText={(e: any) => setForm({ ...form, fullname: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <FormField value={form.email} placeholder="Email" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address" labelStyle='text-white'/>
                        <FormField value={form.gender} placeholder="Gender" handleChangeText={(e: any) => setForm({ ...form, gender: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <View className='mt-7'>
                          <Text className='text-base font-rbold pb-2 text-green'>Gender</Text>
                          <RNPickerSelect
                              onValueChange={(value) => setSelectedGender(value)}
                              items={data.gender}
                              value={selectedGender}
                              placeholder={{ label: 'Select gender', value: null }}
                              style={pickerSelectStyles}
                              useNativeAndroidPickerStyle={false}
                              Icon={() => {   
                                  return <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />;
                              }}
                          />
                      </View>
                        <FormField value={form.username} placeholder="Username" handleChangeText={(e: any) => setForm({ ...form, username: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <View className='w-full justify-center my-7'>
                            <GradientButton title="Complete" handlePress={handleModal} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <OnboardModal buttonTitle="Verify" buttonPress={verify} title='OTP Verification' visible={openModal} onClose={closeModal}>
            <View className='my-2 items-center justify-center'>
              <Text className="text-brown-100 font-mmedium text-center">
                Enter the 6-digit code sent via the Email Address <Text className='text-brown-400'>frankzeal93@gmail.com</Text>
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
        </OnboardModal>

        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default CreateProfile


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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F3F3F3',
    height: 52,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F3F3F3',
    height: 52
  },
  iconContainer: {
    top: 10,
    right: 10,
  }
});
