import Header from '@/components/Header'
import TicketCard from '@/components/TicketCard'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Modal, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '@/components/Loading'
import { router } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'
import displayCurrency from '@/utils/displayCurrency'
import moment from 'moment'

type ticketsType = {
  game_id: string;
  amount: string; 
  next_draw_time: string;
  max_winners: number, 
  name: string;
  id: string;
  purchased_at: string; 
  status: string;
  payment_status: string;
}

const PAGE_SIZE = 5;

export default function TicketsScreen() {

  const { theme } = useThemeStore();
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [tickets, setTickets] = useState<ticketsType[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [ticketInfo, setTicketInfo] = useState<ticketsType | null>(null)
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTickets(1, true)
  }, [])

  const getTickets = async (pageNum: number, isInitial = false) => {
    if (isInitial) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const result = await axiosClient.get(`/tickets/my-tickets?limit=${PAGE_SIZE}&page=${pageNum}`)
      const newItems: ticketsType[] = result.data?.games || []

      setTickets(prev => isInitial ? newItems : [...prev, ...newItems])
      setHasMore(result.data?.has_more ?? false)
      console.log("Ti=", result.data)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleLoadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    const nextPage = page + 1
    setPage(nextPage)
    getTickets(nextPage)
  }, [loadingMore, hasMore, page])

  const handleModal = (item: ticketsType) => {
    setTicketInfo(item)
    setShowModal(true)
  }

  const renderTickets = ({ item, index }: { item: ticketsType, index: number }) => (
    <TicketCard item={item} index={index} handlePress={() => handleModal(item)}/>
  )

  const renderFooter = () => {
    if (!loadingMore) return null
    return (
      <View className="py-4 items-center">
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 px-4' style={{ backgroundColor: theme.colors.background}}>
      <Header title='Purchased Tickets' icon onpress={() => router.back()}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
     
        {loading ? (
          <View className="my-4 py-52" style={{ backgroundColor: theme.colors.darkGray}}>
            <Loading/>
          </View>
        ) : (
          <View className="my-4" style={{ backgroundColor: theme.colors.darkGray}}>
            <FlatList
              data={tickets}
              keyExtractor={(item) => item?.id}
              renderItem={renderTickets}
              scrollEnabled={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={() => (  
                <View className="items-center justify-center py-52">
                  <Text className="text-xl text-center font-msbold" style={{ color: theme.colors.text}}>No Tickets yet!</Text>
                  <Text className="text-sm text-center mt-1 font-mlight" style={{ color: theme.colors.text}}>
                    All your purchased tickets will show here.
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        <Modal
          transparent={true}
          visible={showModal}
          statusBarTranslucent={true}
          onRequestClose={() => setShowModal(false)}>
            <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                <View className="absolute top-0 left-0 right-0 bottom-0" />
              </TouchableWithoutFeedback>

              <View className="rounded-2xl max-h-[60%] px-4 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className='my-7 gap-5'>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Name</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{ticketInfo?.name}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Amount</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{displayCurrency(Number(ticketInfo?.amount))}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>G-Status</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className={`capitalize text-base font-mmedium flex-1 ${ticketInfo?.status === "active" ? "text-green-600" : "text-red-600"}`}>{ticketInfo?.status}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Draw Time</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{moment(ticketInfo?.next_draw_time).format('llll')}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Purchased At</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{moment(ticketInfo?.purchased_at).format('llll')}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>P-Status</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className={`capitalize text-base font-mmedium flex-1 ${ticketInfo?.payment_status === "successful" ? "text-green-600" : ticketInfo?.payment_status === "failed" ? "text-red-600" : "text-amber-600"}`}>{ticketInfo?.payment_status}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Game Id</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{ticketInfo?.game_id}</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
        </Modal>

      </ScrollView>
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}