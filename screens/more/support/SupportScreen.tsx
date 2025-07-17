import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Entypo, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import ProfileBox from '@/components/ProfileBox'
import { images } from '@/constants'
import SupportBox from '@/components/SupportBox'
import { useThemeStore } from '@/store/ThemeStore'
import { StatusBar } from 'expo-status-bar'

const SupportScreen = () => {

  const { theme } = useThemeStore();

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{backgroundColor: theme.colors.background}}>
      <Header title='Help and Support' icon onpress={() => router.back()}/>
      <View className='flex-1 w-full'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='mt-8 gap-4'>
            <SupportBox image={images.faq} label='FAQ'/>
            <SupportBox image={images.tip} label='Helpful Tips'/>
          </View>
          <Text className='text-xl font-msbold mt-8 mb-4' style={{color: theme.colors.text}}>Contact Us</Text>
          <View className='gap-4'>
            <SupportBox image={images.phone} label='Phone' value='+234 9128384948'/>
            <SupportBox image={images.mail} label='Email' value='frankzeal33@gmail.com'/>
          </View>
          <Text className='text-xl font-msbold mt-8 mb-4' style={{color: theme.colors.text}}>Follow Us On</Text>
          <View className='w-full flex-row items-center gap-4'>
            <TouchableOpacity>
              <FontAwesome5 name="facebook" size={40} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome6 name="square-instagram" size={40} color="#E1306C" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome6 name="square-x-twitter" size={40} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="linkedin-square" size={40} color="#0077B5" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name="tiktok" size={35} color={theme.colors.text} />
            </TouchableOpacity>

          </View> 
        </ScrollView>
      </View>
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default SupportScreen