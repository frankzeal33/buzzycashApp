import { StatusBar } from 'expo-status-bar'
import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MoreScreen() {
 
  return (
    <SafeAreaView className="h-full bg-white">

      <StatusBar backgroundColor="#003366" style='light'/>
    </SafeAreaView>
  )
}