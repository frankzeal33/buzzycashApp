import { TouchableOpacity, Text} from 'react-native'
import { ReactElement } from 'react';
import { useThemeStore } from '@/store/ThemeStore';

type buttonProps = {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  icon: ReactElement;
  isLoading?: boolean;
  border?: boolean
}

const IconButton = ({ title, handlePress, containerStyles, border, textStyles, icon, isLoading }: buttonProps) => {
 
  const { theme } = useThemeStore();
 
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`flex-row rounded-md gap-2 px-2 min-h-10 justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading} style={{borderWidth: theme.dark && border ? 0.5 : 0, borderColor: theme.dark ? "#FF9439" : undefined,}}>
      {icon}
      <Text className={`font-msbold text-xs ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default IconButton