import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import GradientButton from '@/components/GradientButton'
import { router } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'
import { data } from '@/constants'
import { Entypo } from '@expo/vector-icons'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'
import z from 'zod'
import FullScreenLoader from '@/components/FullScreenLoader'
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
        fullName: result.data.user.fullName || "",
        email: result.data.user.email || "",
        gender: result.data.user.gender || "",
        userName: result.data.user.username || "",
        isProfileCreated: result.data.user.isProfileCreated,
      }

      await AsyncStorage.mergeItem('userProfile', JSON.stringify(updateUser));

      const recentProfile = await AsyncStorage.getItem('userProfile');
      const updatedProfile = recentProfile ? JSON.parse(recentProfile) : null;

      if (updatedProfile) {
       setProfile(updatedProfile);
      }

      Toast.show({
        type: 'success',
        text1: result.data.message,
        text2: "welcome to BuzzyCash"
      });

      router.replace("/(protected)/(routes)/Home")

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

      if(error.response.status === 403){
        router.replace("/(protected)/(routes)/Home")
      }
      console.log(error.response.data)
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