import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';
import { useProfileStore } from '@/store/ProfileStore';
import { formatCount } from '@/utils/formatCount';

type headerProps = {
  title?: string;
  titleColor?: string;
  icon?: boolean;
  action?: string;
  home?: boolean;
  profile?: boolean;
  notificationCount?: number;
  onpress?: () => void
}

export default function LandingHeader({title, titleColor, home, profile, action, notificationCount = 0, icon = false, onpress}: headerProps) {

  const { theme } = useThemeStore();
  const goToNotification =  () => {
    router.push("/(onboarding)/LogIn")
  }

  return (
    <>
      <View className='py-2'>
        <View className='flex-row items-center justify-between gap-2'>
          <View className='flex-row gap-2 items-center'>
            <Text className='font-msbold text-xl' style={{ color: theme.colors.text }}>Hi</Text>
            <Pressable onPress={() => router.push("/(onboarding)/Register")} className='rounded-full px-3 py-0.5 border border-brown-500 '>
              <Text className="text-base font-msbold text-brown-500">Register</Text>
            </Pressable>
          </View>
          <Pressable onPress={goToNotification} className="relative rounded-full border border-brown-500 size-9 items-center justify-center">
            <EvilIcons name="bell" size={20} color="#EF9439"/>
            {!!notificationCount && (
              <View className="absolute -top-1 -right-1 bg-brown-500 rounded-full min-w-[14px] h-[14px] items-center justify-center px-[4px]">
                <Text className="text-white text-[8px] font-mbold">{formatCount(notificationCount)}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
     
    </>
  )
}