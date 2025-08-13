import { TouchableOpacity, Text} from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

type buttonProps = {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  bgColor?: string;
  textStyles?: string;
  isLoading?: boolean;
  disableButton?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
}

const GradientButton = ({ title, handlePress, containerStyles, bgColor, textStyles, isLoading, disableButton, gradientColors = ['#FFAE4D', '#EF4734', '#EF4734'] }: buttonProps) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`rounded-md min-h-16 ${containerStyles} ${isLoading || disableButton ? 'opacity-50' : ''}`} disabled={isLoading || disableButton}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 5}}
      >
        {isLoading ? <FontAwesome5 name="circle-notch" size={22} color="white" className='animate-spin-fast'/> :
          <Text className={`font-mbold text-lg ${textStyles}`}>{title}</Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default GradientButton