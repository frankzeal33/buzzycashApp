import { images } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Pressable, ImageBackground, TouchableOpacity } from 'react-native'
import CountDown from 'react-native-countdown-component';
import StrokedText from './StrokedText';
import displayCurrency from '@/utils/displayCurrency';
import { getCountdownSeconds } from '@/utils/CountdownSeconds';

const GameCard = ({ item, handlePress, index }: { item: any; handlePress: () => void; index: number }) => {
  return (
    <View
      className="w-full h-[287px] mb-2 bg-brown-200"
      style={{
        borderRadius: 12,
        paddingBottom: 2,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <ImageBackground
          source={images.gameCard}
          resizeMode="cover"
          style={{ width: '100%', height: '100%', }}
        >
          <View className="w-full mt-[75px] p-2 items-center">
            <StrokedText
              text={item?.title}
              fontSize={23}
              stroke="#000"
              color="#FF9439"
              maxCharsPerLine={27}
            />
            <View className='items-center mt-2 mb-6'>
              {/* Custom Labels Row */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 1 }}>
                {['Days', 'Hours', 'Mins', 'Secs'].map((label, index) => (
                  <View key={index} style={{ width: 45, alignItems: 'center', marginHorizontal: 4 }}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>{label}</Text>
                  </View>
                ))}
              </View>

              {/* Countdown Digits */}
              <CountDown
                until={getCountdownSeconds(item?.expiryTime)}
                size={20}
                onFinish={() => console.log('Time up!')}
                digitStyle={{
                  backgroundColor: '#fff',
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                }}
                digitTxtStyle={{
                  color: '#111625',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                separatorStyle={{ color: '#fff', fontSize: 30, fontWeight: 'bold', marginRight:10 }}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{}} // Hide default labels
                showSeparator
              />
            </View>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className='bg-white rounded-md min-h-11 justify-center items-center'>
                <Text className={`font-mbold text-blue text-base px-3`}>Play with {displayCurrency(Number(item?.amount), 'NGN')}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default GameCard