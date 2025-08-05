import { View, Text, Modal, TouchableWithoutFeedback, Pressable } from 'react-native'
import React from 'react'
import GradientText from './GradientText'
import GradientButton from './GradientButton'
import { useThemeStore } from '@/store/ThemeStore'

interface ModalProps {
  title: string
  buttonTitle: string
  buttonPress: () => void
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  loading?: boolean
}

const OnboardModal = ({ title, buttonTitle, buttonPress, visible, onClose, loading, children }: ModalProps) => {

  const { theme } = useThemeStore();

  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        {/* TouchableWithoutFeedback only around the background */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute top-0 left-0 right-0 bottom-0" />
        </TouchableWithoutFeedback>

        {/* Actual modal content */}
        <View className="bg-blue rounded-xl items-center px-5 py-8 w-full">
          <GradientText text={title} style={{ fontSize: 24, fontWeight: 'bold' }} />
          {children}
          <GradientButton
            isLoading={loading}
            title={buttonTitle}
            handlePress={buttonPress}
            containerStyles="w-[70%] mx-auto"
            textStyles="text-white"
          />
        </View>
      </View>
    </Modal>
  )
}

export default OnboardModal
