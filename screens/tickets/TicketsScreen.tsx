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

type ticketsType = {
  id: string,
  name: string,
  amount: number,
  quantity: number,
  createdAt: string,
}[]

// const tickets: ticketsType = [
//   {
//     id: '1',
//     name: 'Zero Play',
//     amount: 200,
//     quantity: 3,
//     createdAt: '2025-06-08 14:30:00'
//   },
//     {
//     id: '2',
//     name: 'Weekend Allowee',
//     amount: 2000,
//     quantity: 2,
//     createdAt: '2025-06-08 14:30:00'
//   },
//     {
//     id: '3',
//     name: 'Weekend Allowee',
//     amount: 300,
//     quantity: 1,
//     createdAt: '2025-06-08 14:30:00'
//   },
//     {
//     id: '4',
//     name: 'Weekend Allowee',
//     amount: 200,
//     quantity: 2,
//     createdAt: '2025-06-08 14:30:00'
//   },
//     {
//     id: '5',
//     name: 'Weekend Allowee',
//     amount: 200,
//     quantity: 2,
//     createdAt: '2025-06-08 14:30:00'
//   },
//     {
//     id: '6',
//     name: 'Weekend Allowee',
//     amount: 200,
//     quantity: 2,
//     createdAt: '2025-06-08 14:30:00'
//   }
// ]

export default function TicketsScreen() {

  const { theme } = useThemeStore();
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState<ticketsType[]>([])
  const [totalItems, setTotalItems] = useState(0)

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getTickets()
  }, [])

  const getTickets = async () => {
    setLoading(true)
    try {
      
      const result = await axiosClient.get(`/result/user-results?limit=${pageSize}&page=${page}`)   

      setTickets(result.data?.resultsResponse?.items || [])
      setTotalItems(result.data?.resultsResponse?.count || 0)
      console.log(result.data)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleModal = () => {
    setShowModal(true)
  }

  const renderTickets = ({item, index}: {item: any, index: number}) => (
    <TicketCard item={item} index={index} handlePress={() => handleModal()}/>
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
              keyExtractor={(item, index) => index.toString()}
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
          visible={showModal}
          statusBarTranslucent={true}
          onRequestClose={() => setShowModal(false)}>
            <View className="flex-1 justify-center items-center px-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              {/* TouchableWithoutFeedback only around the background */}
              <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                <View className="absolute top-0 left-0 right-0 bottom-0" />
              </TouchableWithoutFeedback>

              {/* Actual modal content */}
              <View className="rounded-2xl max-h-[60%] px-6 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                <FlatList
                  data={tickets}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={() => (
                    <View className='flex-row items-center justify-between mt-7'>
                      <Text className='font-msbold' style={{ color: theme.colors.text}}>Ticket#3</Text>
                      <Text className='font-msbold text-2xl' style={{color: theme.colors.text}}>:</Text>
                      <View className="rounded-full min-w-[30px] h-[30px] items-center justify-center px-[6px]" style={{backgroundColor: theme.colors.inputBg}}>
                        <Text className="text-base font-msbold" style={{color: theme.colors.text}}>0</Text>
                      </View>
                    </View>
                  )}
                  contentContainerStyle={{ paddingBottom: 28 }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
        </Modal>
      </ScrollView>
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}