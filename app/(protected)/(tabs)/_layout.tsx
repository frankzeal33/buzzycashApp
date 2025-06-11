import { View, Image } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from '../../../constants'
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabIcon = ({icon, focused}: {icon: any; focused: boolean}) => {
  return (
    <View className={`items-center justify-center ${!focused ? 'opacity-60' : ''}`}>
      <Image source={icon} resizeMode='contain' className={`w-6 h-6`}/>
    </View>
  )
}
const TabsLayout = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Tabs screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "home/index") {
              iconName = (
                <AntDesign name="home" size={24} color={color} />
              );
            } else if (route.name === "tickets/index") {
              iconName = (
                <Ionicons name="ticket-outline" size={24} color={color} />
              );
            } else if (route.name === "transactions/index") {
              iconName = (
                <Ionicons name="cash-outline" size={24}  color={color} />
              );
            } else if (route.name === "more/index") {
              iconName = (
                <Entypo name="dots-three-horizontal" size={24} color={color} />
              );
            }
            return iconName;
          }, 
          tabBarActiveTintColor: "#EF9439", 
          tabBarInactiveTintColor: "#3A3A3A",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 10, 
            fontFamily: 'Montserrat-Bold',
          },
          headerShown: false, 
          tabBarStyle: {backgroundColor: '#E9E9E9', borderTopWidth: 1.5, borderTopColor: '#111625',  height: 60 + bottom,
            paddingBottom: bottom,
        }}}}>
        <Tabs.Screen name="home/index" options={{title: 'Home', headerShown: false}}/>
        <Tabs.Screen name="tickets/index" options={{title: 'Tickets', headerShown: false}}/>
        <Tabs.Screen name="transactions/index" options={{title: 'Transactions', headerShown: false}}/>
        <Tabs.Screen name="more/index" options={{title: 'More', headerShown: false}}/>
        {/* <Tabs.Screen name="more/GameHistory" options={{ href: null }} /> */}
      </Tabs>
    </>
  )
}

export default TabsLayout