import { View, Text, TouchableOpacity, Pressable, Modal, TouchableWithoutFeedback } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

type headerProps = {
    title?: string;
    icon?: boolean;
    onpress?: () => void
}

export default function Header({title, icon = false, onpress}: headerProps) {

  const [showModal, setShowModal] = useState(false)
  const { top } = useSafeAreaInsets()

  return (
    <>
      <View className='py-2'>
        <View className='flex-row items-center justify-between gap-2'>
          <Pressable onPress={() => setShowModal(!showModal)} className='rounded-full items-center justify-center border border-orange size-9'>
            <Text className='text-orange font-mbold text-base'>OD</Text>
          </Pressable>
          {icon ? (
            <TouchableOpacity onPress={onpress}><AntDesign name="arrowleft" size={28} color="#EF4734"/></TouchableOpacity>
          ) : (
            <Pressable onPress={() => router.push("/(protected)/(routes)/Notifications")} className="relative rounded-full border border-orange size-9 items-center justify-center">
              <EvilIcons name="bell" size={20} color="#EF4734"/>
              <View className="absolute -top-1 -right-1 bg-orange rounded-full min-w-[14px] h-[14px] items-center justify-center px-[4px]">
                <Text className="text-white text-[8px] font-mbold">3</Text>
              </View>
            </Pressable>
          )}
        </View>

        {title && (
          <Text className="text-xl text-blue font-msbold mt-1 text-center">{title}</Text>
        )}
      </View>
      
      <Modal
        transparent={true}
        visible={showModal}
        statusBarTranslucent={true}
        onRequestClose={() => setShowModal(false)}>
          <View className="flex-1 items-center px-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            {/* TouchableWithoutFeedback only around the background */}
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View className="absolute top-0 left-0 right-0 bottom-0" />
            </TouchableWithoutFeedback>

            {/* Actual modal content */}
            <View className="bg-white rounded-2xl p-4 w-full" style={{marginTop: top + 10}}>
              <View>
                <Text className="font-mbold text-2xl px-5 pt-2 text-orange" numberOfLines={1}>Selvin Kendrick</Text>
                <Text className="font-msbold text-xl px-5 pt-1 pb-6" numberOfLines={1}>Ken-Drick</Text>
              </View>
              <Pressable onPress={() => {
                setShowModal(false);
                router.push("/(onboarding)/LogIn");
              }} className='w-full'>
                <View className="w-full flex-row items-center gap-3 p-5">
                  <FontAwesome5 name="user" size={25} color="#EF9439" />
                  <Text className="font-mmedium text-xl">Profile</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => {
                setShowModal(false);
                router.push("/(onboarding)/LogIn");
              }} className='w-full'>
                <View className="w-full flex-row items-center gap-3 p-5">
                  <FontAwesome name="key" size={25} color="#EF9439" />
                  <Text className="font-mmedium text-xl">Change Password</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => {
                setShowModal(false);
                router.push("/(onboarding)/LogIn");
              }} className='w-full'>
                <View className="w-full flex-row items-center gap-3 p-5">
                  <AntDesign name="logout" size={26} color="#EF9439" />
                  <Text className="font-mmedium text-xl">Logout</Text>
                </View>
              </Pressable>
            </View>
          </View>
      </Modal>
    </>
  )
}