import { useThemeStore } from '@/store/ThemeStore';
import { DateLabels } from '@/utils/DateLabels';
import displayCurrency from '@/utils/displayCurrency';
import { useSkeletonCommonProps } from '@/utils/SkeletonProps';
import { Skeleton } from 'moti/skeleton';
import { memo, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';

const LiveWinnerTicker = memo(({winnerMessages, loading}: {winnerMessages: any, loading: boolean}) => {

  const { theme } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const skeletonProps = useSkeletonCommonProps();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % winnerMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  
  const current = winnerMessages[currentIndex];

  return (
    <>
      {loading ? (
        <View className='justify-center rounded-2xl px-4 py-2 h-16' style={{ backgroundColor: theme.dark ? theme.colors.background : theme.colors.inputBg}}>
          <View className='flex-1 flex-row items-center justify-between'>
            <Skeleton.Group show={loading}>
              <View className='mb-4 flex-row items-center'>
                <Skeleton height={10} width={130} {...skeletonProps} />
              </View>
            </Skeleton.Group>
            <Skeleton.Group show={loading}>
              <View className='mb-4 flex-row items-center'>
                <Skeleton height={10} width={130} {...skeletonProps} />
              </View>
            </Skeleton.Group>
          </View>
        </View>
      ) : (
        <View className='justify-center rounded-2xl px-4 py-2 h-16' style={{ backgroundColor: theme.dark ? theme.colors.background : theme.colors.inputBg}}>
          <View className='flex-row items-center justify-between'>
            <Text className='text-orange font-msbold'>{current.phone}</Text>
            <Text className='text-orange font-mmedium text-sm'>{DateLabels(current.timestamp)}</Text>
          </View>
          <Text className='text-orange font-msbold'>
            Has just won {displayCurrency(Number(current.amount))}
          </Text>
        </View>
      )}
    </>
  );
});

export default LiveWinnerTicker
