import { View, Text } from 'react-native'
import IconButton from '../IconButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';
import { Entypo } from '@expo/vector-icons';

export default function LandingBalanceCard() {

  const { theme } = useThemeStore();

  return (
    <>
      <View className='w-full rounded-xl mb-3 p-4' style={{ backgroundColor: theme.colors.darkGray, borderWidth: theme.dark ? 1 : 0, borderColor: theme.dark ? theme.colors.inputBg : undefined,}}>
        <Text className="font-mmedium" style={{ color: theme.colors.text}}>AVAILABLE BALANCE</Text>
        <View className='flex-row items-center justify-between mt-1'>
          <View>
            <Text className="font-ablack text-2xl" style={{ color: theme.colors.text}}>*****</Text>
          </View>
        </View>
        <View className='flex-row items-center justify-between gap-2 w-full'>
          <IconButton title='LOG IN' handlePress={() => router.push("/(onboarding)/LogIn")} textStyles='text-white' icon={<Entypo name="login" size={12} color="white" />} containerStyles='bg-brown-500 w-[38%] px-2'/>
          <IconButton title='REGISTER' handlePress={() => router.push("/(onboarding)/Register")} textStyles='text-white' icon={<MaterialCommunityIcons name="text-box-plus" size={16} color="white" />} containerStyles='bg-blue w-[58%] px-2' border/>
        </View>
      </View>
    </>
  )
}