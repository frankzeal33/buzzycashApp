import { TouchableOpacity, Text} from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useThemeStore } from '@/store/ThemeStore';

type buttonProps = {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  bgColor?: string;
  textStyles?: string;
  isLoading?: boolean;
  disableButton?: boolean;
}

const CustomButton = ({ title, handlePress, containerStyles, bgColor, textStyles, isLoading, disableButton }: buttonProps) => {
  
  const { theme } = useThemeStore();
  
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`rounded-md min-h-16 justify-center items-center ${containerStyles} ${isLoading || disableButton ? 'opacity-50' : ''}`} style={{backgroundColor: theme.colors.text}} disabled={isLoading || disableButton}>
        {isLoading ? <FontAwesome5 name="circle-notch" size={20} color="white" className='animate-spin-fast'/> :
         <Text className={`font-mbold text-lg ${textStyles}`} style={{color: theme.colors.background}}>{title}</Text>
         }
    </TouchableOpacity>
  )
}

export default CustomButton