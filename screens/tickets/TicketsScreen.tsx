import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TicketsScreen() {
  return (
    <SafeAreaView className='h-full bg-white px-4'>
     
      <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}