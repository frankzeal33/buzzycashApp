import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { useThemeStore } from '@/store/ThemeStore';

type formProps = {
  title?: string; 
  value?: string;
  placeholder?: any; 
  handleChangeText?: (e: any) => void;
  labelStyle?: string;
  inputBg?: string;
  disabled?: boolean;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  [props:string]: any;
}

const EditProfileBox = ({ title, value, placeholder, inputBg, keyboardType, handleChangeText, disabled, labelStyle, otherStyles, ...props}: formProps) => {
 
  const { theme } = useThemeStore();
  return (
    <View className='w-full h-16 gap-4 rounded-md flex-row justify-between px-4 items-center' style={{ backgroundColor: theme.colors.inputBg}}>
        <Text className='text-gray-500 font-mmedium'>{title}</Text>
        <View className="flex-1">
          <TextInput className={`flex-1 font-msbold text-base h-full text-right`} style={{ backgroundColor: theme.colors.inputBg, color: theme.colors.text}}  value={value} placeholder={placeholder} placeholderTextColor="#979797" onChangeText={handleChangeText} keyboardType={keyboardType ? keyboardType: 'default'}/>
        </View>
    </View>
  )
}

export default EditProfileBox