import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'

const VirtualGameCard = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {

  const { theme } = useThemeStore();

  return (
    <Pressable
      onPress={() => router.push("/(onboarding)/LogIn")}
      className="w-40 h-36 relative rounded-lg overflow-hidden"
      style={{ backgroundColor: theme.colors.transparentBg}}
    >
      <Image
        source={{ uri: item.banner }}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        contentFit="cover"
        cachePolicy="disk"
      />

      {/* Overlay footer */}
      <View className="w-full bg-brown-500 absolute bottom-0">
        <Text
          className="text-center text-lg font-mmedium px-2 py-1"
          style={{ color: theme.colors.darkGray }}
          numberOfLines={3}
        >
          {item.game_type}
        </Text>
      </View>
    </Pressable>
  );
}

export default VirtualGameCard
