import Header from '@/components/Header'
import TicketCard from '@/components/TicketCard'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FlatList, Modal, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pagination from '@cherry-soft/react-native-basic-pagination';
import Loading from '@/components/Loading'
import { router } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'
import displayCurrency from '@/utils/displayCurrency'
import moment from 'moment'

type ticketsType = {
  game_id: string;
  game_id__amount: string; 
  game_id__draw_time: string; 
  game_id__game_id: string;
  game_id__max_winners: number, 
  game_id__name: string; 
  game_id__status: string; 
  id: string;
  purchased_at: string; 
  status: string;
}

export default function TicketsScreen() {

  const { theme } = useThemeStore();
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState<ticketsType[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [ticketInfo, setTicketInfo] = useState<ticketsType | null>(null)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getTickets()
  }, [])

  const getTickets = async () => {
    setLoading(true)
    try {
      
      const result = await axiosClient.get(`/ticket/get-tickets?limit=${pageSize}&page=${page}`)   

      setTickets(result.data?.tickets || [])
      setTotalItems(result.data?.count || 0)
      console.log(result.data)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleModal = (item: ticketsType) => {
    setTicketInfo(item)
    setShowModal(true)
  }

  const renderTickets = ({item, index}: {item: any, index: number}) => (
    <TicketCard item={item} index={index} handlePress={() => handleModal(item)}/>
  )

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
              keyExtractor={(item, index) => item?.id}
              renderItem={renderTickets}
              scrollEnabled={false}
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

        {tickets.length > 0 && totalItems > pageSize && !loading && (
          <View className="mb-6">
            <Pagination
              totalItems={totalItems}
              pageSize={pageSize}
              currentPage={page}
              onPageChange={setPage}
              showLastPagesButtons
              btnStyle={{ backgroundColor: theme.colors.lightDarkGray, borderWidth: 0, borderRadius: 5 }}
              textStyle={{ color: "#DF7844" }}
              activeBtnStyle={{ backgroundColor: '#DF7844' }}
              activeTextStyle={{ color: theme.colors.background }}
            />
          </View>
        )}

        <Modal
          transparent={true}
          // animationType='slide'
          visible={showModal}
          statusBarTranslucent={true}
          onRequestClose={() => setShowModal(false)}>
            <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              {/* TouchableWithoutFeedback only around the background */}
              <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                <View className="absolute top-0 left-0 right-0 bottom-0" />
              </TouchableWithoutFeedback>

              {/* Actual modal content */}
              <View className="rounded-2xl max-h-[60%] px-4 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className='my-7 gap-5'>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Name</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{ticketInfo?.game_id__name}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Amount</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{displayCurrency(Number(ticketInfo?.game_id__amount))}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>G-Status</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className={`capitalize text-base font-mmedium flex-1 ${ticketInfo?.game_id__status === "active" ? "text-green-500" : "text-red-500"}`}>{ticketInfo?.game_id__status}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Draw Time</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{moment(ticketInfo?.game_id__draw_time).format('llll')}</Text>
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
                      <Text className={`capitalize text-base font-mmedium flex-1 ${ticketInfo?.status === "SUCCESSFUL" ? "text-green-500" : ticketInfo?.status === "FAILED" ? "text-red-500" : "text-yellow-500"}`}>{ticketInfo?.status}</Text>
                    </View>
                    <View className='flex-row items-center justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Game Id</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{ticketInfo?.game_id__game_id}</Text>
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