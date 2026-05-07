import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { WebView } from "react-native-webview"
import { AntDesign } from '@expo/vector-icons'

const { height, width} = Dimensions.get("window")

const FundPaymentGatewayScreen = () => {

  const { paylink } = useLocalSearchParams() as any;

  const [visible, setVisible] = useState(false)

  const webview = useRef<WebView>(null);

  const handleWebViewNavigationStateChange = (newNavState: any) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    console.log("url",url)
    if (!url) return;

    // if(url.includes('?orderId')) {
    //   getWallet(true)
    //   router.dismissAll()
    // }

  };

  return (
    <SafeAreaView className='h-full flex-1 bg-white'>
      <View className='px-4'>
        <View className='py-2'>
          <View className='flex-row items-center justify-between gap-2'>
            <View className='w-7'/>
            <TouchableOpacity onPress={() => router.back()}><AntDesign name="arrowleft" size={28} color="#EF9439"/></TouchableOpacity>
          </View>
          <Text className={`text-xl font-msbold mt-1 text-center text-black`}>Fund Wallet</Text>
        </View>
      </View>

      <WebView
       ref={webview}
        source={{uri: paylink }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />

      {
        visible && (
          <ActivityIndicator size="large" color="#111625" style={{position:"absolute", top: height/2, left: width/2}}/>
        )
      }

    </SafeAreaView>
  )
}

export default FundPaymentGatewayScreen
