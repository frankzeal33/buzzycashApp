import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useThemeStore } from '@/store/ThemeStore'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'

const TransparentGameCard = ({
  item,
  index,
  loadingGame,
  currentGame,
  setLoadingGame,
  setCurrentGame
}: {
  item: any;
  index: number;
  loadingGame: boolean;
  currentGame: any;
  setLoadingGame: (val: boolean) => void;
  setCurrentGame: (game: any) => void;
}) => {

  const { theme } = useThemeStore();

  const goToGame = async (item: any) => {
    if (loadingGame) return;
    setCurrentGame(item);
    setLoadingGame(true);
    try {
      const result = await axiosClient.post("/virtual/start-game", {
        game_type: item.game_type,
      });
      router.push({
        pathname: "/(protected)/(routes)/ExternalVirtualGames",
        params: { gameLink: result.data?.data?.url },
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoadingGame(false);
    }
  };

  const isThisCardLoading = loadingGame && item.game_type === currentGame?.game_type;

  return (
    <Pressable
      onPress={() => goToGame(item)}
      disabled={loadingGame}
      className="w-[48%] h-44 relative rounded-lg border border-brown-500 overflow-hidden"
      style={{ backgroundColor: theme.colors.transparentBg, opacity: loadingGame && !isThisCardLoading ? 0.7 : 1 }}
    >
      <Image
        source={{ uri: item.banner }}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        contentFit="cover"
        cachePolicy="disk"
      />

      {/* Overlay footer */}
      <View className="w-full bg-brown-500/90 absolute bottom-0">
        {isThisCardLoading ? (
          <View className="my-3">
            <ActivityIndicator size="small" color={theme.colors.text} />
          </View>
        ) : (
          <Text
            className="text-center text-lg font-mbold px-2 py-3"
            style={{ color: theme.colors.text }}
            numberOfLines={3}
          >
            {item.game_type}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default TransparentGameCard
