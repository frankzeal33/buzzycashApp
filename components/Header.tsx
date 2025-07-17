import { View, Text, TouchableOpacity, Pressable, Modal, TouchableWithoutFeedback } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/ThemeStore';

type headerProps = {
  title?: string;
  titleColor?: string;
  icon?: boolean;
  action?: string;
  onpress?: () => void
}

export default function Header({title, titleColor, action, icon = false, onpress}: headerProps) {

  const { theme } = useThemeStore();

  return (
    <>
      <View className='py-2'>
        <View className='flex-row items-center justify-between gap-2'>
          {action ? (
            <Pressable onPress={() => router.push("/(protected)/(routes)/EditProfile")}>
              <Text className="text-lg font-msbold" style={{ color: theme.colors.text}}>{action}</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => router.push("/(protected)/(routes)/Profile")} className='rounded-full items-center justify-center border border-orange size-9'>
              <Text className='text-orange font-mbold text-base'>OD</Text>
            </Pressable>
          )}
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
          <Text className={`text-xl font-msbold mt-1 text-center`} style={{ color: theme.colors.text}}>{title}</Text>
        )}
      </View>
     
    </>
  )
}