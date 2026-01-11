import { FlatList, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import GradientButton from '@/components/GradientButton'
import { StatusBar } from 'expo-status-bar'
import { useThemeStore } from '@/store/ThemeStore'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useProfileStore } from '@/store/ProfileStore'
import FullScreenLoader from '@/components/FullScreenLoader'
import Toast from 'react-native-toast-message'


const Lottery = () => {
    
    const { theme } = useThemeStore();
    const numbers = Array.from({ length: 40 }, (_, i) => i + 1);
    const indicator = Array.from({ length: 5 }, (_, i) => i + 1);
    const [numbersSelected, setNumbersSelected] = useState<number[]>([4,30,21]);

    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const addNumber = (item: number) => {
        setNumbersSelected(prev => {
            // If already selected → remove (no error)
            if (prev.includes(item)) {
                return prev.filter(n => n !== item);
            }

            // If not selected and limit reached → show error
            if (prev.length === 5) {
                Toast.show({
                    type: 'error',
                    text1: 'Maximum numbers reached',
                    text2: 'You can only pick up to 5 numbers',
                });
                return prev;
            }

            // Otherwise → add number
            return [...prev, item];
        });
    };

    const clear = () => {
        setNumbersSelected([])
    }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='h-full flex-1' style={{backgroundColor: theme.colors.background}}>
        <View className='px-4'>
            <Header title='Lottery Game' icon onpress={() => router.back()}/>
        </View>

        <View className='w-full mt-4 flex-1' style={{backgroundColor: theme.colors.darkGray}}>
            <FlatList
              data={numbers}
              keyExtractor={(item, index) => index.toString()}
              numColumns={6}
              columnWrapperStyle={{gap: 10, paddingHorizontal: 16}}
              contentContainerStyle={{gap: 20, paddingTop: 16, paddingBottom: 30}}
              ListHeaderComponent={() => 
                <View className='flex-row gap-2 items-center px-4'>
                    <Text className='font-msbold' style={{ color: theme.colors.text}}>Pick 5 numbers</Text>
                    <View className="flex-row gap-1 items-center">
                        {indicator.map((_, index) => {

                            const isActive = index < numbersSelected.length;

                        return (
                            <View
                            key={index}
                            className={`size-3 rounded-full ${
                                isActive
                                ? 'bg-brown-500 border-brown-500'
                                : 'border border-gray-400'
                            }`}
                            />
                        );
                        })}
                    </View>
                </View>
              }
              renderItem={({ item }) => (
                <Pressable className={`p-2 items-center flex-1 rounded-md ${numbersSelected.includes(item) ? 'bg-brown-500' : 'bg-gray-100' }`} onPress={() => addNumber(item)}>
                  <Text className='font-abold text-center text-base leading-4 mt-1' numberOfLines={3}>{item}</Text>
                </Pressable>
              )}
              ListFooterComponent={() => 
                <View>
                    <View className='gap-2 px-4'>
                        <Text className='font-msbold' style={{ color: theme.colors.text}}>Numbers picked</Text>
                        <View className='flex-row gap-1 items-center'>
                            {numbersSelected.length === 0 ? (
                                <Text className='text-base' style={{ color: theme.colors.text}}>Click on each number to select</Text>
                            ) : (
                                numbersSelected.map((item, index) => (   
                                    <View key={index} className='size-12 items-center justify-center rounded-full border border-gray-400'>
                                        <Text style={{ color: theme.colors.text}}>{item}</Text>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>
                    <View className='flex-row gap-6 items-center px-4 py-8 my-6' style={{backgroundColor: theme.colors.background}}>
                        <Pressable onPress={clear}>
                            <Ionicons name="trash-outline" size={26} color={theme.colors.text} />
                        </Pressable>
                        <GradientButton
                            title="Play"
                            handlePress={() => router.push("/(onboarding)/LogIn")}
                            containerStyles="flex-1"
                            textStyles="text-white"
                        />
                        <Feather name="refresh-cw" size={24} color={theme.colors.text} />
                    </View>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
        </View>

        <FullScreenLoader visible={isSubmitting} />
        <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default Lottery