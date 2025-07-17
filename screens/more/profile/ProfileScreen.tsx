import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { images } from '@/constants'
import { AntDesign, Entypo } from '@expo/vector-icons'
import ProfileBox from '@/components/ProfileBox'
import { useThemeStore } from '@/store/ThemeStore'
import { StatusBar } from 'expo-status-bar'

const ProfileScreen = () => {

  const { theme } = useThemeStore();

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{ backgroundColor: theme.colors.background}}>
      <Header action='Edit' title='Profile' icon onpress={() => router.back()}/>
      <View className='flex-1 w-full'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=' mt-4 mb-8'>
            <View className='size-[70px] relative rounded-full border border-gray-200 z-10 mx-auto'>
              <Image source={images.user} width={70} height={70} resizeMode='cover' className='w-full h-full overflow-hidden'/>
              <TouchableOpacity className='absolute -right-2 bottom-0'>
                <View className={`flex items-center justify-center size-8 rounded-full bg-white`}>
                  <Entypo name="camera" size={14} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          <View className='gap-4 pb-14'>
            <ProfileBox label='Full Name' value='Ojiego Franklin'/>
            <ProfileBox label='Username' value='frankzeal'/>
            <ProfileBox label='Email' value='frankzeal93@gmail.com'/>
            <ProfileBox label='Date of Birth' value='17-09-1992'/>
            <ProfileBox label='Gender' value='male'/>
            <ProfileBox label='Phone Number' value='08178740826'/>
          </View>
        </ScrollView>
      </View>

      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default ProfileScreen