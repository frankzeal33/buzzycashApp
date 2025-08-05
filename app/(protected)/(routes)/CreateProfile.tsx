import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
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
import { data } from '@/constants'
import { Entypo } from '@expo/vector-icons'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'
import z from 'zod'
import FullScreenLoader from '@/components/FullScreenLoader'
import * as SecureStore from "expo-secure-store";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useProfileStore } from '@/store/ProfileStore'

const profileSchema = z
.object({
  fullName: z
    .string()
    .min(1, "Fullname is required"),

  email: z.email("Invalid email address"),
    
  gender: z.
    string()
  .min(1, "Gender is required"),

  userName: z
    .string()
    .min(1, "Username is required")
    .refine((val) => !val.includes('@') && !val.includes('.com'), {
      message: "Username must not contain '@' or '.com'"})
})

const CreateProfile = () => {

  const { theme } = useThemeStore();
  const [openModal, setOpenModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    gender: '',
    userName: ''
  })
  const setProfile = useProfileStore((state) => state.setProfile);

  const handleGender = (gender: string) => {
    setForm({...form, gender})
    setShowModal(false)
  }
  
  const handleModal = async () => {
    // setOpenModal(true)

    const result = profileSchema.safeParse(form)
              
    if (!result.success) {
      const firstIssue = result.error.issues[0];
      // const field = firstIssue.path[0] as keyof RegisterFormValues;

      return Toast.show({
        type: 'info',
        text1: firstIssue.message,
        text2: "Please check your inputs.",
      });
    }

    try {
      
      setIsSubmitting(true)

      const result = await axiosClient.post("/profile/create-profile", form)

      console.log(result.data)
      const updateUser = {
        fullName: result.data.safeUser.fullName || "",
        email: result.data.safeUser.email || "",
        gender: result.data.safeUser.gender || "",
        userName: result.data.safeUser.userName || "",
      }

      await AsyncStorage.mergeItem('userProfile', JSON.stringify(updateUser));

      const recentProfile = await AsyncStorage.getItem('userProfile');
      const updatedProfile = recentProfile ? JSON.parse(recentProfile) : null;

      if (updatedProfile) {
       setProfile(updatedProfile);
      }


      setForm({
        fullName: '',
        email: '',
        gender: '',
        userName: ''
      })

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      });
    } finally {
      setIsSubmitting(false)
    }
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
                        <FormField value={form.fullName} placeholder="Fullname" handleChangeText={(e: any) => setForm({ ...form, fullName: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <FormField value={form.email} placeholder="Email" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address" labelStyle='text-white'/>
                        <TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.8} style={{ backgroundColor: theme.colors.inputBg}} className={`w-full h-16 px-4 mt-7 rounded-md items-center justify-between flex-row gap-1`}>
                          <View className='flex-1'>
                            <Text className='text-lg text-gray-500 font-mmedium capitalize' numberOfLines={1}>{(form.gender || 'gender').toLowerCase()}</Text>
                          </View>
                          <Entypo name='chevron-small-down' size={30} color="#979797" />
                        </TouchableOpacity>
                        <FormField value={form.userName} placeholder="Username" handleChangeText={(e: any) => setForm({ ...form, userName: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <View className='w-full justify-center my-7'>
                            <GradientButton title="Complete" handlePress={handleModal} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
{/* 
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
        </OnboardModal> */}

        <Modal
          transparent={true}
          visible={showModal}
          statusBarTranslucent={true}
          onRequestClose={() => setShowModal(false)}>
          <View className="flex-1 justify-center items-center px-7" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              {/* TouchableWithoutFeedback only around the background */}
              <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View className="absolute top-0 left-0 right-0 bottom-0" />
              </TouchableWithoutFeedback>

              {/* Actual modal content */}
              <View className="rounded-2xl max-h-[60%] px-4 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                  <View className='my-7 gap-2'>
                    {data.gender.map((sex, index) => (
                      <TouchableOpacity key={index} onPress={() => handleGender(sex.value)} className={`flex-row gap-2 w-full items-center py-4 ${index < 2 && 'border-b border-gray-100'}`}>
                        <Text className='font-msbold text-xl' style={{color: theme.colors.text}}>{sex.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
              </View>
          </View>
      </Modal>

      <FullScreenLoader visible={isSubmitting} />
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
