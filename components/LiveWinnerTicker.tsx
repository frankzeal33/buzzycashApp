import { DateLabels } from '@/utils/DateLabels';
import displayCurrency from '@/utils/displayCurrency';
import { memo, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';

const LiveWinnerTicker = memo(({winnerMessages}: {winnerMessages: any}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % winnerMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  
  const current = winnerMessages[currentIndex];

  return (
    <View className='justify-center bg-gray-200 rounded-2xl px-4 py-2 h-16'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-orange font-msbold'>{current.phone}</Text>
        <Text className='text-orange font-mmedium text-sm'>{DateLabels(current.timestamp)}</Text>
      </View>
      <Text className='text-orange font-msbold'>
        Has just won {displayCurrency(Number(current.amount), 'NGN')}
      </Text>
    </View>
  );
});

export default LiveWinnerTicker
