import BalanceCard from '@/components/BalanceCard'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Constants from 'expo-constants';

export default function MoreScreen() {
 
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='flex-1 bg-gray-100 px-4'>
        <Header icon onpress={() => router.back()}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BalanceCard />
          <View className='mt-2 mb-4'>
            <Pressable onPress={() => router.push("/(protected)/(routes)/Profile")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <FontAwesome5 name="user" size={25} color="#EF9439" />
                <Text className="font-mmedium text-xl">Profile</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(protected)/(tabs)/tickets")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <Ionicons name="ticket-outline" size={27} color="#EF9439" />
                <Text className="font-mmedium text-xl">Ticket History</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(protected)/(routes)/GameHistory")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <AntDesign name="book" size={26} color="#EF9439" />
                <Text className="font-mmedium text-xl">Game History</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(protected)/(tabs)/transactions")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <Ionicons name="cash-outline" size={26} color="#EF9439" />
                <Text className="font-mmedium text-xl">Transaction History</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(protected)/(routes)/Referral")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <AntDesign name="addusergroup" size={27} color="#EF9439" />
                <Text className="font-mmedium text-xl">My Referral</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(protected)/(routes)/Security2FA")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <MaterialCommunityIcons name="cellphone-lock" size={26} color="#EF9439" />
                <Text className="font-mmedium text-xl">2FA Security</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(protected)/(routes)/Notifications")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <FontAwesome name="bell-o" size={25} color="#EF9439" />
                <Text className="font-mmedium text-xl">Notification</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(protected)/(routes)/Support")} className='border-b-2 w-full border-gray-100 bg-white'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <MaterialIcons name="support-agent" size={26} color="#EF9439" />
                <Text className="font-mmedium text-xl">Support Chat</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push("/(onboarding)/LogIn")} className='border-b-2 w-full border-gray-100 bg-white mt-10'>
              <View className="w-full flex-row items-center gap-3 p-4">
                <AntDesign name="logout" size={26} color="#EF9439" />
                <Text className="font-mmedium text-xl">Logout</Text>
              </View>
            </Pressable>
            <Text className="text-lg text-gray-500 font-mmedium mt-2">V {Constants.expoConfig?.version ?? '1.0.0'}</Text>
          </View>
        </ScrollView>
      <StatusBar style="dark" backgroundColor=" #E9E9E9" />
    </SafeAreaView>
  )
}