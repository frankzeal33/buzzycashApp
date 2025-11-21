import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image, FlatList, SectionList, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Octicons } from '@expo/vector-icons'
import displayCurrency from '@/utils/displayCurrency';
import moment from 'moment';
import Loading from '@/components/Loading';
import NotificationCard from '@/components/NotificationCard';
import { useThemeStore } from '@/store/ThemeStore';
import { axiosClient } from '@/globalApi';

type NotificationItem = {
  id: string;
  amount: number; 
  created_at: string;
  currency: string; 
  display_time: string;
  status: string;
  subtitle: string;
  title: string;
  unread?: boolean;
};

type NotificationSection = {
  title: string;
  data: NotificationItem[];
}; 

const Transactions = () => {
    
    const { theme } = useThemeStore();
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [transactions, setTransaction] = useState<NotificationSection[]>([])
    const [totalItems, setTotalItems] = useState(0)
    const [readStatus, setReadStatus] = useState(true)
    const [notificationInfo, setNotificationInfo] = useState<NotificationItem | null>(null)

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        getByTransactions()
    }, [])

    const getByTransactions = async () => {
        setLoading(true)
        try {
           const result = await axiosClient.get(`/notification?type=transactions&limit=${pageSize}&page=${page}`)
            setTransaction(result.data.notifications || [])
            setTotalItems(result.data.total_count || 0)
            console.log("trnoti=", result.data)
        } catch (error: any) {
            console.log(error.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    const sections: NotificationSection[] = useMemo(() => {
        if (!Array.isArray(transactions) || transactions.length === 0) return [];

        // Group by month (e.g. "September 2025")
        const grouped: Record<string, any[]> = {};

        transactions.forEach((n: any, index) => {
            const dateKey = moment(n.created_at).format("MMMM YYYY"); // e.g., "September 2025"

            if (!grouped[dateKey]) grouped[dateKey] = [];

            grouped[dateKey].push({
                id: n?.id,
                title: n?.title?.trim() || "Untitled",
                subtitle: n?.subtitle?.trim() || "Untitled",
                amount: n?.amount,
                status: n?.status || "",
                time: moment(n.created_at).format("MMM D, hh:mma"), // e.g., "Sep 18, 11:49am"
            });
        });

        return Object.keys(grouped).map((key) => ({
            title: key,
            data: grouped[key],
        }));
    }, [transactions]);

    const markAsRead = async () => {
        try {
           const result = await axiosClient.patch(`/notification/read-all?type=transactions`)
           setReadStatus(false)

            console.log("trnoti=", result.data)
        } catch (error: any) {
            console.log(error.response?.data || error.message)
        }
    }

    const displayModal = (item: NotificationItem) => {
        setNotificationInfo(item)
        setShowModal(true)

        axiosClient.patch(`/notification/${item?.id}/read`)

    }

    const renderNotification = ({ item, section }: any) => {
        return (
            <NotificationCard item={item} section={section} handlePress={() =>displayModal(item)}/>
        );
    };

    const renderSectionHeader = ({ section: { title } }: any) => (
        <Text className="font-msbold text-lg py-2" style={{ backgroundColor: theme.colors.background, color: theme.colors.text}}>{title}</Text>
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
                                            <Octicons name="bell-fill" size={32} color={theme.colors.text} />
                                        </View>
                                        <Text className="text-2xl text-center mt-4 font-rbold" style={{ color: theme.colors.text}}>No notifications yet</Text>
                                        <Text className="text-sm text-center mt-1 font-rlight" style={{ color: theme.colors.text}}>You don't have any transactions notification for now</Text>
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
                {readStatus ? (
                    <TouchableOpacity onPress={markAsRead}>
                        <Text className="text-sm font-msbold" style={{ color: theme.colors.text}}>MARK AS READ</Text>
                    </TouchableOpacity>
                ) : (
                    <Text className="text-sm font-msbold" style={{ color: theme.colors.text}}>MARKED AS READ</Text>
                )}
                {/* <TouchableOpacity>
                    <Text className="text-sm font-msbold" style={{ color: theme.colors.text}}>CLEAR ALL</Text>
                </TouchableOpacity> */}
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
                <View className="rounded-2xl max-h-[60%] px-4 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='my-7 gap-5'>
                    <View className='flex-row items-start justify-between gap-3'>
                        <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Amount</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                        </View>
                        <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{displayCurrency(Number(notificationInfo?.amount))}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                        <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Title</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                        </View>
                        <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{notificationInfo?.title}</Text>
                    </View>
                    <View className='flex-row items-start justify-between gap-3'>
                        <View className='flex-row gap-2 items-center justify-between w-36'>
                        <Text className='font-msbold text-lg' style={{ color: theme.colors.text}}>Subtitle</Text>
                        <Text className='font-msbold text-xl' style={{ color: theme.colors.text}}>:</Text>
                        </View>
                        <Text className="text-base font-mmedium flex-1" style={{ color: theme.colors.text}}>{notificationInfo?.subtitle}</Text>
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