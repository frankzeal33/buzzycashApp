import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { images } from '@/constants'

const Loading = () => {
  return (
    <View className='w-full items-center justify-center flex-1'>
        <LottieView
            autoPlay
            style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
            }}
            source={images.loading}
        />
    </View>
  )
}

export default Loading