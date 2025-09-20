import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import FormField from '@/components/FormField'
import GradientButton from '@/components/GradientButton'
import { useThemeStore } from '@/store/ThemeStore'
import { StatusBar } from 'expo-status-bar'
import z from 'zod'
import Toast from 'react-native-toast-message'
import { axiosClient } from '@/globalApi'
import FullScreenLoader from '@/components/FullScreenLoader'

const passwordSchema = z
.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .meta({ description: "Password must be strong and secure" }),

  confirmNewPassword: z
    .string()
    .min(1, "Please confirm your new password"),
})
.refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New Passwords do not match",
  path: ["confirmNewPassword"],
});

const ChangePasswordScreen = () => {

  const { theme } = useThemeStore();
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const confirm = async () => {

    const result = passwordSchema.safeParse(form)
            
    if (!result.success) {
      const firstIssue = result.error.issues[0];

      return Toast.show({
        type: 'info',
        text1: firstIssue.message,
        text2: "Please check your inputs.",
      });
    }

    console.log(form)
    try {

      setIsSubmitting(true)
  
      const result = await axiosClient.put("/auth/change-password", {
        current_password: form.currentPassword,
        new_password: form.newPassword,
        confirm_new_password: form.confirmNewPassword
      })

      Toast.show({
        type: 'success',
        text1: result.data.message,
        text2: "Password Updated",
      });

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message || "Please try again later"
      });
      console.log(error.response.data)

    } finally {
      setIsSubmitting(false)
    } 
  } 

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{backgroundColor: theme.colors.background}}>
      <Header icon onpress={() => router.back()}/>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-4'>
            <View className='flex-1 py-6'>
              <View className="flex-1 w-full justify-center items-center my-6">
                <Text className="text-2xl mt-4 font-mbold" style={{color: theme.colors.text}}>Change Password</Text>
                <Text className="mt-1 font-mmedium text-center px-6" style={{color: theme.colors.text}}>Create New Password</Text>

                
                <FormField title="Current Password*" value={form.currentPassword} placeholder="Current Password" handleChangeText={(e: any) => setForm({ ...form, currentPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                <FormField title="New Password*" value={form.newPassword} placeholder="New Password" handleChangeText={(e: any) => setForm({ ...form, newPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                <FormField title="Confirm New Password*" value={form.confirmNewPassword} placeholder="Confirm New Password" handleChangeText={(e: any) => setForm({ ...form, confirmNewPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                
                <View className='w-full justify-center my-7'>
                  <GradientButton title="Continue" handlePress={confirm} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <FullScreenLoader visible={isSubmitting} />
        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen