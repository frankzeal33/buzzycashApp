import { View, Text} from 'react-native'
import React from 'react'
import moment from 'moment'
import displayCurrency from '@/utils/displayCurrency';

const statusColors: Record<string, string> = {
  WON: 'text-green-600',
  LOST: 'text-red-600',
  ONGOING: 'text-yellow-600',
};

const GameHistoryCard = ({item, index}: {item: any; index: number}) => {
  const isEven = index % 2 === 0;
  const bgClass = isEven ? 'bg-white' : 'bg-gray-200';
  const badgeBg = isEven ? 'bg-gray-200' : 'bg-white';

  return (
    <View className={`w-full ${bgClass} px-4 py-6`}>
      <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-start gap-2">
          <View className='w-32'>
            <Text className="font-msbold text-base capitalize" numberOfLines={1}>Lottery</Text>
          </View>
          <View className='items-end justify-end gap-2 flex-1'>
            <Text className="font-msbold text-base">{item?.lottery}</Text>
          </View>
        </View>
        <View className='border border-dashed border-brown-200 mt-4'/>
      </View>
      {item?.winningBalls && (
        <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-center gap-2">
            <View className='w-32'>
              <Text className="font-msbold text-base capitalize" numberOfLines={1}>Winning Balls</Text>
            </View>
            <View className='items-end justify-end gap-2 flex-1'>
              <View className={`${badgeBg} rounded-full min-w-[30px] h-[30px] items-center justify-center px-[6px]`}>
                <Text className="text-base font-msbold">{item?.winningBalls}</Text>
              </View>
            </View>
          </View>
          <View className='border border-dashed border-brown-200 mt-4'/>
        </View>
      )}
      <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-start gap-2">
          <View className='w-32'>
            <Text className="font-msbold text-base capitalize" numberOfLines={1}>Price</Text>
          </View>
          <View className='items-end justify-end gap-2 flex-1'>
            <Text className="font-semibold text-base">{displayCurrency(Number(item?.price), 'NGN')}</Text>
          </View>
        </View>
        <View className='border border-dashed border-brown-200 mt-4'/>
      </View>
       <View className='w-full mt-2'>
         <View className="flex-1 justify-between w-full flex-row items-start gap-2">
          <View className='w-32'>
            <Text className="font-msbold text-base capitalize" numberOfLines={1}>Status</Text>
          </View>
          <View className='items-end justify-end gap-2 flex-1'>
            <Text className={`font-msbold text-base capitalize ${statusColors[item?.status] ?? ''}`}>{item?.status}</Text>
          </View>
        </View>
        <View className='border border-dashed border-brown-200 mt-4'/>
      </View>
      <Text className='text-right font-mregular text-sm mt-3'>{moment(item?.createdAt).format('llll')}</Text>
    </View>
  )
}

export default GameHistoryCard