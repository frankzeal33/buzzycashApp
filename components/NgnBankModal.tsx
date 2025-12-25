import { Modal, SafeAreaView, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, Pressable } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { StatusBar } from 'expo-status-bar';
import { axiosClient } from '@/globalApi';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import SearchInput from './SearchInput';
import Toast from 'react-native-toast-message';
import { useThemeStore } from '@/store/ThemeStore';

type bankType = {
    code: string; 
    logo: string; 
    name: string; 
}[]

const NgnBankModal = ({placeholder, header, showModal, close, selectedValue, title, handlePress, handleShowModal}: {placeholder: string; header: string; showModal: boolean; close: () => void; selectedValue: string; title: string; handlePress: (bank: any) => void, handleShowModal: () => void}) => {

    const { theme } = useThemeStore();
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<bankType>([])
    const [allBanks, setAllBanks] = useState<bankType>([])
    const [query, setQuery] = useState('');

    const data = async () => {
    
        setLoading(true)
    
        try {
            
            const result = await axiosClient.get("/withdrawal/list-banks")
    
            console.log("d", result.data?.data)
            setItems(result.data?.data)
            setAllBanks(result.data?.data)
    
    
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error.response.data.message
            });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        data()
    }, [])

    const filteredBanks = useMemo(() => {
        return query
            ? allBanks.filter(bank =>
                bank.name.toLowerCase().includes(query.toLowerCase()) ||
                bank.code.includes(query)
            )
            : allBanks;
    }, [query, allBanks]);

    useEffect(() => {
        setItems(filteredBanks);
    }, [filteredBanks]);

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: theme.colors.background}}>
        <View className='flex-1 items-center justify-center' style={{backgroundColor: theme.colors.background}}>
            <Modal animationType='slide' transparent={false} visible={showModal} onRequestClose={handleShowModal}>
                <SafeAreaView className='flex-1' style={{backgroundColor: theme.colors.background}}>
                    <View className='px-4 flex-1'>
                        <View className='flex-row items-center justify-between gap-2 py-2'>
                            <Text className='font-bold text-lg' style={{color: theme.colors.text}}>{header}</Text>
                            <TouchableOpacity onPress={() => close()}>
                                <Ionicons name="close" size={28} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>
                        {
                            loading ? (
                                <ActivityIndicator size="large" color={theme.colors.text}/>
                            ) : (
                                <View className='w-full flex-1'>
                                    <View className='w-full my-2'>
                                        <SearchInput value={query} handleChangeText={(text) => setQuery(text)} disabled={allBanks.length !== 0} placeholder="Search Banks..."/>
                                    </View>
                                    <FlatList
                                        nestedScrollEnabled={true}
                                        scrollEnabled={true}
                                        data={items}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item, index}) => (
                                            <TouchableOpacity key={index} onPress={() => handlePress(item)} className='my-3 flex-row items-center gap-2 w-full'>
                                                {item.logo ? (
                                                    <Image source={{ uri: item.logo }} style={{ width: 30, height: 30 }}/>
                                                ) : (
                                                    <FontAwesome name="bank" size={20} color={theme.colors.text} />
                                                )}
                                                <Text className='text-lg font-amedium' style={{color: theme.colors.text}}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{paddingBottom: 30}}
                                        ListEmptyComponent={() => (
                                            <View className='h-[70vh]'>
                                                <View className="w-full items-center mx-auto justify-center my-6 mt-16 max-w-60 flex-1">
                                                    <View className='flex items-center justify-center size-16 rounded-full bg-orangeLight'>
                                                        <Entypo name="list" size={32} color="#FF6600"/>
                                                    </View>
                                                    <Text className="text-xl text-cente mt-4 font-ablack" style={{color: theme.colors.text}}>{query ? "No Results Found" : "Something went wrong"}</Text>
                                                    <Text className="text-sm text-cente py-2 font-alight" style={{color: theme.colors.text}}>{query ? "Check your input" : "Please try again"}</Text>
                                                    {!query && (
                                                        <Pressable onPress={data}>
                                                            <SimpleLineIcons name="refresh" size={24} color={theme.colors.text} />
                                                        </Pressable>
                                                    )}
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>
                            )
                        }        
                    </View>
                </SafeAreaView>
            </Modal>
            <View style={{backgroundColor: theme.colors.darkGray}}>
                <Text className='text-lg font-msbold' style={{color: theme.colors.text }}>{title}</Text>
                <Pressable onPress={handleShowModal} className={`w-full h-16 px-4 rounded-md items-center justify-between flex-row gap-1`} style={{ backgroundColor: theme.colors.inputBg}}>
                    <View className='flex-1'>
                        <Text className='text-lg text-gray-500 font-mmedium' numberOfLines={1}>{selectedValue ? selectedValue : placeholder}</Text>
                    </View>
                    <Entypo name='chevron-small-down' size={30} color="#979797" />
                </Pressable>
            </View> 
        </View>
        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default NgnBankModal