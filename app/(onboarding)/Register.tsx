import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
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
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import DisablePartInput from '@/components/DisablePartInput'
import { useThemeStore } from '@/store/ThemeStore'
import { data } from '@/constants'
import { z } from "zod"
import Toast from 'react-native-toast-message'
import { axiosClient } from '@/globalApi'
import FullScreenLoader from '@/components/FullScreenLoader'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useProfileStore } from '@/store/ProfileStore'
import { useAuthStore } from '@/store/AuthStore'
import ErrorText from '@/components/ErrorText'
import SuccessText from '@/components/SuccessText'

type countryType =  {
  name: { en: string },
  dial_code: string,
  code: string,
  flag: string,
}

const registerSchema = z
.object({
  country: z
    .string()
    .min(1, "Country is required"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(11,"Phone number is greater than 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
    
  referralCode: z.string(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .meta({ description: "Password must be strong and secure" }),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


type RegisterFormValues = z.infer<typeof registerSchema>

const Register = () => {

  const { theme } = useThemeStore();
  const [isChecked, setChecked] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [phoneNoError, setPhoneNoError] = useState("")
  const [OTPError, setOTPError] = useState("")
  const [OTPResendSuccess, setOTPResendSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otp, setOtp] = useState('');
  const [resendLoading, setResendLoading] = useState(false)
  const [key, setKey] = useState(0); // Unique key to force remount
  const [selectedCountry, setSelectedCountry] = useState<countryType | null>(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [form, setForm] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  })
  const login = useAuthStore((state) => state.login);
  const setProfile = useProfileStore((state) => state.setProfile);

  const removeFirstZero = form.phoneNumber.startsWith("0") ? form.phoneNumber.slice(1) : form.phoneNumber;

  const handleCountry = (country: countryType) => {
    setSelectedCountry(country)
    setShowModal(false)
  }

  const confirm = () => {

    const newForm= {
      ...form,
      country: selectedCountry?.name?.en || ""
    }

    const result = registerSchema.safeParse(newForm)
        
    if (!result.success) {
      const firstIssue = result.error.issues[0];
      // const field = firstIssue.path[0] as keyof RegisterFormValues;

      return Toast.show({
        type: 'info',
        text1: firstIssue.message,
        text2: "Please check your inputs.",
      });
    }

    if(!isChecked){
      return Toast.show({
        type: 'info',
        text1: "Accept terms of service",
        text2: "Please read and accept our terms of service and privacy policy",
      });
    }

    setConfirmModal(true)
  }

  const closeConfirmModal = () => {
    setConfirmModal(false)
    setShowOTP(false)
  }

  const verify = async () => {

    if(!otp){
      setOTPError("OTP fields can't be empty")
      return
    }

    if(otp.length < 6){
      setOTPError("OTP needs 6 digits")
      return 
    }

    if(resendLoading){
      setOTPError("Please wait for loading to finish")
      return 
    }

    setOTPError("")
    setOTPResendSuccess("")
    setPhoneNoError("")

    try {

      const data = {
        phoneNumber: userPhoneNumber,
        verificationCode: otp
      }

      console.log("otp-data", otp)
      
      setIsSubmitting(true)

      const result = await axiosClient.post("/auth/verify-account", data)

      console.log("otp-result", result.data)
      const user = {
        phoneNumber: result.data.data.user.phoneNumber || "",
        countryOfResidence: result.data.data.user.countryOfResidence || "",
        email: "",
        fullName: "",
        profilePicture: "",
        kycVerified: false,
        gender: ""
      }
      const userData = JSON.stringify(user);
      await SecureStore.setItemAsync("accessToken", result.data.data.user.accessToken);
      login(result.data.user.accessToken);
      await SecureStore.setItemAsync("refreshToken", result.data.data.user.refreshToken);
      await AsyncStorage.setItem("userProfile", userData);
      setProfile(user)

      setConfirmModal(false)
      setShowOTP(false)
      router.replace("/(protected)/(routes)/CreateProfile")

    } catch (error: any) {
      setOTPError(error.response.data.message)
      setOtp("");
      setKey(prev => prev + 1);
    } finally {
      setIsSubmitting(false)
    }

  }

  const getOTP = async () => {

    setPhoneNoError("")

    const phone = `${selectedCountry?.dial_code}${removeFirstZero}`;

    const removePlusSign = phone.replace("+", "");

    const cResidence = selectedCountry?.name.en;

    try {

      setIsSubmitting(true)
      
      const data ={
        countryOfResidence: cResidence,
        phoneNumber: removePlusSign,
        password: form.password,
        confirmPassword: form.confirmPassword,
        referralCode: form.referralCode
      }

      console.log(data)
      const result = await axiosClient.post("/auth/register", data)

      console.log(result.data)

      setUserPhoneNumber(result.data?.data?.user?.phoneNumber)

      setConfirmModal(true)
      setShowOTP(true)


      setForm({
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        referralCode: ''
      })
      setSelectedCountry(null)

    } catch (error: any) {
      setPhoneNoError(error.response.data.message)
      console.log(error.response.data.message)

      if(error.response.status === 409){
        router.push("/(onboarding)/LogIn")

        setForm({
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          referralCode: ''
        })
        setSelectedCountry(null)
      }

    } finally {
      setIsSubmitting(false)
    } 
  }

  const resendOTP = async () => {

    setOTPError("")
    setOTPResendSuccess("")
    setPhoneNoError("")
    setResendLoading(true)

    try {
      
      const result = await axiosClient.post("/auth/resend-otp", {
        phoneNumber: userPhoneNumber,
      })

      console.log("resend-info", result.data)

      setOTPResendSuccess(result.data.message)

    } catch (error: any) {
      setPhoneNoError(error.response.data.message)
      console.log(error.response.data)
    } finally {
      setResendLoading(false)
    }
  }

 
  return (
    <SafeAreaView className='h-full flex-1'  style={{ backgroundColor: theme.colors.background}}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-8'>
              <View className='flex-1 py-6'>
                <View className="flex-1 w-full justify-center items-center my-6">
                  <Text className="text-2xl mt-4 font-mbold" style={{ color: theme.colors.text}}>Sign Up</Text>
                  <Text className="mt-1 font-mmedium text-center px-6" style={{ color: theme.colors.text}}>Turn your dreams into reality, your path to wealth Begins Here</Text>
                  
                  <TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.8} style={{ backgroundColor: theme.colors.inputBg}} className={`w-full h-16 px-4 mt-7 rounded-md items-center justify-between flex-row gap-1`}>
                    <View className='flex-1'>
                      <Text className='text-lg text-gray-500 font-mmedium' numberOfLines={1}>{selectedCountry?.name?.en ?? 'Country'}</Text>
                    </View>
                    <Entypo name='chevron-small-down' size={30} color="#979797" />
                  </TouchableOpacity>

                  <DisablePartInput value={form.phoneNumber} disabledValue={selectedCountry?.dial_code ?? "+000"} placeholder="Phone Number" handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e })} otherStyles="mt-7" labelStyle='text-white'/>
                  
                  <FormField title="Password*" value={form.password} placeholder="Create Password" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7" labelStyle='text-white'/>
                  <FormField title="Confirm Password*" value={form.confirmPassword} placeholder="Confirm Password" handleChangeText={(e: any) => setForm({ ...form, confirmPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                  <FormField title="Referral Code" value={form.referralCode} placeholder="Referral Code" handleChangeText={(e: any) => setForm({ ...form, referralCode: e })} otherStyles="mt-7" labelStyle='text-white'/>
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

        <OnboardModal buttonTitle={showOTP ? "Verify" : "Get OTP"} buttonPress={showOTP ? verify : getOTP} title='OTP Verification' visible={confirmModal} loading={isSubmitting} onClose={closeConfirmModal}>
          {showOTP ? (
            <View className='my-2 items-center justify-center'>
              <Text className="text-brown-100 font-mmedium text-center">
                Enter the 6-digit code sent via the phone number <Text className='text-brown-400'>+{userPhoneNumber}</Text>
              </Text>
              <View className="items-center justify-center my-5">
                {OTPError && <ErrorText error={OTPError}/>}
                {OTPResendSuccess && <SuccessText error={OTPResendSuccess}/>}
                <OtpInput
                  key={key}
                  numberOfDigits={6}
                  onTextChange={(text) => setOtp(text)}
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
                  {resendLoading ? ( 
                  <FontAwesome5 name="circle-notch" size={20} color="#FFAE4D" className='animate-spin'/>
                ) : (
                  <TouchableOpacity onPress={resendOTP}>
                    <Text className="text-brown-400 font-msbold">Resend OTP</Text>
                  </TouchableOpacity >
                )}
                </View>
              </View>
            </View>
          ) : (
            <View className='my-2 items-center justify-center'>
              <Text className="text-brown-100 font-mmedium text-center">
                We will send a One-Time Password to your phone number below
              </Text>
              <View className="items-center justify-center my-7">
                {phoneNoError && <ErrorText error={phoneNoError}/>}
                <Text className="text-white font-mbold text-xl">{`${selectedCountry?.dial_code}${removeFirstZero}`}</Text>
                <View className='h-0.5 w-52 bg-orange' />
              </View>
              
            </View>
          )}
        </OnboardModal>

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
                      {data.countries.map((country, index) => (
                        <TouchableOpacity key={index} onPress={() => handleCountry(country)} className={`flex-row gap-2 w-full items-center py-4 ${index === 0 && 'border-b border-gray-100'}`}>
                          <View className='flex-row gap-2 items-center'>
                            <Text className='font-msbold text-2xl'>{country.flag}</Text>
                            <Text className='font-msbold text-xl' style={{color: theme.colors.text}}>{country.name.en}</Text>
                          </View>
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
