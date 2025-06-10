import { View, Image } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from '../../../constants'

const TabIcon = ({icon, focused}: {icon: any; focused: boolean}) => {
  return (
    <View className={`items-center justify-center ${!focused ? 'opacity-60' : ''}`}>
      <Image source={icon} resizeMode='contain' className={`w-6 h-6`}/>
    </View>
  )
}
const TabsLayout = () => {
  return (
    <>
        <Tabs screenOptions={{ tabBarShowLabel: true, headerShown: false, tabBarActiveTintColor: '#003366', tabBarInactiveTintColor: '#ccc', tabBarStyle: {backgroundColor: '#ffffff', borderTopWidth: 0.2, borderTopColor: '#ccc', height: 70, borderTopLeftRadius: 20, borderTopRightRadius: 20}}}>
            <Tabs.Screen name="home/index" options={{title: 'Home', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.home} focused={focused}/>
            )}}/>
            <Tabs.Screen name="tickets/index" options={{title: 'Tickets', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.shipments} focused={focused}/>
            )}}/>
            <Tabs.Screen name="transactions/index" options={{title: 'Transactions', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.transactions} focused={focused}/>
            )}}/>
            <Tabs.Screen name="more/index" options={{title: 'More', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.more} focused={focused}/>
            )}}/>
            {/* <Tabs.Screen
              name="more/GameHistory"
              options={{ href: null }}
            /> */}
        </Tabs>
    </>
  )
}

export default TabsLayout