import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import GradientButton from '@/components/GradientButton'
import { StatusBar } from 'expo-status-bar'
import { Entypo } from '@expo/vector-icons'

const FundWalletScreen = () => {
    
    const { bottom } = useSafeAreaInsets()
    const [showModal, setShowModal] = useState(false)
    const [gateway, setGateway] = useState("")

    const handleGateway = (gateway: string) => {
        setGateway(gateway)
        setShowModal(false)
    }

    const pay = () => {
        router.push("/(protected)/(routes)/FundPaymentGateway")
    }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 bg-gray-100 px-4'>
        <Header title='Fund Wallet' icon onpress={() => router.back()}/>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View className='bg-white rounded-xl w-full p-6 mt-4 gap-5' style={{marginBottom: bottom + 16}}>
                    <View>
                        <Text className='text-lg text-lightBlack font-msbold'>Amount</Text>
                        <FormField placeholder="Enter Amount" otherStyles="mt-1" keyboardType="number-pad" labelStyle='text-white'/>
                    </View>
                    <View>
                        <Text className='text-lg text-lightBlack font-msbold'>Select Gateway</Text>
                        <Pressable onPress={() => setShowModal(true)} className={`bg-gray-200 w-full h-16 px-4 rounded-md items-center justify-between flex-row gap-1`}>
                            <Text className='text-lg text-gray-500 font-mmedium'>{gateway ? gateway : "Payment gateway"}</Text>
                            <Entypo name='chevron-small-down' size={30} color="#979797" />
                        </Pressable>
                    </View>
                    <GradientButton
                        title="Checkout"
                        handlePress={pay}
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
                <View className="bg-white rounded-2xl max-h-[60%] px-4 w-full">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='my-7 gap-2'>
                        <TouchableOpacity onPress={() => handleGateway("paystack")} className='flex-row gap-2 w-full items-center py-4 border-b-2 border-gray-100'>
                            <Text className='font-msbold text-xl'>PayStack</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleGateway("flutterwave")} className='flex-row gap-2 w-full items-center py-4'>
                            <Text className='font-msbold text-xl'>FlutterWave</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>
            </View>
        </Modal>

        <StatusBar style="dark" backgroundColor=" #E9E9E9" />
    </SafeAreaView>
  )
}

export default FundWalletScreen