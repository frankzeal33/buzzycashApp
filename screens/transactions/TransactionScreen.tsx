import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { FlatList, Modal, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pagination from '@cherry-soft/react-native-basic-pagination';
import TransactionCard from '@/components/TransactionCard'
import displayCurrency from '@/utils/displayCurrency'
import { data } from '@/constants'
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from 'react-native'
import SearchInput from '@/components/SearchInput'
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router'

type transactionsType = {
  id: string,
  name: string,
  amount: number,
  balance: number,
  paymentStatus: string,
  createdAt: string,
}[]

const transactions: transactionsType = [
  {
    id: 'US2VDJ4I3RI',
    name: 'Price Money',
    amount: 200,
    balance: 30000,
    paymentStatus: "SUCCESSFUL",
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: 'US2VDJ4I3RI',
    name: 'Ticket Purchase',
    amount: 2000,
    balance: 30000,
    paymentStatus: "SUCCESSFUL",
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: 'US2VDJ4I3RI',
    name: 'Deposit',
    amount: 300,
    balance: 30000,
    paymentStatus: "FAILED",
    createdAt: '2025-06-08 14:30:00'
  },
    {
    id: 'US2VDJ4I3RI',
    name: 'Cashout',
    amount: 200,
    balance: 30000,
    paymentStatus: "PENDING",
    createdAt: '2025-06-08 14:30:00'
  },
  {
    id: 'US2VDJ4I3RI',
    name: 'Ticket Purchase',
    amount: 200,
    balance: 30000,
    paymentStatus: "SUCCESSFUL",
    createdAt: '2025-06-08 14:30:00'
  },
]

const TransactionScreen = () => {

  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1);

  const handleModal = () => {
    setShowModal(true)
  }

  const renderTickets = ({item, index}: {item: any, index: number}) => (
    <TransactionCard item={item} index={index} handlePress={() => handleModal()}/>
  )

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1 bg-gray-100 px-4'>
      <Header title='Transaction History' icon onpress={() => router.back()}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
     
        <View className="bg-white mt-4 mb-2">
          <FlatList
            ListHeaderComponent={() => (
              <View className='bg-gray-100'>
                <View className='flex flex-row w-full'>
                  <SearchInput placeholder="Search Transactions..." otherStyles='w-full'/>
                </View>
                <View className='my-3 flex-row items-center justify-between gap-1'>
                  
                  <SelectDropdown
                    data={data.transactionType}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle2}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || 'Type'}
                          </Text>
                          <Entypo name={isOpened ? 'chevron-small-up' : 'chevron-small-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#979797" />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View key={index} style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#E4FFE5'})}}>
                          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />

                  <SelectDropdown
                    data={data.transactionRemark}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle1}>
                          <Text style={styles.dropdownButtonTxtStyle} numberOfLines={1}>
                            {(selectedItem && selectedItem.title) || 'Remark'}
                          </Text>
                          <Entypo name={isOpened ? 'chevron-small-up' : 'chevron-small-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#979797" />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View key={index} style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#E4FFE5'})}}>
                          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                </View>
              </View>
            )}
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTickets}
            scrollEnabled={false}
            ListEmptyComponent={() => (  
              <View className="items-center justify-center py-44">
                <Text className="text-xl text-center font-msbold">No Tickets yet!</Text>
                <Text className="text-sm text-center mt-1 font-mlight">
                  All your purchased tickets will show here.
                </Text>
              </View>
            )}
          />
        </View>

        {transactions.length > 0 && (
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
              <View className="bg-white rounded-2xl max-h-[60%] px-4 w-full">
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className='my-7 gap-5'>
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg'>Amount</Text>
                        <Text className='font-msbold text-xl'>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1">{displayCurrency(Number(0), 'NGN')}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg'>Post Balance</Text>
                        <Text className='font-msbold text-xl'>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1">{displayCurrency(Number(100), 'NGN')}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg'>Details</Text>
                        <Text className='font-msbold text-xl'>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1">Debit for purchased ticket</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
        </Modal>
      </ScrollView>
      <StatusBar backgroundColor="#E9E9E9" style='dark'/>
    </SafeAreaView>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({
  dropdownButtonStyle1: {
    width: "55%",
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonStyle2: {
    width: "40%",
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: '#979797',
    fontFamily: "Montserrat-Medium",
  },
  dropdownButtonArrowStyle: {
    fontSize: 30,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
    fontFamily: "Raleway-Medium",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});