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
      </Stack>

      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </>
  )
}

export default _layout