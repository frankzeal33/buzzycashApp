import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import FormField from '@/components/FormField'
import GradientButton from '@/components/GradientButton'
import { useThemeStore } from '@/store/ThemeStore'

const ChangePasswordScreen = () => {

  const { theme } = useThemeStore();
  const [form, setForm] = useState({
    password: '',
    NewPassword: '',
    ConfirmPassword: ''
  })

  const confirm = async () => {

  } 

  return (
    <SafeAreaView className='h-full flex-1 bg-gray-100 px-4'>
      <Header icon onpress={() => router.back()}/>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className='w-full px-4'>
            <View className='flex-1 py-6'>
              <View className="flex-1 w-full justify-center items-center my-6">
                <Text className="text-2xl mt-4 font-mbold">Change Password</Text>
                <Text className="mt-1 font-mmedium text-center px-6">Create New Password</Text>

                
                <FormField title="Current Password*" value={form.password} placeholder="Current Password" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7" labelStyle='text-white'/>
                <FormField title="New Password*" value={form.NewPassword} placeholder="New Password" handleChangeText={(e: any) => setForm({ ...form, NewPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                <FormField title="Confirm New Password*" value={form.ConfirmPassword} placeholder="Confirm New Password" handleChangeText={(e: any) => setForm({ ...form, ConfirmPassword: e })} otherStyles="mt-7" labelStyle='text-white'/>
                
                <View className='w-full justify-center my-7'>
                  <GradientButton title="Continue" handlePress={confirm} containerStyles="w-[80%] mx-auto" textStyles='text-white'/>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen