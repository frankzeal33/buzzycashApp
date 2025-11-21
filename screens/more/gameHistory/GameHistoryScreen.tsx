import Header from '@/components/Header'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import GameHistoryCard from '@/components/GameHistoryCard'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'

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
   {
    id: '7',
    lottery: 'Zero Play',
    price: 200,
    status: "ONGOING",
    winningBalls: 8,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '8',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "LOST",
     winningBalls: null,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '9',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "WON",
    winningBalls: null,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '10',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "ONGOING",
    winningBalls: 8,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '11',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "LOST",
     winningBalls: null,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '12',
    lottery: 'Weekend Allowee',
    price: 200,
    status: "WON",
     winningBalls: 30,
    createdAt: '2025-06-08 14:30:00'
  }
]

export default function GameHistoryScreen() {

  const { theme } = useThemeStore();
  const [games, setGames] = useState<gameType>([])
  const { bottom } = useSafeAreaInsets()

  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setGames(gameHistory)
  }, [])

  useEffect(() => {
    getGames()
  }, [])
  
  const getGames = async () => {
    setLoading(true)
    try {
      
      const result = await axiosClient.get(`/result/winners?limit=${pageSize}&page=${page}`)   

      setGames(result.data?.logsResponse?.items || [])
      setTotalItems(result.data?.logsResponse?.count || 0)
      console.log("g=",result.data?.logsResponse?.items)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderGamesHistory = ({item, index}: {item: any, index: number}) => (
    <GameHistoryCard item={item} index={index}/>
  )

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 px-4' style={{ backgroundColor: theme.colors.background}}>
      <Header title='Game History' icon onpress={() => router.back()}/>
     
        <View className="flex-1 mt-4 rounded-md border border-orange border-b-0 overflow-hidden pt-1">
          <FlatList
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGamesHistory}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: bottom + 40}}
            ListEmptyComponent={() => (  
              <View className="items-center justify-center py-44">
                <Text className="text-xl text-center font-msbold" style={{ color: theme.colors.text}}>No Games Placed yet!</Text>
                <Text className="text-sm text-center mt-1 font-mlight" style={{ color: theme.colors.text}}>
                  All your games status will show here.
                </Text>
              </View>
            )}
          />
        </View>

      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}