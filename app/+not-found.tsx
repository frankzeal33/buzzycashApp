import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeStore } from '@/store/ThemeStore';

const notFound = () => {

  const { theme } = useThemeStore();

  return (
    <SafeAreaView className="flex-1 h-full px-4 items-center justify-center" style={{ backgroundColor: theme.colors.background }} >
      <Text className='text-xl font-abold' style={{ color: theme.colors.text }} >Screen Not Found</Text>
    </SafeAreaView>
  )
}

export default notFound