import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image, FlatList, SectionList, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Octicons } from '@expo/vector-icons'
import displayCurrency from '@/utils/displayCurrency';
import moment from 'moment';
import Loading from '@/components/Loading';
import NotificationCard from '@/components/NotificationCard';
import { useThemeStore } from '@/store/ThemeStore';

type NotificationItem = {
  id: string;
  title: string;
  time: string;
  endsIn?: string;
  amount?: string;
  status?: string;
  unread?: boolean;
};

type NotificationSection = {
  title: string;
  data: NotificationItem[];
};

const sections: NotificationSection[] = [
  {
    title: 'Today',
    data: [
      { id: '1', title: 'Hotpicks', endsIn: '1day 3hrs 30mins', time: 'Today @1:48pm' },
      { id: '2', title: 'Daily ChopChop', endsIn: '7hrs 20mins', time: 'Today @1:40pm' },
      { id: '3', title: 'Buzzy Balls', endsIn: '', time: 'Today @1:40pm' },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      { id: '4', title: 'Hotpicks', amount: '2,500.00', status: 'You Won', time: 'Today @1:48pm', unread: true },
      { id: '5', title: 'Weekend Allowee', amount: '3,500.00', status: 'You Lost', time: 'Today @11:20am' },
      { id: '6', title: 'Buzzy Balls', amount: '2,000.00', status: 'You Won', time: 'Today @12:00pm' },
      { id: '7', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' }
    ],
  },
  {
    title: '3days Ago',
    data: [
      { id: '8', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
      { id: '9', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
      { id: '10', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
    ],
  },
];
  

const Transactions = () => {
    
    const { theme } = useThemeStore();
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 4000)
    
        return () => clearTimeout(timer);
    }, []);

    const displayModal = () => {
        setShowModal(true)
    }

    const renderNotification = ({ item, section }: any) => {
        return (
            <NotificationCard item={item} section={section} handlePress={displayModal}/>
        );
    };

    const renderSectionHeader = ({ section: { title } }: any) => (
        <Text className="font-msbold text-lg py-2 bg-gray-100">{title}</Text>
    );

  return (
    <View className='flex-1 mt-2 px-4'>
        <View className='flex-1'>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <View className='flex-1'>
                        <SectionList
                            sections={sections}
                            keyExtractor={(item) => item.id}
                            renderItem={renderNotification}
                            renderSectionHeader={renderSectionHeader}
                            stickySectionHeadersEnabled
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <View className='flex-1'>
                                    <View className="w-full items-center mx-auto justify-center my-6 mt-16 max-w-64 flex-1">
                                        <View className='flex items-center justify-center size-16 rounded-full bg-green-lighter'>
                                            <Octicons name="bell-fill" size={32} color="#218225" />
                                        </View>
                                        <Text className="text-2xl text-center text-blue mt-4 font-rbold">No notifications yet</Text>
                                        <Text className="text-sm text-center text-blue mt-1 font-rlight">You don't have any games notification for now</Text>
                                    </View>
                                </View>
                            )}
                            contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
                        />
                    </View>
                    
                )
            }
        </View>  
        {sections.length > 0 && !loading &&(
            <View className="flex-row justify-between px-4 pb-2 pt-4">
                <TouchableOpacity>
                    <Text className="text-sm font-msbold">MARK AS READ</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className="text-sm font-msbold">CLEAR ALL</Text>
                </TouchableOpacity>
            </View>
        )}

        <Modal
            transparent={true}
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
    </View>
  )
}

export default Transactions