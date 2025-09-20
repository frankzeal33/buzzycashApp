import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'
import { WebView } from "react-native-webview"
import { AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const { height, width} = Dimensions.get("window")

const ExternalVirtualGamesScreen = () => {

  const { theme } = useThemeStore();
  const { gameLink } = useLocalSearchParams() as any;

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

    // if(!url.includes('https://checkout.nomba.com')) {
    //   getWallet(true)
    //   router.dismissAll()
    // }

  };

  return (
    <SafeAreaView className='h-full flex-1 bg-black'>
      <View className='px-4'>
        <View className='py-2'>
          <View className='flex-row items-center justify-between gap-2'>
            <View className='w-7'/>
            <TouchableOpacity onPress={() => router.back()}><AntDesign name="arrowleft" size={28} color="#fff"/></TouchableOpacity>
          </View>
        </View>
      </View>

      <WebView
       ref={webview}
        source={{uri: gameLink }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />

      {
        visible && (
          <ActivityIndicator size="large" color="black" style={{position:"absolute", top: height/2, left: width/2}}/>
        )
      }

        <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default ExternalVirtualGamesScreen