import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { data } from '@/constants'
import GameCard from '@/components/GameCard'



const games: any = [
    {
      id: "1",
      title: "Weekend Allawee",
      amount: 200,
      expiryTime: "2025-06-08 14:30:00"
    },
    {
      id: "1",
      title: "BuzzyBall 45",
      amount: 100,
      expiryTime: "2025-06-09 14:30:00"
    },
    {
      id: "1",
      title: "Daily ChopChop",
      amount: 1000,
      expiryTime: "2025-06-10 14:30:00"
    },
    {
      id: "1",
      title: "Oil Money",
      amount: 500,
      expiryTime: "2025-06-11 14:30:00"
    },
     {
      id: "1",
      title: "Weekend Allawee",
      amount: 200,
      expiryTime: "2025-06-08 14:30:00"
    },
    {
      id: "1",
      title: "BuzzyBall 45",
      amount: 100,
      expiryTime: "2025-06-09 14:30:00"
    },
    {
      id: "1",
      title: "Daily ChopChop",
      amount: 1000,
      expiryTime: "2025-06-10 14:30:00"
    },
    {
      id: "1",
      title: "Oil Money",
      amount: 500,
      expiryTime: "2025-06-11 14:30:00"
    },
     {
      id: "1",
      title: "Weekend Allawee",
      amount: 200,
      expiryTime: "2025-06-08 14:30:00"
    },
    {
      id: "1",
      title: "BuzzyBall 45",
      amount: 100,
      expiryTime: "2025-06-09 14:30:00"
    },
    {
      id: "1",
      title: "Daily ChopChop",
      amount: 1000,
      expiryTime: "2025-06-10 14:30:00"
    },
    {
      id: "1",
      title: "Oil Money",
      amount: 500,
      expiryTime: "2025-06-11 14:30:00"
    },
  ]

const AllTicketScreen = () => {

    const { top, bottom } = useSafeAreaInsets()

    const renderGames = ({item, index}: {item: any, index: number}) => (
        <GameCard item={item} index={index} handlePress={() => router.push({
            pathname: "/(protected)/(routes)/TicketDetails",
            params: { ticketData: JSON.stringify(item) },
        })}/>
    )

  return (
    <SafeAreaView className='h-full flex-1 bg-gray-100 px-4'>
        <Header title='All Games' icon onpress={() => router.back()}/>
        <View className="mb-2">
            <View className='bg-gray-100'>
                <View className='mt-2 mb-5 flex-row items-center justify-between gap-1'>
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
                        <View style={styles.dropdownButtonStyle2}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || 'Time'}
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
          <FlatList
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGames}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
            games.length === 0
                ? { flexGrow: 1, justifyContent: 'center', paddingBottom: bottom + 100, alignItems: 'center' }
                : {paddingBottom: bottom + 300}
            }
            ListEmptyComponent={() => (
                <View className='flex-1'>
                    <View className="w-full items-center mx-auto justify-center my-6 max-w-64 flex-1">
                        {/* <Image source={images.withdrawEmpty} className="mx-auto" resizeMode='contain'/> */}
                        <Text className="text-2xl text-center text-blue mt-4 font-rbold">You have no transactions yet.</Text>
                    </View>
                </View>
            )}
          />
        </View>
    </SafeAreaView>
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