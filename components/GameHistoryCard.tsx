import { View, Text} from 'react-native'
import React from 'react'
import moment from 'moment'
import displayCurrency from '@/utils/displayCurrency';
import { useThemeStore } from '@/store/ThemeStore';

const statusColors: Record<string, string> = {
  WON: 'text-green-600',
  LOST: 'text-red-600',
  ONGOING: 'text-yellow-600',
};

const GameHistoryCard = ({item, index}: {item: any; index: number}) => {
  const { theme } = useThemeStore();
  const isEven = index % 2 === 0;
  // const bgClass = isEven ? 'bg-white' : 'bg-gray-200';
  // const badgeBg = isEven ? 'bg-gray-200' : 'bg-white';
  return (
    <View className={`w-full px-4 py-6`} style={{ backgroundColor: isEven ? theme.colors.background : theme.colors.darkGray}}>
      <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-start gap-2">
          <View className='w-32'>
            <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Lottery</Text>
          </View>
          <View className='items-end justify-end gap-2 flex-1'>
            <Text className="font-msbold text-base" style={{ color: theme.colors.text}}>{item?.lottery}</Text>
          </View>
        </View>
      </View>
      {item?.winningBalls && (
        <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-center gap-2">
            <View className='w-32'>
              <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Winning Balls</Text>
            </View>
            <View className='items-end justify-end gap-2 flex-1'>
              <View className={`rounded-full min-w-[30px] h-[30px] items-center justify-center px-[6px]`} style={{ backgroundColor: isEven ? theme.colors.darkGray : theme.colors.inputBg}}>
                <Text className="text-base font-msbold" style={{ color: theme.colors.text}}>{item?.winningBalls}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-start gap-2">
          <View className='w-32'>
            <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Price</Text>
          </View>
          <View className='items-end justify-end gap-2 flex-1'>
            <Text className="font-semibold text-base" style={{ color: theme.colors.text}}>{displayCurrency(Number(item?.price), 'NGN')}</Text>
          </View>
        </View>
      </View>
       <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-start gap-2">
          <View className='w-32'>
            <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Status</Text>
          </View>
          <View className='items-end justify-end gap-2 flex-1'>
            <Text className={`font-msbold text-base capitalize ${statusColors[item?.status] ?? ''}`}>{item?.status}</Text>
          </View>
        </View>
      </View>
      <Text className='text-right font-mregular text-sm mt-3' style={{ color: theme.colors.text}}>{moment(item?.createdAt).format('llll')}</Text>
    </View>
  )
}

export default GameHistoryCard