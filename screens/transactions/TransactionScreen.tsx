import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ActivityIndicator, FlatList, Platform, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionScreen() {

  return (
    <SafeAreaView>
     
      <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}