import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import GradientButton from '@/components/GradientButton'
import { StatusBar } from 'expo-status-bar'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import DisablePartInput from '@/components/DisablePartInput'
import { useThemeStore } from '@/store/ThemeStore'

const KycScreen = () => {
    
    const { theme } = useThemeStore();
    const [isFocused, setIsFocused] = useState(false);
    const { bottom } = useSafeAreaInsets()
    const [showModal, setShowModal] = useState(false)
    const [gateway, setGateway] = useState("")

    const handleCountry = (gateway: string) => {
        setGateway(gateway)
        setShowModal(false)
    }

    const submit = () => {

    }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 px-4' style={{ backgroundColor: theme.colors.background}}>
        <Header title='KYC Update' icon onpress={() => router.back()}/>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View className='rounded-xl w-full p-6 mt-4 gap-5' style={{marginBottom: bottom + 16, backgroundColor: theme.colors.darkGray}}>
                    <View>
                        <Text className='font-msbold' style={{color: theme.colors.text}}>Select issuing country</Text>
                        <Pressable onPress={() => setShowModal(true)} className={`w-full h-16 px-4 rounded-md items-center justify-between flex-row gap-1`} style={{ backgroundColor: theme.colors.inputBg}}>
                            <View className='flex-1'>
                                <Text className='text-lg text-gray-500 font-mmedium' numberOfLines={1}>{gateway ? gateway : "Country"}</Text>
                            </View>
                            <Entypo name='chevron-small-down' size={30} color="#979797" />
                        </Pressable>
                    </View>
                    <View>
                        <Text className='font-msbold' style={{color: theme.colors.text}}>Enter your National Identification Number(NIN)</Text>
                        <FormField placeholder="National Identification Number" keyboardType={"number-pad"}/>
                    </View>
                    <View className='w-full flex-row gap-1'>
                        <FontAwesome5 name="info-circle" size={16} color="#8bb7f0" />
                        <Text className="font-mmedium text-sm flex-1 -mt-1" style={{color: theme.colors.text}}>Please note that the National Identification Number is the number on your National ID card that is issued to you by your  country for means of identification.</Text>
                    </View>
                    <GradientButton
                        title="Submit"
                        handlePress={submit}
                        containerStyles="w-[70%] mx-auto mt-2"
                        textStyles="text-white"
                    />
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
                <View className="rounded-2xl max-h-[60%] px-4 w-full" style={{ backgroundColor: theme.colors.darkGray}}>
                    <View className='my-7 gap-2'>
                        <TouchableOpacity onPress={() => handleCountry("ghana")} className='flex-row gap-2 w-full items-center py-4 border-b-2' style={{ borderColor: theme.colors.background}}>
                            <Text className='font-msbold text-xl' style={{color: theme.colors.text}}>Ghana</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCountry("nigeria")} className='flex-row gap-2 w-full items-center py-4'>
                            <Text className='font-msbold text-xl' style={{color: theme.colors.text}}>Nigeria</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

       <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default KycScreen