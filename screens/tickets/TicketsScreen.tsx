import Header from '@/components/Header'
import TicketCard from '@/components/TicketCard'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FlatList, Modal, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pagination from '@cherry-soft/react-native-basic-pagination';
import Loading from '@/components/Loading'
import { router } from 'expo-router'

type ticketsType = {
  id: string,
  name: string,
  amount: number,
  quantity: number,
  createdAt: string,
}[]

const tickets: ticketsType = [
  {
    id: '1',
    name: 'Zero Play',
    amount: 200,
    quantity: 3,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '2',
    name: 'Weekend Allowee',
    amount: 2000,
    quantity: 2,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '3',
    name: 'Weekend Allowee',
    amount: 300,
    quantity: 1,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '4',
    name: 'Weekend Allowee',
    amount: 200,
    quantity: 2,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '5',
    name: 'Weekend Allowee',
    amount: 200,
    quantity: 2,
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: '6',
    name: 'Weekend Allowee',
    amount: 200,
    quantity: 2,
    createdAt: '2025-06-08 14:30:00'
  }
]

export default function TicketsScreen() {

  const [showModal, setShowModal] = useState(false)
   const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    }, 4000)
  })

  const handleModal = () => {
    setShowModal(true)
  }

  const renderTickets = ({item, index}: {item: any, index: number}) => (
    <TicketCard item={item} index={index} handlePress={() => handleModal()}/>
  )

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 bg-gray-100 px-4'>
      <Header title='Purchased Tickets' icon onpress={() => router.back()}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
     
        {loading ? (
          <View className="bg-white my-4 py-52">
            <Loading/>
          </View>
        ) : (
          <View className="bg-white my-4">
            <FlatList
              data={tickets}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderTickets}
              scrollEnabled={false}
              ListEmptyComponent={() => (  
                <View className="items-center justify-center py-52">
                  <Text className="text-xl text-center font-msbold">No Tickets yet!</Text>
                  <Text className="text-sm text-center mt-1 font-mlight">
                    All your purchased tickets will show here.
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        {tickets.length > 0 && !loading && (
          <View className="mb-6">
            <Pagination
              totalItems={100}
              pageSize={5}
              currentPage={page}
              onPageChange={setPage}
              showLastPagesButtons
              btnStyle={{ backgroundColor: '#ffffff', borderWidth: 0, borderRadius: 5 }}
              textStyle={{ color: "#DF7844" }}
              activeBtnStyle={{ backgroundColor: '#DF7844' }}
              activeTextStyle={{ color: '#ffffff' }}
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
              <View className="bg-white rounded-2xl max-h-[60%] px-6 w-full">
                <FlatList
                  data={tickets}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={() => (
                    <View className='flex-row items-center justify-between mt-7'>
                      <Text className='font-msbold'>Ticket#3</Text>
                      <Text className='font-msbold text-2xl'>:</Text>
                      <View className="bg-gray-200 rounded-full min-w-[30px] h-[30px] items-center justify-center px-[6px]">
                        <Text className="text-base font-msbold">0</Text>
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
      <StatusBar backgroundColor="#E9E9E9" style='dark'/>
    </SafeAreaView>
  )
}