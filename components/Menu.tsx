import { View, Text, StyleSheet, Pressable, Modal, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, useWindowDimensions } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { data, images } from '@/constants';
import MenuBalanceCard from './MenuBalanceCard';
import Constants from 'expo-constants';
import SelectDropdown from 'react-native-select-dropdown';
import { useThemeStore } from '@/store/ThemeStore';

const Menu = () => {

  const { setPreference, theme, preference } = useThemeStore();
  const { bottom, top } = useSafeAreaInsets()
  const Bottom = bottom + 25;
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState("")

  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system' | null>(preference);

  useEffect(() => {
    setSelectedTheme(preference);
  }, [preference]);

  const screen = useWindowDimensions();
  const maxHeight = screen.height - (top + 10) - (bottom + 30)
  console.log("height", maxHeight)

  const goTo = (route: any) => {
    router.push(route);
    setShowModal(false);
  }

  return (
    <>
      {/* Floating Menu Button */}
      <View style={[styles.menu, { bottom: bottom + 5, backgroundColor: theme.colors.background }]} className='p-1 rounded-full'>
        <TouchableOpacity onPress={() => setShowModal(!showModal)} className="h-12 w-20 rounded-full items-center justify-center" style={{ backgroundColor: theme.colors.menuIcon}}>
          <Entypo name="menu" size={35} color="#EF4734" />
        </TouchableOpacity>
      </View>

      {/* Bottom Gradient */}
      <LinearGradient
        colors={['#FFAE4D', '#EF4734', '#EF4734']}
        style={[styles.container, { height: Bottom }]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <Modal
        transparent={true}
        animationType='slide'
        visible={showModal}
        statusBarTranslucent={true}
        onRequestClose={() => setShowModal(false)}>
          <View className="flex-1 items-center px-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            {/* TouchableWithoutFeedback only around the background */}
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View className="absolute top-0 left-0 right-0 bottom-0" />
            </TouchableWithoutFeedback>

            {/* Actual modal content */}
            <View className="rounded-2xl overflow-hidden w-full" style={{ backgroundColor: theme.colors.background, marginTop: top + 10, marginBottom: bottom + 10, maxHeight: maxHeight}}>
              <View className='items-center justify-center p-4'>
                <View className='size-[50px] rounded-full border border-gray-200 z-10'>
                    <Image source={images.user} width={50} height={50} resizeMode='cover' className='w-full h-full overflow-hidden'/>
                </View>
                <View className='pb-2'>
                    <Text className="font-mbold text-xl text-center pt-2 text-orange" numberOfLines={1}>Selvin Kendrick</Text>
                    <Text className="font-msbold text-lg text-center pt-1" numberOfLines={1} style={{ color: theme.colors.text}}>@Ken-Drick</Text>
                </View>
              </View>
              <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                <MenuBalanceCard showModal={showModal} setShowModal={setShowModal}/>
                <View className='mt-3 rounded-xl' style={{backgroundColor: theme.colors.darkGray}}>
                    <View className='mt-2 mb-2'>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/Profile")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <FontAwesome5 name="user" size={25} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Profile</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/Tickets")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <Ionicons name="ticket-outline" size={25} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Ticket History</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/GameHistory")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <AntDesign name="book" size={26} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Game History</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/Transactions")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <Ionicons name="cash-outline" size={26} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Transaction History</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/Notifications")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <FontAwesome name="bell-o" size={25} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Notification</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/kyc")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <AntDesign name="idcard" size={25} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>KYC Update</Text>
                          </View>
                        </Pressable>
                        <SelectDropdown
                          data={data.Theme}
                          onSelect={(selectedItem, index) => {
                            setPreference(selectedItem.value);
                          }}
                          renderButton={(selectedItem, isOpened) => {
                            return (
                              <Pressable className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                                <View className="w-full flex-row items-center gap-3 px-4 py-3">
                                  <MaterialCommunityIcons name="theme-light-dark" size={27} color="#EF9439" />
                                  <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Theme</Text>
                                </View>
                              </Pressable>
                            );
                          }}
                          renderItem={(item, index) => {
                            const isSelected = selectedTheme === item.value;

                            return (
                              <View key={index} className='flex-row gap-2 items-center px-4 py-2'>
                                <View className='size-6 items-center justify-center border-2 border-brown-500 rounded-full'>
                                  <View className={`size-4 rounded-full ${isSelected ? 'bg-brown-500' : ''}`} />
                                </View>
                                <Text className="font-mmedium text-lg flex-1" style={{color: theme.colors.text}}>{item.title}</Text>
                              </View>
                            );
                          }}
                          showsVerticalScrollIndicator={false}
                          dropdownStyle={{
                            backgroundColor: theme.colors.darkGray,
                            borderRadius: 8,
                            maxWidth: 200
                          }}
                        />
                        <Pressable onPress={() => goTo("/(protected)/(routes)/Referral")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <AntDesign name="addusergroup" size={27} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>My Referral</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/Security2FA")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <MaterialCommunityIcons name="cellphone-lock" size={26} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>2FA Security</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/Support")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <MaterialIcons name="support-agent" size={26} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Support Chat</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(protected)/(routes)/ChangePassword")} className='border-b-2 w-full' style={{borderColor: theme.colors.background}}>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <FontAwesome name="key" size={25} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Change Password</Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => goTo("/(onboarding)/LogIn")} className='w-full'>
                          <View className="w-full flex-row items-center gap-3 px-4 py-3">
                            <AntDesign name="logout" size={24} color="#EF9439" />
                            <Text className="font-mmedium text-lg" style={{color: theme.colors.text}}>Logout</Text>
                          </View>
                        </Pressable>
                    </View>
                </View>
                <Text className="text-base text-gray-500 font-mmedium mx-4 mt-2">V {Constants.expoConfig?.version ?? '1.0.0'}</Text>
              </ScrollView>
            </View>
          </View>
      </Modal>
    </>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    zIndex: 1,
    paddingTop: 20,
  },
  menu: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -40 }],
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButtonStyle2: {
    width: "100%",
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: '#979797',
    fontFamily: "Montserrat-Medium",
  },
  dropdownButtonArrowStyle: {
    fontSize: 30,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
})