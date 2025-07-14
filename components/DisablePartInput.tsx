import { View, Text, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
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
  disabledValue: string;
  keyboardType?: KeyboardTypeOptions;
  [props:string]: any;
}

const DisablePartInput = ({ title, value, placeholder, disabledValue, inputBg, keyboardType, handleChangeText, disabled, labelStyle, otherStyles, ...props}: formProps) => {
    
  const { theme } = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`bg-gray-200 ${isFocused && 'border-2 border-lightBlack'} h-16 pr-4 rounded-md items-center flex-row gap-1 ${otherStyles}`}>
        <TextInput className={`bg-gray-300 rounded-l-md px-4 text-black font-mmedium text-base h-full`} value={disabledValue} placeholderTextColor="#979797" editable={false}/>
        <TextInput className={`bg-gray-200 flex-1 text-black font-mmedium text-base h-full pl-2`} value={value} placeholder={placeholder} placeholderTextColor="#979797" onChangeText={handleChangeText} keyboardType="phone-pad" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
    </View>
  )
}

export default DisablePartInput