import { View, Text, KeyboardAvoidingView, useWindowDimensions, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { TabView, SceneMap } from 'react-native-tab-view';
import Games from './Games'
import Transactions from './Transactions'
import { useThemeStore } from '@/store/ThemeStore'


const NotificationScreen = () => {

    const { theme } = useThemeStore();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

  
    const renderScene = SceneMap({
      first: Games,
      second: Transactions
    });
  
    const routes = [
        { key: 'first', title: 'Games' },
        { key: 'second', title: 'Transactions' }
    ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row gap-2 px-8 mt-2 border-b" style={{ borderColor: theme.colors.text}}>
        {props.navigationState.routes.map((route: any, i: number) => {
          const isFocused = props.navigationState.index === i;
  
          return (
            <TouchableOpacity
              key={i}
              className={`flex-1 items-center pt-2 pb-1 ${
                isFocused && 'border-b-4 border-brown-500'
              }`}
              onPress={() => props.jumpTo(route.key)}
            >
              <Text
                className={`text-sm font-msbold`}
                style={{color: theme.colors.text}}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full flex-1" style={{ backgroundColor: theme.colors.background}}>
        <View className='px-4'>
          <Header title='Notifications' icon onpress={() => router.back()}/>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
        />
        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default NotificationScreen