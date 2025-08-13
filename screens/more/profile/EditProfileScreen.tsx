import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import EditProfileBox from '@/components/EditProfileBox'
import DatePicker from 'react-native-date-picker'
import { data } from '@/constants'
import GradientButton from '@/components/GradientButton'
import { useThemeStore } from '@/store/ThemeStore'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import { axiosClient } from '@/globalApi'
import { useProfileStore } from '@/store/ProfileStore'
import FullScreenLoader from '@/components/FullScreenLoader'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditProfileScreen = () => {

  const { theme } = useThemeStore();
  const { userProfile, setProfile } = useProfileStore()
  
  const [date, setDate] = useState(userProfile?.dateOfBirth ? new Date(userProfile.dateOfBirth) : new Date());
  const [open, setOpen] = useState(false)
  const [hasPickedDate, setHasPickedDate] = useState(!!userProfile?.dateOfBirth);
  const [selectedGender, setSelectedGender] = useState(userProfile?.gender || null);
  const [showModal, setShowModal] = useState(false)
  const [fullName, setFullName] = useState(userProfile?.fullName || "");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const birthFormatted = moment(date).format("YYYY-MM-DD");
  
  const formerData = {
    fullName: userProfile.fullName,
    dateOfBirth: userProfile.dateOfBirth,
    gender: userProfile.gender
  }

  const newData = {
    fullName: fullName,
    dateOfBirth: birthFormatted,
    gender: selectedGender
  }


  const handleGender = (gender: string) => {
    setSelectedGender(gender)
    setShowModal(false)
  }

  const hasChanges = () => {

    const current = JSON.stringify(newData);
    const original = JSON.stringify(formerData);

    return current !== original;
  };

  const submit = async () => {

    if (!fullName) {
      return Toast.show({
        type: 'info',
        text1: "Full name is required",
        text2: "Please check your inputs.",
      });
    }

    if (!hasPickedDate) {
      return Toast.show({
        type: 'info',
        text1: "Date of birth is required",
        text2: "Please select your date of birth.",
      });
    }

    if (!selectedGender) {
      return Toast.show({
        type: 'info',
        text1: "Gender is required",
        text2: "Please select your gender.",
      });
    }

    if (!hasChanges()) {
      return Toast.show({
        type: 'info',
        text1: "No changes detected",
        text2: "No fields has been edited so far.",
      });
    }

    try {

      setIsSubmitting(true)

      const data = {
        fullName: fullName,
        dateOfBirth: birthFormatted,
        gender: selectedGender
      }

      const result = await axiosClient.patch("/profile/update-profile", data)

      const updateUser = {
        fullName: result.data.data.user.fullName || "",
        dateOfBirth: result.data.data.user.dateOfBirth || "",
        gender: result.data.data.user.gender || "",
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
        text2: "Profile Updated",
      });
      router.back()

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
      <View className='flex-1 w-full items-center justify-center'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            <View className='w-full gap-4 py-10'>
              <Text className="text-xl font-msbold mb-5 text-center" style={{ color: theme.colors.text}}>Edit Profile</Text>
              <EditProfileBox title='Full Name' placeholder="Enter fullname here" value={fullName} handleChangeText={e => setFullName(e)}/>
              
              <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.8} className='w-full h-16 gap-4 rounded-md flex-row justify-between px-4 items-center' style={{ backgroundColor: theme.colors.inputBg}}>
                <Text className='text-gray-500 font-mmedium'>Date of Birth</Text>
                <View className="flex-1">
                  <Text className='font-msbold text-right capitalize' style={{ color: theme.colors.text}} numberOfLines={1}>{hasPickedDate ? date.toISOString().split('T')[0] : 'select'}</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.8} className='w-full h-16 gap-4 rounded-md flex-row justify-between px-4 items-center' style={{ backgroundColor: theme.colors.inputBg}}>
                <Text className='text-gray-500 font-mmedium'>Gender</Text>
                <View className="flex-1">
                  <Text className='font-msbold text-right capitalize' style={{ color: theme.colors.text}} numberOfLines={1}>{(selectedGender ?? 'select').toLowerCase()}</Text>
                </View>
              </TouchableOpacity>

              <View className='w-full justify-center items-center my-7'>
                <GradientButton title="Save Changes" handlePress={submit} containerStyles="w-[80%]" textStyles='text-white'/>
              </View>

            </View>

          </ScrollView>
        </KeyboardAvoidingView>

        <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setHasPickedDate(true)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
            theme={theme.dark ? 'dark' : 'light'}
        />

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

      </View>

      <FullScreenLoader visible={isSubmitting} />
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default EditProfileScreen