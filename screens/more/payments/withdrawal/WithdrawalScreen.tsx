import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import GradientButton from '@/components/GradientButton'
import { StatusBar } from 'expo-status-bar'
import DisablePartInput from '@/components/DisablePartInput'
import { useThemeStore } from '@/store/ThemeStore'
import NgnBankModal from '@/components/NgnBankModal'
import FormField from '@/components/FormField'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'
import z from 'zod'
import { useProfileStore } from '@/store/ProfileStore'
import PopupModal from '@/components/PopupModal'
import FullScreenLoader from '@/components/FullScreenLoader'
import getWallet from '@/utils/WalletApi'

type nameType = {
  name: string;
  number: string;
  status: boolean
}

const registerSchema = z
.object({
  amount: z
    .string()
    .min(1, "amount is required"),
  bankName: z
    .string()
    .min(1, "bank Name is required"),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .max(10,"Account number is greater than 10 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),
  fetchedAccountName: z
    .string()
    .min(1, "input valid account no. to verify"),
  fetchedAccountNumber: z
    .string()
    .min(1, "input valid account no. to verify")
})

const WithdrawalScreen = () => {
    
    const { theme } = useThemeStore();
    const { userProfile } = useProfileStore()
    const { bottom } = useSafeAreaInsets()
    const [showModal, setShowModal] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGettingName, setIsGettingName] = useState(false)
    const [accountName, setAccountName] = useState<nameType | null>(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    
    const [amount, setAmount] = useState("")
    const [form, setForm] = useState({
        recipientBankName: "",
        recipientAccountNumber: "",
        recipientBankCode: ""
    })

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    const handlePress = (bank: {code: string; logo: string; name: string}) => {
        setForm({ ...form, recipientBankName: bank?.name, recipientBankCode: bank?.code, recipientAccountNumber: "" })
        setShowModal(!showModal)
        setAccountName(null)   
    }

    const closeModal = () => {
        setShowModal(false) 
    }

    useEffect(() => {
      if(form.recipientAccountNumber.length === 10){

        getAccountName()
      }
    }, [form.recipientAccountNumber]);

    const getAccountName = async () => {

      if(!form.recipientBankName){
        return Toast.show({
            type: 'info',
            text1: "Select Bank Name",
            text2: "Please choose a bank",
        });
      }

      setIsGettingName(true)
      try{
        const result = await axiosClient.post(`/withdrawal/account-details`, {
          account_number: form.recipientAccountNumber,
          bank_code: form.recipientBankCode
        })

        setAccountName({
          name: result.data?.data?.accountName || "",
          number: result.data?.data?.accountNumber || "",
          status: true
        })

        console.log("account",result.data)

      } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: error.response.data.message
        });

        setAccountName({
          name: "",
          number: "",
          status: false
        })

      } finally {
        setIsGettingName(false)
      } 
    }

    const withdraw = async () => {

        const newForm= {
            amount: amount,
            bankName: form.recipientBankName,
            accountNumber: form.recipientAccountNumber,
            fetchedAccountName: accountName?.name,
            fetchedAccountNumber: accountName?.number
        }

        const result = registerSchema.safeParse(newForm)

        if (!result.success) {
            const firstIssue = result.error.issues[0];
    
            return Toast.show({
                type: 'info',
                text1: firstIssue.message,
                text2: "Please check your inputs.",
            });
        }

        setIsSubmitting(true)

        const data = {
            account_name: accountName?.name,
            account_number: accountName?.number,
            amount: Number(amount),
            bank_code: form.recipientBankCode,
            currency: userProfile.countryOfResidence === "nigeria" ? "NGN" : "GHS"
        }

    try{
        const result = await axiosClient.post("/withdrawal/initiate-withdrawal", data)

        // Toast.show({
        //     type: "success",
        //     text1: result.data.message
        // });
        console.log("msg", result.data)

      setShowSuccessModal(true)

      setAccountName(null)
      setForm({
        recipientBankName: "",
        recipientAccountNumber: "",
        recipientBankCode: ""
      })

      getWallet(true)

    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: error.response.data.message
        });

    } finally {
      setIsSubmitting(false)
    } 

  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    router.replace("/(protected)/(routes)/Transactions")
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 px-4' style={{backgroundColor: theme.colors.background}}>
        <Header title='Withdraw Funds' icon onpress={() => router.back()}/>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center'}}>
                <View className='rounded-xl w-full p-6 mt-4 gap-5' style={{backgroundColor: theme.colors.darkGray, marginBottom: bottom + 16}}>
                    <View>
                        <Text className='text-lg font-msbold' style={{color: theme.colors.text}}>Amount</Text>
                        <DisablePartInput disabledValue={"NGN"} placeholder="Enter Amount" handleChangeText={(e) => setAmount(e)} value={amount}/>
                    </View>
                    <NgnBankModal placeholder='Select Bank' selectedValue={form.recipientBankName} header="Select Bank" title='Select Bank' showModal={showModal} close={closeModal} handlePress={handlePress} handleShowModal={() => handleShowModal()} />
                    <View>
                        <Text className='text-lg font-msbold' style={{color: theme.colors.text}}>Account Number</Text>
                        <FormField title='Account Number' value={form.recipientAccountNumber} placeholder="Account No." handleChangeText={(e: any) => {setForm({ ...form, recipientAccountNumber: e }); setAccountName(null)}} keyboardType='number-pad' maxLength={10}/>
                    </View>
                    {isGettingName ? (
                        <View className={`bg-green-50 w-full min-h-14 px-4 py-2 rounded-md items-center flex-row gap-2`}>
                            <ActivityIndicator size={"small"} color={"#15803d"}/>
                            <Text className="text-base text-green-700 font-abold flex-1">Verifying account details</Text>
                        </View>
                    ) : (accountName?.name && accountName?.number) && accountName?.status === true ? (
                        <View className='gap-4'>
                            <View className={`bg-green-50 w-full min-h-14 px-4 py-2 rounded-md items-center flex-row gap-2`}>
                                <MaterialIcons name="verified-user" size={22} color="#15803d" />
                                <Text className="text-lg text-green-700 font-abold uppercase flex-1">{accountName?.name}</Text>
                            </View>
                        </View>
                    ) : (!accountName?.name || !accountName?.number) && accountName?.status === false ? (
                        <View className={`bg-red-50 w-full min-h-14 px-4 py-2 rounded-md items-center flex-row gap-2`}>
                        <AntDesign name="closecircle" size={20} color="#b91c1c" />
                        <Text className="text-base text-red-700 font-abold flex-1">Account verification failed. Please check the details or try again later.</Text>
                        </View>
                    ) : ''}
                    <GradientButton
                        title="Withdraw"
                        disableButton={!accountName?.name}
                        handlePress={withdraw}
                        containerStyles="w-[70%] mx-auto mt-2"
                        textStyles="text-white"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

        <PopupModal visible={showSuccessModal} title='Your account details have been submitted' onClose={closeSuccessModal}>
            <View className='flex-start w-full my-3'>
                <Text className="font-abold text-center" style={{color: theme.colors.text}}>You will recieve an alert within 5 Minutes</Text>
            </View>
            <View className='mt-4 flex-row gap-4 items-center'>
                <GradientButton
                    title="OK"
                    handlePress={closeSuccessModal}
                    containerStyles="w-24 mx-auto mt-2"
                    textStyles="text-white"
                />
            </View>
        </PopupModal>

        <FullScreenLoader visible={isSubmitting} />
        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default WithdrawalScreen 