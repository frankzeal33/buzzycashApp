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

const NewForgotPassword = () => {

   const [form, setForm] = useState({
        password: '',
        ConfirmPassword: ''
    })

    const submit = async () => {
      router.replace("/(onboarding)/LogIn")
    }
 
  return (
    <SafeAreaView className='bg-gray-100 h-full flex-1'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-8'>
                <View className='flex-1 py-6'>
                    <View className="flex-1 w-full justify-center items-center my-6">
                        <Text className="text-2xl mt-4 font-mbold">Reset Your Password</Text>
                        <Text className="mt-1 font-mmedium text-center px-6">Enter Your New Password</Text>
                        <FormField title="New Password*" value={form.password} placeholder="Enter Your New Password" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <FormField title="Confirm New Password*" value={form.ConfirmPassword} placeholder="Confirm New Password" handleChangeText={(e: any) => setForm({ ...form, ConfirmPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
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

        <StatusBar style='dark'/>
    </SafeAreaView>
  )
}

export default NewForgotPassword