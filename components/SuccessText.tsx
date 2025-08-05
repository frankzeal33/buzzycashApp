import { View, Text } from 'react-native'
import React from 'react'

const SuccessText = ({error}: {error: string}) => {
  return (
    <Text className={`text-green-500 mb-2 font-mmedium text-center ${error ? 'animate-blink' : 'animate-none'}`}>
        {error}
    </Text>
  )
}

export default SuccessText