import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import GradientButton from '@/components/GradientButton'
import { router, useLocalSearchParams } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { useThemeStore } from '@/store/ThemeStore'
import z from 'zod'
import Toast from 'react-native-toast-message'
import { axiosClient } from '@/globalApi'
import FullScreenLoader from '@/components/FullScreenLoader'

const newPasswpordSchema = z
.object({
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

const NewForgotPassword = () => {

   const { theme } = useThemeStore();
   const { userId } = useLocalSearchParams() as any
   console.log(userId)
   const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {

        const result = newPasswpordSchema.safeParse(form)
                
        if (!result.success) {
            const firstIssue = result.error.issues[0];
    
            return Toast.show({
                type: 'info',
                text1: firstIssue.message,
                text2: "Please check your inputs.",
            });
        }

        try {

            setIsSubmitting(true)
            
            const data = {
                user_id: userId,
                new_password: form.password,
                confirm_new_password: form.confirmPassword
            }

            const result = await axiosClient.put("/auth/reset-password", data)

            console.log(result.data)
            Toast.show({
                type: 'success',
                text1: result.data.message,
                text2: "Successful",
            });
            router.replace("/(onboarding)/LogIn")

            setForm({
                password: '',
                confirmPassword: ''
            })

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error.response.data.message
            });  
            console.log(error.response.data.message)

        } finally {
            setIsSubmitting(false)
        } 
    }
 
  return (
    <SafeAreaView className='h-full flex-1' style={{ backgroundColor: theme.colors.background}}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-8'>
                <View className='flex-1 py-6'>
                    <View className="flex-1 w-full justify-center items-center my-6">
                        <Text className="text-2xl mt-4 font-mbold" style={{color: theme.colors.text}}>Reset Your Password</Text>
                        <Text className="mt-1 font-mmedium text-center px-6" style={{color: theme.colors.text}}>Enter Your New Password</Text>
                        <FormField title="New Password*" value={form.password} placeholder="Enter Your New Password" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <FormField title="Confirm New Password*" value={form.confirmPassword} placeholder="Confirm New Password" handleChangeText={(e: any) => setForm({ ...form, confirmPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <View className='w-full justify-center my-7'>
                            <GradientButton title="Continue" handlePress={submit} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                        </View>
                         <View className='w-full justify-center mb-7'>
                            <CustomButton title="Cancel" handlePress={() => router.replace("/(onboarding)/ForgotPassword")} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
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

export default NewForgotPassword