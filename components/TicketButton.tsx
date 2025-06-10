import { Text, View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto, Ionicons } from '@expo/vector-icons';

const TicketButton = () => {
  return (
    <View className='min-h-16 w-32'>
      <LinearGradient
        colors={['#FFAE4D', '#EF4734']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 1 }}
        style={{flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 8}}
      >
        <View className={`flex-row gap-2 px-2 justify-center items-center `}>
            <Ionicons name="receipt" size={18} color="black" />
            <Text className={`font-msbold text-lg `}>Tickets</Text>
        </View>
        
      </LinearGradient>
    </View>
  )
}

export default TicketButton