import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useThemeStore } from '@/store/ThemeStore';

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
  
    const { theme } = useThemeStore();
    const [isFocused, setIsFocused] = useState(false);

    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={[
            {
              backgroundColor: theme.colors.darkGray,
              borderColor: isFocused ? "#EF4734" : theme.colors.darkGray
            }
        ]} className={`border ${isFocused ? 'border-orange' : 'border-white'} w-full h-14 px-2 bg-white rounded-md items-center gap-1 flex-row`}>
          <TextInput style={[
              {
                backgroundColor: theme.colors.darkGray,
                color: theme.colors.text
              }
            ]} className="flex-1 font-aregular text-base" value={value} placeholder={placeholder} placeholderTextColor="#ccc" onChangeText={handleChangeText} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} editable={disabled}/>
          <TouchableOpacity>
              <AntDesign name="search1" size={22} color="#ccc" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SearchInput