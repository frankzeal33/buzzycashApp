import { View, Text, FlatList, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { data, images } from '@/constants'
import GameCard from '@/components/GameCard'
import { StatusBar } from 'expo-status-bar'
import Menu from '@/components/Menu'
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'
import { ticketGameType } from '@/types/types'

const PAGE_SIZE = 20;

const AllTicketScreen = () => {

   const { theme } = useThemeStore();
  const { top, bottom } = useSafeAreaInsets()
  const Bottom = bottom + 57;

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [games, setGames] = useState<ticketGameType[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAllTickets(1, true)
  }, [])

  const getAllTickets = async (pageNum: number, isInitial = false) => {
    if (isInitial) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const result = await axiosClient.get(`/tickets/all-games?limit=${PAGE_SIZE}&page=${pageNum}`)
      const newItems: ticketGameType[] = result.data?.games || []

      setGames(prev => isInitial ? newItems : [...prev, ...newItems])
      setHasMore(result.data?.has_more ?? false)
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
    getAllTickets(nextPage)
  }, [loadingMore, hasMore, page])

  const renderGames = ({ item, index }: { item: ticketGameType, index: number }) => (
    <GameCard item={item} index={index} handlePress={() => router.push({
      pathname: "/(protected)/(routes)/TicketDetails",
      params: { ticketData: JSON.stringify(item) },
    })}/>
  )

  const renderFooter = () => {
    if (!loadingMore) return null
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="large" color="#EF9439" />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={['left', 'right']} className='bg-blue flex-1'>
          <ImageBackground source={images.ticketBg} resizeMode="cover" className='flex-1' style={{paddingTop: top, paddingBottom: Bottom}}>
            <View className='flex-1 px-4'>
                <Header titleColor="#EF9439" title='Ticket Games' icon onpress={() => router.back()}/>
                {/* <View className='mt-2 mb-5 flex-row items-center justify-between gap-1'>
                    <View className='flex-row w-[60%]'>
                      <SearchInput placeholder="Search Games..." otherStyles='w-full'/>
                    </View>

                    <SelectDropdown
                      data={data.GameTime}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      renderButton={(selectedItem, isOpened) => {
                          return (
                          <View style={[styles.dropdownButtonStyle2, {backgroundColor: theme.colors.darkGray}]}>
                              <Text style={styles.dropdownButtonTxtStyle}>
                              {(selectedItem && selectedItem.title) || 'Time'}
                              </Text>
                              <Entypo name={isOpened ? 'chevron-small-up' : 'chevron-small-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#979797" />
                          </View>
                          );
                      }}
                      renderItem={(item, index, isSelected) => {
                          return (
                          <View key={index} style={{...styles.dropdownItemStyle,  backgroundColor: theme.colors.darkGray, ...(isSelected && {backgroundColor: '#C23525'})}}>
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
                </View> */}
                {loading ? (
                  <View className='mt-10'>
                    <ActivityIndicator size="large" color="#EF9439" />
                  </View>
                ) : (
                  <FlatList
                    data={games}
                    keyExtractor={(item, index) => item?.id}
                    renderItem={renderGames}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        games.length === 0
                        ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
                        : {paddingBottom: 100}
                    }
                    onEndReached={handleLoadMore}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={() => (
                      <View className='flex-1'>
                          <View className="w-full items-center mx-auto justify-center my-6 max-w-64 flex-1">
                            <Ionicons name="ticket-outline" size={30} color="#EF9439" className="mx-auto"/>
                            <Text className="text-2xl text-center text-brown-500 mt-4 font-rbold">No ticket games found.</Text>
                          </View>
                      </View>
                    )}
                  />
                )}
            </View>
            <Menu/>

          </ImageBackground>
        </SafeAreaView>
        <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

export default AllTicketScreen


const styles = StyleSheet.create({
  dropdownButtonStyle2: {
    width: "35%",
    height: 50,
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