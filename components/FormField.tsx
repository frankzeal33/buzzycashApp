import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { KeyboardTypeOptions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

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

const FormField = ({ title, value, placeholder, inputBg, keyboardType, handleChangeText, disabled, labelStyle, otherStyles, ...props}: formProps) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className={`${inputBg ? inputBg : 'bg-gray-200'} border-2 ${isFocused ? 'border-lightBlack' : 'border-gray-200'} w-full h-16 px-4 rounded-md items-center flex-row gap-1`}>
        <TextInput className={`${inputBg ? inputBg : 'bg-gray-200'} flex-1 text-black font-mmedium text-base h-full`} value={value} placeholder={placeholder} placeholderTextColor="#979797" onChangeText={handleChangeText} secureTextEntry={title === "Password*" ? !showPassword : title === "Confirm Password*" ? !showConfirmPassword : title === "Current Password*" ? !showCurrentPassword : title === "New Password*" ? !showNewPassword : title === "Confirm New Password*" ? !showConfirmNewPassword : false} keyboardType={keyboardType ? keyboardType: 'default'} editable={disabled} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
        {title === 'Password*' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={!showPassword ? "eye" : "eye-off"} size={26} color="#A0A0A0" />
            </TouchableOpacity>
        )}
        {title === "Confirm Password*" && (
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={!showConfirmPassword ? "eye" : "eye-off"} size={26} color="#A0A0A0" />
            </TouchableOpacity>
        )}
        {title === "Current Password*" && (
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Ionicons name={!showCurrentPassword ? "eye" : "eye-off"} size={26} color="#A0A0A0" />
            </TouchableOpacity>
        )}
        {title === "New Password*" && (
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons name={!showNewPassword ? "eye" : "eye-off"} size={26} color="#A0A0A0" />
            </TouchableOpacity>
        )}
        {title === "Confirm New Password*" && (
            <TouchableOpacity onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                <Ionicons name={!showConfirmNewPassword ? "eye" : "eye-off"} size={26} color="#A0A0A0" />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField