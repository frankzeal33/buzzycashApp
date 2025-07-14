import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import GradientButton from '@/components/GradientButton'
import { router } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'

const LogIn = () => {

  const { theme } = useThemeStore();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const submit = async () => {
    router.replace("/(protected)/(routes)/Home")
  }

 
  return (
    <SafeAreaView className='h-full flex-1' style={{ backgroundColor: theme.colors.background}}>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-8'>
                <View className='flex-1 py-6'>
                    <View className="flex-1 w-full justify-center items-center my-6">
                        <Text className="text-2xl mt-4 font-mbold">Log In</Text>
                        <Text className="mt-1 font-mmedium text-center px-6">Enter Your Username/Email and Password</Text>
                        <FormField value={form.email} placeholder="Email or Username" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address" labelStyle='text-white'/>
                        <FormField title="Password*" value={form.password} placeholder="Password" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7" labelStyle='text-white'/>
                        <View className='w-full justify-center my-7'>
                            <GradientButton title="Log In" handlePress={submit} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                        </View>
                        <View className="flex-row gap-1 items-center justify-center">
                            <Text className="text-center font-msbold">Dont have an account?</Text>
                            <TouchableOpacity onPress={() => router.push("/(onboarding)/Register")}>
                                <Text className="text-orange font-mbold">Register</Text>
                            </TouchableOpacity >
                        </View>
                        <TouchableOpacity onPress={() => router.push("/(onboarding)/ForgotPassword")} className='mt-7'>
                            <Text className="text-orange font-mbold">Forgot Password?</Text>
                        </TouchableOpacity >
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        <StatusBar style='dark'/>
    </SafeAreaView>
  )
}

export default LogIn