import { View, Text, KeyboardAvoidingView, useWindowDimensions, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { TabView, SceneMap } from 'react-native-tab-view';
import Games from './Games'
import All from './All'
import Transactions from './Transactions'


const NotificationScreen = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

  
    const renderScene = SceneMap({
        first: Games,
        second: Transactions,
        third: All
    });
  
    const routes = [
        { key: 'first', title: 'Games' },
        { key: 'second', title: 'Transactions' },
        { key: 'third', title: 'All' },
    ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row gap-2 px-8 mt-2 border-b border-lightBlack">
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
    <SafeAreaView className="bg-gray-100 h-full">
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
        <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}

export default NotificationScreen