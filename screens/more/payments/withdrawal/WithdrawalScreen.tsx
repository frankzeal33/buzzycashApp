import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import GradientButton from '@/components/GradientButton'
import { StatusBar } from 'expo-status-bar'
import { Entypo } from '@expo/vector-icons'
import DisablePartInput from '@/components/DisablePartInput'
import { useThemeStore } from '@/store/ThemeStore'

const WithdrawalScreen = () => {
    
    const { theme } = useThemeStore();
    const [isFocused, setIsFocused] = useState(false);
    const { bottom } = useSafeAreaInsets()
    const [showModal, setShowModal] = useState(false)
    const [gateway, setGateway] = useState("")

    const handleGateway = (gateway: string) => {
        setGateway(gateway)
        setShowModal(false)
    }

    const withdraw = () => {
        
    }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 px-4' style={{backgroundColor: theme.colors.background}}>
        <Header title='Withdraw Funds' icon onpress={() => router.back()}/>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View className='rounded-xl w-full p-6 mt-4 gap-5' style={{backgroundColor: theme.colors.darkGray, marginBottom: bottom + 16}}>
                    <View>
                        <Text className='text-lg font-msbold' style={{color: theme.colors.text}}>Amount</Text>
                        <DisablePartInput disabledValue={"NGN"} placeholder="Enter Amount"/>
                    </View>
                    <View>
                        <Text className='text-lg font-msbold' style={{color: theme.colors.text}}>Select Withdrawal Method</Text>
                        <Pressable onPress={() => setShowModal(true)} className={`w-full h-16 px-4 rounded-md items-center justify-between flex-row gap-1`} style={{ backgroundColor: theme.colors.inputBg}}>
                            <View className='flex-1'>
                                <Text className='text-lg text-gray-500 font-mmedium' numberOfLines={1}>{gateway ? gateway : "Withdrawal Method"}</Text>
                            </View>
                            <Entypo name='chevron-small-down' size={30} color="#979797" />
                        </Pressable>
                    </View>
                    <GradientButton
                        title="Withdraw"
                        handlePress={withdraw}
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
                <View className="rounded-2xl max-h-[60%] px-4 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                    <View className='my-7 gap-2'>
                        <TouchableOpacity onPress={() => handleGateway("bank")} className='flex-row gap-2 w-full items-center py-4 border-b-2 border-gray-100'>
                            <Text className='font-msbold text-xl' style={{color: theme.colors.text}}>Bank</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleGateway("wallet")} className='flex-row gap-2 w-full items-center py-4'>
                            <Text className='font-msbold text-xl' style={{color: theme.colors.text}}>Wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default WithdrawalScreen 