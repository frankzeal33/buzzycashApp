import { View, Text } from 'react-native'
import React from 'react'

const ErrorText = ({error}: {error: string}) => {
  return (
    <Text className={`text-orange mb-2 font-mmedium text-center ${error ? 'animate-blink' : 'animate-none'}`}>
        {error}
    </Text>
  )
}

export default ErrorText