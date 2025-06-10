import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image, FlatList, SectionList, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Octicons } from '@expo/vector-icons'
import displayCurrency from '@/utils/displayCurrency';
import moment from 'moment';
import Loading from '@/components/Loading';
import NotificationCard from '@/components/NotificationCard';

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
    title: 'Ongoing',
    data: [
      { id: '1', title: 'Hotpicks', endsIn: '1day 3hrs 30mins', time: 'Today @1:48pm' },
      { id: '2', title: 'Daily ChopChop', endsIn: '7hrs 20mins', time: 'Today @1:40pm' },
      { id: '3', title: 'Buzzy Balls', endsIn: '', time: 'Today @1:40pm' },
    ],
  },
  {
    title: 'Recent',
    data: [
      { id: '4', title: 'Hotpicks', amount: '2,500.00', status: 'You Won', time: 'Today @1:48pm', unread: true },
      { id: '5', title: 'Weekend Allowee', amount: '3,500.00', status: 'You Lost', time: 'Today @11:20am' },
      { id: '6', title: 'Buzzy Balls', amount: '2,000.00', status: 'You Won', time: 'Today @12:00pm', unread: true },
      { id: '7', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
      { id: '8', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
      { id: '9', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm',unread: true  },
      { id: '10', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
    ],
  },
];
  

const Games = () => {
    
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
              <View className="bg-white rounded-2xl max-h-[60%] px-6 w-full">
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className={`w-full py-6`}>
                    <Text className="font-mbold text-lg text-center mb-3">Won</Text>
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-start gap-2">
                        <View className='w-32'>
                            <Text className="font-msbold text-base capitalize" numberOfLines={1}>Lottery</Text>
                        </View>
                        <View className='items-end justify-end gap-2 flex-1'>
                            <Text className="font-msbold text-base">Weekend Allawee</Text>
                        </View>
                        </View>
                        <View className='border border-dashed border-brown-200 mt-4'/>
                    </View>
                    {/* {item?.winningBalls && ( */}
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-center gap-2">
                            <View className='w-32'>
                            <Text className="font-msbold text-base capitalize" numberOfLines={1}>Winning Balls</Text>
                            </View>
                            <View className='items-end justify-end gap-2 flex-1'>
                            <View className={`bg-gray-200 rounded-full min-w-[30px] h-[30px] items-center justify-center px-[6px]`}>
                                <Text className="text-base font-msbold">2</Text>
                            </View>
                            </View>
                        </View>
                        <View className='border border-dashed border-brown-200 mt-4'/>
                    </View>
                    {/* )} */}
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-start gap-2">
                        <View className='w-32'>
                            <Text className="font-msbold text-base capitalize" numberOfLines={1}>Price</Text>
                        </View>
                        <View className='items-end justify-end gap-2 flex-1'>
                            <Text className="font-semibold text-base">{displayCurrency(Number(0), 'NGN')}</Text>
                        </View>
                        </View>
                        <View className='border border-dashed border-brown-200 mt-4'/>
                    </View>
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-start gap-2">
                        <View className='w-32'>
                            <Text className="font-msbold text-base capitalize" numberOfLines={1}>Status</Text>
                        </View>
                        <View className='items-end justify-end gap-2 flex-1'>
                            <Text className={`font-msbold text-base capitalize text-green-600`}>Won</Text>
                        </View>
                        </View>
                        <View className='border border-dashed border-brown-200 mt-4'/>
                    </View>
                    <Text className='text-right font-mregular text-sm mt-3'>{moment(0).format('llll')}</Text>
                    </View>
                </ScrollView>
              </View>
            </View>
        </Modal>
    </View>
  )
}

export default Games