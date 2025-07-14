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
    <View className='w-full h-16 bg-gray-200 gap-4 rounded-md flex-row justify-between px-4 items-center'>
        <Text className='text-gray-500 font-mmedium'>{title}</Text>
        <View className="flex-1">
            <TextInput className={`${inputBg ? inputBg : 'bg-gray-200'} flex-1 text-black font-msbold text-base h-full text-right`} value={value} placeholder={placeholder} placeholderTextColor="#979797" onChangeText={handleChangeText} keyboardType={keyboardType ? keyboardType: 'default'}/>
        </View>
    </View>
  )
}

export default EditProfileBox