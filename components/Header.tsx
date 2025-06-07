import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons';

type headerProps = {
    title?: string;
    icon?: any;
    onpress?: () => void
}

export default function Header({title, icon, onpress}: headerProps) {
  return (
    <View className='py-2'>
        <View className='flex-row items-center justify-between gap-2'>
          <View className='rounded-full items-center justify-center border border-orange size-9'>
            <Text className='text-orange font-mbold text-base'>OD</Text>
          </View>
          {icon ? (
            <TouchableOpacity onPress={onpress}><AntDesign name="leftcircle" size={30} color="#C3C3C3"/></TouchableOpacity>
          ) : (
            <Pressable className="relative rounded-full border border-orange size-9 items-center justify-center">
              <EvilIcons name="bell" size={20} color="#EF4734"/>
              <View className="absolute -top-1 -right-1 bg-orange rounded-full min-w-[14px] h-[14px] items-center justify-center px-[4px]">
                <Text className="text-white text-[8px] font-mbold">3</Text>
              </View>
            </Pressable>
          )}
        </View>

        {title && (
          <Text className="text-2xl text-blue font-msbold mt-2 text-center">{title}</Text>
        )}
    </View>
  )
}