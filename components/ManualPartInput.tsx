import { View, Text, KeyboardTypeOptions, TouchableOpacity } from 'react-native'
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
  flag: string;
  otherStyles?: string;
  dailCode: string;
  keyboardType?: KeyboardTypeOptions;
  [props:string]: any;
  showModal: () => void;
}

const ManualPartInput = ({ title, value, placeholder, dailCode, flag, inputBg, keyboardType, showModal, handleChangeText, disabled, labelStyle, otherStyles, ...props}: formProps) => {
    
  const { theme } = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[
          {
            backgroundColor: theme.colors.inputBg,
            borderColor: isFocused ? theme.colors.inputBorder : theme.colors.inputBg,
          }
        ]} className={`${isFocused && 'border'} h-16 pr-4 rounded-md items-center flex-row gap-1 ${otherStyles}`}>
        <TouchableOpacity className='flex-row items-center justify-center rounded-l-md h-full px-3' activeOpacity={0.8} onPress={showModal} style={[
            {
              backgroundColor: theme.colors.gray
            }
          ]}>
          <Text className='text-xl'>{flag}</Text>
          <TextInput className={`pl-1 font-mmedium text-base`} value={dailCode} placeholderTextColor="#979797" editable={false}/>
        </TouchableOpacity>
        <TextInput style={[
            {
              backgroundColor: theme.colors.inputBg,
              color: theme.colors.text
            }
          ]} className={`flex-1 font-mmedium text-base h-full pl-2`} value={value} placeholder={placeholder} placeholderTextColor="#979797" onChangeText={handleChangeText} keyboardType="phone-pad" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
    </View>
  )
}

export default ManualPartInput