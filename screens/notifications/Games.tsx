import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image, FlatList, SectionList, Modal, TouchableWithoutFeedback } from 'react-native'
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

// const sections: NotificationSection[] = [
//   {
//     title: 'Ongoing',
//     data: [
//       { id: '1', title: 'Hotpicks', endsIn: '1day 3hrs 30mins', time: 'Today @1:48pm' },
//       { id: '2', title: 'Daily ChopChop', endsIn: '7hrs 20mins', time: 'Today @1:40pm' },
//       { id: '3', title: 'Buzzy Balls', endsIn: '', time: 'Today @1:40pm' },
//     ],
//   },
//   {
//     title: 'Recent',
//     data: [
//       { id: '4', title: 'Hotpicks', amount: '2,500.00', status: 'You Won', time: 'Today @1:48pm', unread: true },
//       { id: '5', title: 'Weekend Allowee', amount: '3,500.00', status: 'You Lost', time: 'Today @11:20am' },
//       { id: '6', title: 'Buzzy Balls', amount: '2,000.00', status: 'You Won', time: 'Today @12:00pm', unread: true },
//       { id: '7', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
//       { id: '8', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
//       { id: '9', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm',unread: true  },
//       { id: '10', title: 'Daily ChopChop', amount: '5,000.00', status: 'You Won', time: 'Today @1:40pm' },
//     ],
//   },
// ];

const Games = () => {
    
    const { theme } = useThemeStore();
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [games, setGames] = useState<NotificationSection[]>([])
    const [totalItems, setTotalItems] = useState(0)

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        getGames()
    }, [])

    const getGames = async () => {
        setLoading(true)
        try {
           const result = await axiosClient.get(`/notification?notiType=games&limit=${pageSize}&page=${page}`)
            setGames(result.data.notifications || [])
            setTotalItems(result.data.total_count || 0)
            console.log(result.data)
        } catch (error: any) {
            console.log(error.response?.data || error.message)
        } finally {
         setLoading(false)
        }
    }

    // transform API data into sections
    const sections: NotificationSection[] = useMemo(() => {
        if (!Array.isArray(games) || games.length === 0) {
            return [];
        }

        const ongoing = games
            .filter((n) => n?.status === "pending")
            .map((n, index) => ({
            id: String(index),
            title: n?.title?.trim() || "", // ensure string
            amount: displayCurrency(Number(n?.amount || 0), n?.currency || "NGN"),
            status: n?.status ?? "unknown",
            time: n?.display_time ?? "",
            unread: false,
            }));

        const recent = games
            .filter((n) => n?.status !== "pending")
            .map((n, index) => ({
            id: String(index + 1000),
            title: n?.title?.trim() || "Untitled", // 👈 fallback for empty
            amount: displayCurrency(Number(n?.amount || 0), n?.currency || "NGN"),
            status: n?.status ?? "unknown",
            time: n?.display_time ?? "",
            unread: true,
            }));

        return [
            ...(ongoing.length > 0
            ? [{ title: "Ongoing", data: ongoing }]
            : []), // 👈 hide if empty
            ...(recent.length > 0
            ? [{ title: "Recent", data: recent }]
            : []),
        ];
        }, [games]);

    const displayModal = () => {
        setShowModal(true)
    }
    
    const renderNotification = ({ item, section }: any) => {
        return (
            <NotificationCard item={item} section={section} handlePress={displayModal}/>
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
                                        <Text className="text-sm text-center mt-1 font-rlight" style={{ color: theme.colors.text}}>You don't have any games notification for now</Text>
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
                    <Text className="text-sm font-msbold" style={{ color: theme.colors.text}}>MARK AS READ</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className="text-sm font-msbold" style={{ color: theme.colors.text}}>CLEAR ALL</Text>
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
              <View className="rounded-2xl max-h-[60%] px-6 w-full" style={{backgroundColor: theme.colors.darkGray}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className={`w-full py-6`}>
                    <Text className="font-mbold text-lg text-center mb-3" style={{ color: theme.colors.text}}>Won</Text>
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-start gap-2">
                            <View className='w-32'>
                                <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Lottery</Text>
                            </View>
                            <View className='items-end justify-end gap-2 flex-1'>
                                <Text className="font-msbold text-base" style={{ color: theme.colors.text}}>Weekend Allawee</Text>
                            </View>
                        </View>
                    </View>
                    {/* {item?.winningBalls && ( */}
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-center gap-2">
                            <View className='w-32'>
                            <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Winning Balls</Text>
                            </View>
                            <View className='items-end justify-end gap-2 flex-1'>
                            <View className={`rounded-full min-w-[30px] h-[30px] items-center justify-center px-[6px]`} style={{ backgroundColor: theme.colors.inputBg}}>
                                <Text className="text-base font-msbold" style={{ color: theme.colors.text}}>2</Text>
                            </View>
                            </View>
                        </View>
                    </View>
                    {/* )} */}
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-start gap-2">
                        <View className='w-32'>
                            <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Price</Text>
                        </View>
                        <View className='items-end justify-end gap-2 flex-1'>
                            <Text className="font-semibold text-base" style={{ color: theme.colors.text}}>{displayCurrency(Number(0), 'NGN')}</Text>
                        </View>
                        </View>
                    </View>
                    <View className='w-full mt-2'>
                        <View className="flex-1 justify-between w-full flex-row items-start gap-2">
                        <View className='w-32'>
                            <Text className="font-msbold text-base capitalize" numberOfLines={1} style={{ color: theme.colors.text}}>Status</Text>
                        </View>
                        <View className='items-end justify-end gap-2 flex-1'>
                            <Text className={`font-msbold text-base capitalize text-green-600`}>Won</Text>
                        </View>
                        </View>
                    </View>
                    <Text className='text-right font-mregular text-sm mt-3' style={{ color: theme.colors.text}}>{moment(0).format('llll')}</Text>
                    </View>
                </ScrollView>
              </View>
            </View>
        </Modal>
    </View>
  )
}

export default Games