import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
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
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'
import { transactionsType } from '@/types/types'
import Loading from '@/components/Loading'

const TransactionScreen = () => {

  const { theme } = useThemeStore();
  const [transactions, setTransactions] = useState<transactionsType[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(true)
  const [transactionInfo, setTransactionInfo] = useState<transactionsType | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [remark, setRemark] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)

  const [search, setSearch] = useState("")

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleModal = (item: transactionsType) => {
    setTransactionInfo(item)
    setShowModal(true)
  }

  const handleSearchChange = (text: string) => {
    console.log("Search text:", text) 
    setSearch(text)
    setPage(1)       // reset to first page
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      getTransactions()
    }, 500) // debounce for smoother search

    return () => clearTimeout(timeout)
  }, [page, remark, type, search])

  const getTransactions = async () => {
    setLoadingTransactions(true)
    try {
      let result

      if (search) {
        result = await axiosClient.get(`/transactions/search?search=${encodeURIComponent(search)}&limit=${pageSize}&page=${page}`)
      } else {
        let query = `/transactions/history?limit=${pageSize}&page=${page}`
        if (remark) query += `&payment_status=${remark}`
        if (type) query += `&payment_type=${type}`
        result = await axiosClient.get(query)
      }

      setTransactions(result.data.transactions || [])
      setTotalItems(result.data.total_count || 0)
      console.log(result.data)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    } finally {
      setLoadingTransactions(false)
    }
  }

  const renderTickets = ({item, index}: {item: any, index: number}) => (
    <TransactionCard item={item} index={index} handlePress={() => handleModal(item)}/>
  )

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{ backgroundColor: theme.colors.background}}>
      <Header title='Transaction History' icon onpress={() => router.back()}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
     
        <View className="mt-4 mb-2" style={{ backgroundColor: theme.colors.darkGray}}>
          <FlatList
            ListHeaderComponent={() => (
              <View style={{ backgroundColor: theme.colors.background}}>
                <View className='flex flex-row w-full'>
                  <SearchInput placeholder="Search Transactions..." value={search} handleChangeText={handleSearchChange} otherStyles='w-full'/>
                </View>
                <View className='my-3 flex-row items-center justify-between gap-1'>
                  
                  <SelectDropdown
                    data={data.transactionType}
                    defaultValue={data.transactionType.find(item => item.value === type) || null}
                    onSelect={(selectedItem, index) => {
                      setSearch("")
                      setType(selectedItem.value)
                      console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={[styles.dropdownButtonStyle2, {backgroundColor: theme.colors.darkGray}]}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || 'Type'}
                          </Text>
                          <Entypo name={isOpened ? 'chevron-small-up' : 'chevron-small-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#979797" />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View key={index} style={{...styles.dropdownItemStyle, backgroundColor: theme.colors.darkGray, ...(isSelected && {backgroundColor: '#EF9439'})}}>
                          <Text style={[styles.dropdownItemTxtStyle, {color: theme.colors.text}]}>{item.title}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={{
                      backgroundColor: theme.colors.darkGray,
                      borderRadius: 8,
                    }}
                  />

                  <SelectDropdown
                    data={data.transactionRemark}
                    defaultValue={data.transactionRemark.find(item => item.value === remark) || null}
                    onSelect={(selectedItem, index) => {
                      setSearch("")
                      setRemark(selectedItem.value)
                      console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={[styles.dropdownButtonStyle1, {backgroundColor: theme.colors.darkGray}]}>
                          <Text style={styles.dropdownButtonTxtStyle} numberOfLines={1}>
                            {(selectedItem && selectedItem.title) || 'Remark'}
                          </Text>
                          <Entypo name={isOpened ? 'chevron-small-up' : 'chevron-small-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#979797" />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View key={index} style={{...styles.dropdownItemStyle, backgroundColor: theme.colors.darkGray, ...(isSelected && {backgroundColor: '#EF9439'})}}>
                          <Text style={[styles.dropdownItemTxtStyle, {color: theme.colors.text}]}>{item.title}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={{
                      backgroundColor: theme.colors.darkGray,
                      borderRadius: 8,
                    }}
                  />
                </View>
              </View>
            )}
            data={loadingTransactions ? [] : transactions}
            keyExtractor={(item, index) => item.id}
            renderItem={renderTickets}
            scrollEnabled={false}
            ListEmptyComponent={!loadingTransactions ? (
              <View className="items-center justify-center py-44">
                <Text className="text-xl text-center font-msbold" style={{ color: theme.colors.text}}>{search ? "No result found!" : "No Tickets yet!"}</Text>
                <Text className="text-sm text-center mt-1 font-mlight" style={{ color: theme.colors.text}}>
                  All your transaction history will show here.
                </Text>
              </View>
            ) : null}
            ListFooterComponent={
              loadingTransactions ? (
                <View className="items-center justify-center py-44">
                  <Loading/>
                </View>
              ) : null
            }
          />
        </View>

        {transactions.length > 0 && totalItems > pageSize && !loadingTransactions && (
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
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Amount</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{displayCurrency(Number(transactionInfo?.amount))}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Status</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className={`text-base font-mmedium flex-1 ${transactionInfo?.payment_status === "SUCCESSFUL" ? "text-green-500" : transactionInfo?.payment_status === "FAILED" ? "text-red-500" : "text-yellow-500"}`}>{transactionInfo?.payment_status}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Category</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{transactionInfo?.category}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Type</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className={`text-base font-mmedium flex-1 ${transactionInfo?.transaction_type === "CREDIT" ? "text-green-500" : transactionInfo?.transaction_type === "DEBIT" ? "text-red-500" : "text-orange-500"}`}>{transactionInfo?.transaction_type}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                      <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Txn No</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                      </View>
                      <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{transactionInfo?.transaction_reference}</Text>
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
    fontSize: 16,
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