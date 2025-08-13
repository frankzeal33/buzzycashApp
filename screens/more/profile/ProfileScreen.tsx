import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Header from '@/components/Header'
import { images } from '@/constants'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import ProfileBox from '@/components/ProfileBox'
import { useThemeStore } from '@/store/ThemeStore'
import { StatusBar } from 'expo-status-bar'
import { useProfileStore } from '@/store/ProfileStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'
import GradientButton from '@/components/GradientButton'
import FullScreenLoader from '@/components/FullScreenLoader'
import { Image as ExpoImage } from 'expo-image';

const ProfileScreen = () => {

  const { theme } = useThemeStore();
  const { userProfile, setProfile } = useProfileStore()
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];

      // Check file size
      const fileInfo = await FileSystem.getInfoAsync(selectedImage.uri);

      // Ensure file exists and has a size
      if (!fileInfo.exists || typeof fileInfo.size !== 'number') {
        Alert.alert("Error", "Could not retrieve file info.");
        return;
      }

      if (fileInfo.size > 8 * 1024 * 1024) {
        Alert.alert("File too large", "Image must be less than 5MB.");
        return;
      }

      // Check mime type or extension
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const isValidType = allowedTypes.includes(selectedImage.mimeType || '');

      // Fallback if mimeType is missing (use URI extension)
      const extension = selectedImage.uri.split('.').pop()?.toLowerCase();
      const isValidExtension = ['jpg', 'jpeg', 'png'].includes(extension || '');

      if (!isValidType && !isValidExtension) {
        Alert.alert("Invalid file type", "Only JPG, JPEG or PNG images are allowed.");
        return;
      }

      setFile(selectedImage)
      setShowModal(true)
    }
  };

   const uploadImage = async () => {
  
    if (!file) {
      return Toast.show({
        type: 'info',
        text1: "Select a profile picture",
        text2: "Choose a photo.",
      });
    }

    setShowModal(false)

    const formData = new FormData();

    formData.append('avatar', {
      uri: file.uri,
      type: file.mimeType,
      name: file.fileName || `profile_${Date.now()}.jpg`,
    } as any);

    setIsSubmitting(true)
    console.log("calling api")
    try {
      const response = await axiosClient.post('/uploads/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const user: any = {
        profilePicture: response.data.avatarUrl,
      }

      await AsyncStorage.mergeItem('userProfile', JSON.stringify(user));

      const recentProfile = await AsyncStorage.getItem('userProfile');
      const updatedProfile = recentProfile ? JSON.parse(recentProfile) : null;

      if (updatedProfile) {
        setProfile(updatedProfile);
      }

      setFile(null)

      Toast.show({
        type: 'success',
        text1: "Profile picture updated",
        text2: "Picture changed."
      });

      console.log(response.data)

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message || "Please try again later"
      });
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <SafeAreaView className='h-full flex-1 px-4' style={{ backgroundColor: theme.colors.background}}>
      <Header action='Edit' title='Profile' icon onpress={() => router.back()}/>
      <View className='flex-1 w-full'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=' mt-4 mb-8'>
            {!userProfile?.profilePicture ? (
              <View className='size-[70px] relative rounded-full border border-gray-200 z-10 mx-auto'>
                <Image source={images.user} width={70} height={70} resizeMode='cover' className='w-full h-full overflow-hidden'/>
                <TouchableOpacity activeOpacity={0.9} className='absolute -right-2 bottom-0' onPress={pickImage}>
                  <View className={`flex items-center justify-center size-8 rounded-full`} style={{ backgroundColor: theme.colors.darkGray }}>
                    <Entypo name="camera" size={14} color={theme.colors.text} />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View className='size-[70px] relative rounded-full border border-gray-200 z-10 mx-auto'>
                <ExpoImage source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_URI}${userProfile?.profilePicture}` }} placeholder={{ blurhash }} cachePolicy="disk" contentFit="cover" style={{ width: "100%", height: "100%", borderRadius: 35, overflow: 'hidden' }} />
                <TouchableOpacity activeOpacity={0.9} className='absolute -right-2 bottom-0' onPress={pickImage}>
                  <View className={`flex items-center justify-center size-8 rounded-full`} style={{ backgroundColor: theme.colors.darkGray }}>
                    <Entypo name="camera" size={14} color={theme.colors.text} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View className='gap-4 pb-14'>
            <ProfileBox label='Full Name' value={userProfile.fullName}/>
            <ProfileBox label='Username' value={userProfile.userName}/>
            <ProfileBox label='Email' value={userProfile.email}/>
            <ProfileBox label='Date of Birth' value={userProfile.dateOfBirth || "----------"}/>
            <ProfileBox label='Gender' value={userProfile.gender}/>
            <ProfileBox label='Phone Number' value={`+${userProfile.phoneNumber}`}/>
          </View>
        </ScrollView>
      </View>

       <Modal transparent={false} visible={showModal} onRequestClose={() => setShowModal(false)}>
        <SafeAreaView className='flex-1' style={{ backgroundColor: theme.colors.background }}>
            <View className='flex-1 w-full px-4'>
                <View className='flex-row items-center justify-between gap-2 py-2'>
                  <Text className='font-bold text-lg' style={{ color: theme.colors.text}}>Photo Preview</Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <Ionicons name="close" size={28} color={theme.colors.text} />
                  </TouchableOpacity>
                </View>
                <View className='flex-1 items-center justify-center'>
                  <View className='size-[270px] rounded-full border border-gray-200 relative'>
                    {file?.uri && <Image source={{ uri: file?.uri }} resizeMode='cover' className='w-full h-full rounded-full'/>}
                    <TouchableOpacity activeOpacity={0.9} className='absolute -right-1 bottom-2 z-50' onPress={pickImage}>
                      <View className={`flex items-center justify-center size-20 rounded-full absolute -right-2 bottom-2`} style={{ backgroundColor: theme.colors.darkGray }}>
                        <Entypo name="camera" size={38} color={theme.colors.text} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className='w-full justify-center my-6'>
                  <GradientButton title="Save & Close" handlePress={uploadImage} isLoading={isSubmitting} containerStyles="w-full mx-auto" textStyles='text-white'/>
                </View>      
            </View>
        </SafeAreaView>
    </Modal>

    <FullScreenLoader visible={isSubmitting} />
    <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.background}/>
    </SafeAreaView>
  )
}

export default ProfileScreen