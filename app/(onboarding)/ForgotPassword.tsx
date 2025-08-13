import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
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
import ManualPartInput from '@/components/ManualPartInput'
import z from 'zod'
import { data } from '@/constants'
import Toast from 'react-native-toast-message'
import { axiosClient } from '@/globalApi'
import FullScreenLoader from '@/components/FullScreenLoader'
import ErrorText from '@/components/ErrorText'
import SuccessText from '@/components/SuccessText'
import { FontAwesome5 } from '@expo/vector-icons'

type countryType =  {
  name: { en: string },
  dial_code: string,
  code: string,
  flag: string,
}

const forgotSchema = z
.object({
  email: z
    .email("Invalid email")
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal('')),
  phoneNumber: z
    .string()
    .max(11, "Phone number is greater than 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .optional().or(z.literal(''))
})
.refine(
  (data) => data.email || data.phoneNumber,
  {
    message: "Either email or phone number is required",
    path: [],
  }
);

const ForgotPassword = () => {

  const { theme } = useThemeStore();
  const [form, setForm] = useState({
    email: '',
    phoneNumber: ''
  })
  const [switchToEmail, setSwitchToEmail] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
   const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<countryType>({
    name: { en: "Nigeria" },
    dial_code: "+234",
    code: "NG",
    flag: "🇳🇬"
  });
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [OTPPhoneError, setOTPPhoneError] = useState("")
  const [OTPEmailError, setOTPEmailError] = useState("")
  const [OTPEmailResendSuccess, setOTPEmailResendSuccess] = useState("")
  const [OTPPhoneResendSuccess, setOTPPhoneResendSuccess] = useState("")
  const [emailOTP, setEmailOTP] = useState("")
  const [phoneOTP, setPhoneOTP] = useState("")
  const [resendPhoneLoading, setResendPhoneLoading] = useState(false)
  const [resendEmailLoading, setResendEmailLoading] = useState(false)
  const [emailKey, setEmailKey] = useState(0);
  const [phoneKey, setPhoneKey] = useState(0);

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCountry = (country: countryType) => {
    setSelectedCountry(country)
    setShowModal(false)
  }

  const handleSwitch = () => {
    setSwitchToEmail(!switchToEmail)
  }
  
    const closeModal = () => {
      setOpenModal(false)
    }
  
    const verify = async () => {

      setOTPPhoneError("")
      setOTPPhoneResendSuccess("")
      setOTPEmailError("")
      setOTPEmailResendSuccess("")

      const result = forgotSchema.safeParse(form);
      
      if (!result.success) {
        const firstIssue = result.error.issues[0];

        return Toast.show({
          type: 'info',
          text1: firstIssue.message,
          text2: "Please check your inputs",
        });
      }
  
      const removeFirstZero = form.phoneNumber.startsWith("0") ? form.phoneNumber.slice(1) : form.phoneNumber;
      const phone = `${selectedCountry?.dial_code}${removeFirstZero}`;
  
      const removePlusSign = phone.replace("+", "");
  
      const payload = form.phoneNumber ? { phoneNumber: removePlusSign }
          : { email: form.email };
  
      console.log("Submitting:", payload);
  
      try {
  
        setIsSubmitting(true)
  
        const result = await axiosClient.post("/auth/forgot-password", payload)
  
        console.log(result.data)
  
        if(form.phoneNumber){
          setUserPhoneNumber(result.data.data.user.phoneNumber || "")
        }else{
          setUserEmail(result.data.data.user.email || "")
        }
  
        setOpenModal(true)
  
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message
        });
        console.log("err", error.response.data.message)
  
      } finally {
        setIsSubmitting(false)
      } 
    }
  
    const resendOTP = async () => {
      setOTPPhoneError("")
      setOTPPhoneResendSuccess("")
      setOTPEmailError("")
      setOTPEmailResendSuccess("")

      if(form.phoneNumber){
        setResendPhoneLoading(true)
    
        try {
          
          const result = await axiosClient.post("/auth/forgot-password", {
            phoneNumber: userPhoneNumber,
          })
    
          console.log("resend-info", result.data)
    
          setOTPPhoneResendSuccess(result.data.message)
    
        } catch (error: any) {
          setOTPPhoneError(error.response.data.message)
          console.log(error.response.data)
        } finally {
          setResendPhoneLoading(false)
          setOpenModal(true)
        }
      }else{
        setResendEmailLoading(true)
    
        try {
          
          const result = await axiosClient.post("/auth/forgot-password", {
            email: userEmail,
          })
    
          console.log("resend-email-info", result.data)
    
          setOTPEmailResendSuccess(result.data.message)
    
        } catch (error: any) {
          setOTPEmailError(error.response.data.message)
          console.log(error.response.data)
        } finally {
          setResendEmailLoading(false)
          setOpenModal(true)
        }
      }
    }

  const submitOTP = async () => {

    setOTPPhoneError("")
    setOTPPhoneResendSuccess("")
    
    setOTPEmailError("")
    setOTPEmailResendSuccess("")

    if(form.phoneNumber){
      if(!phoneOTP){
        setOTPPhoneError("OTP fields can't be empty")
        return
      }
  
      if(phoneOTP.length < 6){
        setOTPPhoneError("OTP needs 6 digits")
        return 
      }
  
      if(resendPhoneLoading){
        setOTPPhoneError("Please wait for loading to finish")
        return 
      }
  
  
      try {
  
          const data = {
            phoneNumber: userPhoneNumber,
            verificationCode: phoneOTP
          }
  
          console.log("otp-phone", phoneOTP)
          
          setIsSubmitting(true)
    
          const result = await axiosClient.post("/auth/verify-reset-password-otp", data)
    
          console.log("otp-result", result.data)

          setOpenModal(false)
          router.replace({
            pathname: "/(onboarding)/NewForgotPassword",
            params: { userId: result.data.data.userId },
          })
  
        } catch (error: any) {
          setOTPPhoneError(error.response.data.message)
          setOpenModal(true)
        } finally {
          setPhoneOTP("");
          setPhoneKey(prev => prev + 1);
          setIsSubmitting(false)
        }
    }else{
      if(!emailOTP){
        setOTPEmailError("OTP fields can't be empty")
        return
      }
  
      if(emailOTP.length < 6){
        setOTPEmailError("OTP needs 6 digits")
        return 
      }
  
      if(resendEmailLoading){
        setOTPEmailError("Please wait for loading to finish")
        return 
      }
  
      try {
  
          const data = {
            email: userEmail,
            verificationCode: emailOTP
          }
  
          console.log("otp-email", emailOTP)
          
          setIsSubmitting(true)
    
          const result = await axiosClient.post("/auth/verify-reset-password-otp", data)
    
          console.log("otp-result", result.data)

          setOpenModal(false)
          router.replace({
            pathname: "/(onboarding)/NewForgotPassword",
            params: { userId: result.data.data.userId },
          })
  
        } catch (error: any) {
          setOTPEmailError(error.response.data.message)
          setOpenModal(true)
        } finally {
          setEmailOTP("");
          setEmailKey(prev => prev + 1);
          setIsSubmitting(false)
        }
    }
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
                              <FormField value={form.email} placeholder="Email" handleChangeText={(e: any) => setForm({ ...form, email: e, phoneNumber: "" })} otherStyles="mt-7" keyboardType="email-address" labelStyle='text-white'/>
                            ) : (
                              <ManualPartInput value={form.phoneNumber} dailCode={selectedCountry.dial_code} flag={selectedCountry.flag} showModal={handleShowModal} placeholder="Phone Number" handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e, email: "" })} otherStyles="mt-7" labelStyle='text-white'/>
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

        <OnboardModal buttonTitle="Verify" buttonPress={submitOTP} title='OTP Verification' visible={openModal} loading={isSubmitting} onClose={closeModal}>
            {form.email ? (
              <View className='my-2 items-center justify-center'>
                <Text className="text-brown-100 font-mmedium text-center">
                  Enter the 6-digit code sent via the Email <Text className='text-brown-400'>{userEmail}</Text>
                </Text>
                <View className="items-center justify-center my-6">
                  {OTPEmailError && <ErrorText error={OTPEmailError}/>}
                  {OTPEmailResendSuccess && <SuccessText error={OTPEmailResendSuccess}/>}
                    <OtpInput
                      key={emailKey}
                      numberOfDigits={6}
                      onTextChange={(text) => setEmailOTP(text)}
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
                      {resendEmailLoading ? ( 
                        <FontAwesome5 name="circle-notch" size={16} color="#FFAE4D" className='animate-spin'/>
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
                    Enter the 6-digit code sent via the phone number <Text className='text-brown-400'>+{userPhoneNumber}</Text>
                  </Text>
                  <View className="items-center justify-center my-6">
                    {OTPPhoneError && <ErrorText error={OTPPhoneError}/>}
                    {OTPPhoneResendSuccess && <SuccessText error={OTPPhoneResendSuccess}/>}
                    <OtpInput
                      key={phoneKey}
                      numberOfDigits={6}
                      onTextChange={(text) => setPhoneOTP(text)}
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
                      {resendPhoneLoading ? ( 
                        <FontAwesome5 name="circle-notch" size={16} color="#FFAE4D" className='animate-spin'/>
                      ) : (
                        <TouchableOpacity onPress={resendOTP}>
                          <Text className="text-brown-400 font-msbold">Resend OTP</Text>
                        </TouchableOpacity >
                      )}
                    </View>
                  </View>
                </View>
              )
            }
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

      <FullScreenLoader visible={isSubmitting || resendEmailLoading || resendPhoneLoading} />
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
