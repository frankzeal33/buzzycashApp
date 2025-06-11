import Header from '@/components/Header'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import GameHistoryCard from '@/components/GameHistoryCard'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

type gameType = {
  id: string;
  lottery: string;
  price: number;
  status: string;
  winningBalls: number | null;
  createdAt: string;
}[]

const gameHistory: gameType = [
  {
    id: '1',
    lottery: 'Zero Play',
    price: 200,
    status: "ONGOING",
    winningBalls: 8,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '2',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "LOST",
     winningBalls: null,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '3',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "WON",
    winningBalls: null,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '4',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "ONGOING",
    winningBalls: 8,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '5',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "LOST",
     winningBalls: null,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '6',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "WON",
     winningBalls: 30,
    createdAt: '2025-06-08 14:30:00'
  },
  //  {
  //   id: '7',
  //   lottery: 'Zero Play',
  //   price: 200,
  //   status: "ONGOING",
  //   winningBalls: 8,
  //   createdAt: '2025-06-08 14:30:00'
  // },
  //   {
  //   id: '8',
  //   lottery: 'Weekend Allowee',
  //   price: 200,
  //   status: "LOST",
  //    winningBalls: null,
  //   createdAt: '2025-06-08 14:30:00'
  // },
  //   {
  //   id: '9',
  //   lottery: 'Weekend Allowee',
  //   price: 200,
  //   status: "WON",
  //   winningBalls: null,
  //   createdAt: '2025-06-08 14:30:00'
  // },
  //   {
  //   id: '10',
  //   lottery: 'Weekend Allowee',
  //   price: 200,
  //   status: "ONGOING",
  //   winningBalls: 8,
  //   createdAt: '2025-06-08 14:30:00'
  // },
  //   {
  //   id: '11',
  //   lottery: 'Weekend Allowee',
  //   price: 200,
  //   status: "LOST",
  //    winningBalls: null,
  //   createdAt: '2025-06-08 14:30:00'
  // },
  //   {
  //   id: '12',
  //   lottery: 'Weekend Allowee',
  //   price: 200,
  //   status: "WON",
  //    winningBalls: 30,
  //   createdAt: '2025-06-08 14:30:00'
  // }
]

export default function GameHistoryScreen() {

  const [games, setGames] = useState<gameType>([])
  const { bottom } = useSafeAreaInsets()

  useEffect(() => {
    setGames(gameHistory)
  }, [])

  const renderGamesHistory = ({item, index}: {item: any, index: number}) => (
    <GameHistoryCard item={item} index={index}/>
  )

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 bg-gray-100 px-4'>
      <Header title='Game History' icon onpress={() => router.back()}/>
     
        <View className="mt-4 flex-1">
          <FlatList
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGamesHistory}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: bottom + 40}}
            ListEmptyComponent={() => (  
              <View className="items-center justify-center py-44">
                <Text className="text-xl text-center font-msbold">No Games Placed yet!</Text>
                <Text className="text-sm text-center mt-1 font-mlight">
                  All your games status will show here.
                </Text>
              </View>
            )}
          />
        </View>

      <StatusBar backgroundColor="#E9E9E9" style='dark'/>
    </SafeAreaView>
  )
}