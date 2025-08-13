import { View, Text, TouchableOpacity, Pressable, Modal, TouchableWithoutFeedback } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';
import { useProfileStore } from '@/store/ProfileStore';

type headerProps = {
  title?: string;
  titleColor?: string;
  icon?: boolean;
  action?: string;
  home?: boolean;
  profile?: boolean;
  onpress?: () => void
}

export default function Header({title, titleColor, home, profile, action, icon = false, onpress}: headerProps) {

  const { theme } = useThemeStore();
  const userProfile = useProfileStore(state => state.userProfile)

  const initials = userProfile.fullName.trim()
  .split(/\s+/) // split into words
  .filter(Boolean) // remove empty items
  .slice(0, 2)  // take max two words
  .map(word => word.charAt(0).toUpperCase()) // get first letter
  .join("")
  .padEnd(2, userProfile.fullName.charAt(1)?.toUpperCase() || ""); // if only one letter, add 2nd char from first word

  return (
    <>
      <View className='py-2'>
        <View className='flex-row items-center justify-between gap-2'>
          {action ? (
            <Pressable onPress={() => router.push("/(protected)/(routes)/EditProfile")}>
              <Text className="text-lg font-msbold" style={{ color: theme.colors.text}}>{action}</Text>
            </Pressable>
          ) : home ? (
            <Pressable onPress={() => router.replace("/(protected)/(routes)/Home")}>
              <AntDesign name="home" size={28} color="#EF9439" />
            </Pressable>
          ) : profile ? (
            <Pressable onPress={() => router.push("/(protected)/(routes)/Profile")} className='rounded-full items-center justify-center border border-brown-500 size-9'>
              <Text className='text-brown-500 font-mbold text-base'>{initials}</Text>
            </Pressable>
          ) : (
            <View className='w-7'/>
          )}
          {icon ? (
            <TouchableOpacity onPress={onpress}><AntDesign name="arrowleft" size={28} color="#EF9439"/></TouchableOpacity>
          ) : (
            <Pressable onPress={() => router.push("/(protected)/(routes)/Notifications")} className="relative rounded-full border border-brown-500 size-9 items-center justify-center">
              <EvilIcons name="bell" size={20} color="#EF9439"/>
              <View className="absolute -top-1 -right-1 bg-brown-500 rounded-full min-w-[14px] h-[14px] items-center justify-center px-[4px]">
                <Text className="text-white text-[8px] font-mbold">3</Text>
              </View>
            </Pressable>
          )}
        </View>

        {title && (
          <Text className={`text-xl font-msbold mt-1 text-center`} style={{ color: titleColor ? titleColor : theme.colors.text}}>{title}</Text>
        )}
      </View>
     
    </>
  )
}