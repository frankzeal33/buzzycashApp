import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import EditProfileBox from '@/components/EditProfileBox'
import { MaterialIcons } from '@expo/vector-icons'
// import DatePicker from 'react-native-date-picker'
// import RNPickerSelect from 'react-native-picker-select';
import { data } from '@/constants'
import GradientButton from '@/components/GradientButton'
import { useThemeStore } from '@/store/ThemeStore'

const EditProfileScreen = () => {

  const { theme } = useThemeStore();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [hasPickedDate, setHasPickedDate] = useState(false);
  const [selectedGender, setSelectedGender] = useState();

  const [form, setForm] = useState({
    fullname: "ojiego franklin",
    username: "frankzeal",
    date_of_birth: "16-06-1994",
    gender: "male"
  })

  const submit = async () => {
    router.replace("/(protected)/(routes)/Profile")
  }

  return (
    <SafeAreaView className='h-full flex-1 bg-gray-100 px-4'>
      <Header icon onpress={() => router.back()}/>
      <View className='flex-1 w-full items-center justify-center'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            <View className='w-full gap-4 py-10'>
              <Text className="text-xl text-blue font-msbold mb-5 text-center">Edit Profile</Text>
              <EditProfileBox title='Full Name' placeholder="Enter fullname here" value={form.fullname}/>
              <EditProfileBox title='Username' placeholder="Enter username here" value={form.username}/>
              <EditProfileBox title='Date of Birth' placeholder="Enter date of birth here" value={form.date_of_birth}/>
              <EditProfileBox title='Gender' placeholder="Enter gender here" value={form.gender}/>

              {/* <View className='mt-7'>
                  <Text className='text-base font-rbold pb-2 text-green'>Date of Birth</Text>
                  <TouchableOpacity className='w-full flex-row gap-2 bg-inputBg p-4 items-center justify-between h-[52px] rounded-md'  onPress={() => setOpen(true)}>
                      <Text className={`${hasPickedDate ? 'text-black' : 'text-[#ccc]'}`}>{hasPickedDate ? date.toISOString().split('T')[0] : 'Select Date'}</Text>
                      <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />
                  </TouchableOpacity>
              </View>

              <View className='mt-7'>
                  <Text className='text-base font-rbold pb-2 text-green'>Gender</Text>
                  <RNPickerSelect
                      onValueChange={(value) => setSelectedGender(value)}
                      items={data.gender}
                      value={selectedGender}
                      placeholder={{ label: 'Select gender', value: null }}
                      style={pickerSelectStyles}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => {   
                          return <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />;
                      }}
                  />
              </View> */}

              <View className='w-full justify-center items-center my-7'>
                <GradientButton title="Save Changes" handlePress={submit} containerStyles="w-[80%]" textStyles='text-white'/>
              </View>

            </View>

          </ScrollView>
        </KeyboardAvoidingView>

        {/* <DatePicker
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
        /> */}

      </View>
    </SafeAreaView>
  )
}

export default EditProfileScreen


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F3F3F3',
    height: 52,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F3F3F3',
    height: 52
  },
  iconContainer: {
    top: 10,
    right: 10,
  }
  });