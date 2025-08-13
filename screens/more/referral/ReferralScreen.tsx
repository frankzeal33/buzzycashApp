import { View, Text, KeyboardAvoidingView, useWindowDimensions, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { TabView, SceneMap } from 'react-native-tab-view';
import ReferEarn from './ReferEarn'
import Referrals from './Referrals'
import { useThemeStore } from '@/store/ThemeStore'


const ReferralScreen = () => {

    const { theme } = useThemeStore();

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

  
    // const renderScene = SceneMap({
    //     first: ReferEarn,
    //     second: Referrals
    // });

    const renderScene = ({ route }: any) => {
      switch (route.key) {
        case 'first':
          return <ReferEarn isFocused={index === 0} />;
        case 'second':
          return <Referrals isFocused={index === 1} />;
        default:
          return null;
      }
    };
  
    const routes = [
        { key: 'first', title: 'Refer & Earn' },
        { key: 'second', title: 'Referrals' },
    ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row gap-2 px-12 mt-2 border-b" style={{ borderColor: theme.colors.text}}>
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
    <SafeAreaView className="h-full" style={{ backgroundColor: theme.colors.background}}>
        <View className='px-4'>
          <Header title='My Referral' icon onpress={() => router.back()}/>
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

export default ReferralScreen