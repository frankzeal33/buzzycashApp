import { useThemeStore } from '@/store/ThemeStore';
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {

  const { theme } = useThemeStore();
  
  return (
    <>
    <Stack screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='Register'/>
      <Stack.Screen name='LogIn'/>
    </Stack>

    <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default _layout