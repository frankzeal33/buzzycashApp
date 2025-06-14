import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

type formProps = {
  value?: string;
  placeholder?: any; 
  handleChangeText?: (e: any) => void;
  labelStyle?: string;
  otherStyles?: string;
  disabled?: boolean;
  [props:string]: any;
}

const SearchInput = ({ value, placeholder, handleChangeText, labelStyle, disabled, otherStyles, ...props}: formProps) => {
  
    const [isFocused, setIsFocused] = useState(false);

    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className={`border ${isFocused ? 'border-orange' : 'border-white'} w-full h-14 px-2 bg-white rounded-md items-center gap-1 flex-row`}>
            <TextInput className="flex-1 bg-white text-black font-aregular text-base" placeholder={placeholder} placeholderTextColor="#ccc" onChangeText={handleChangeText} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} editable={disabled}/>
            <TouchableOpacity>
                <AntDesign name="search1" size={22} color="#ccc" />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SearchInput