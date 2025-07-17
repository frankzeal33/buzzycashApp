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

const EditProfileScreen = () => {

  const { theme } = useThemeStore();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [hasPickedDate, setHasPickedDate] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    fullname: "ojiego franklin",
    username: "frankzeal",
    date_of_birth: "16-06-1994",
    gender: "male"
  })

  const handleGender = (gender: string) => {
    setSelectedGender(gender)
    setShowModal(false)
  }

  const submit = async () => {
    router.replace("/(protected)/(routes)/Profile")
  }

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{backgroundColor: theme.colors.background}}>
      <Header icon onpress={() => router.back()}/>
      <View className='flex-1 w-full items-center justify-center'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            <View className='w-full gap-4 py-10'>
              <Text className="text-xl font-msbold mb-5 text-center" style={{ color: theme.colors.text}}>Edit Profile</Text>
              <EditProfileBox title='Full Name' placeholder="Enter fullname here" value={form.fullname}/>
              <EditProfileBox title='Username' placeholder="Enter username here" value={form.username}/>
              
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
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default EditProfileScreen