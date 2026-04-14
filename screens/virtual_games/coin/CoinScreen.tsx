import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { images } from "@/constants";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated'
import { axiosClient } from "@/globalApi";

export default function CoinScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const [bet, setBet] = useState<'heads' | 'tails' | 'edge' | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [streak, setStreak] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [history, setHistory] = useState<string[]>([])
  const [face, setFace] = useState<'head' | 'tail' | 'edge'>('head')

  const spin = useSharedValue(0)

  const startSpin = () => {
    spin.value = 0

    spin.value = withRepeat(
      withTiming(360, {
        duration: 300,
        easing: Easing.linear,
      }),
      -1, // infinite loop
      false
    )

    // toggle face while spinning
    let current: 'head' | 'tail' = 'head'

    const interval = setInterval(() => {
      current = current === 'head' ? 'tail' : 'head'
      setFace(current)
    }, 150) // speed of flipping

    return interval
  }

  const stopSpin = () => {
    cancelAnimation(spin)
    spin.value = 0
  }

  const spinStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${spin.value}deg` },
      ],
    }
  })

  const updateMultiplier = (newStreak: number) => {
    if (newStreak >= 5) return 3
    if (newStreak >= 3) return 2
    return 1
  }

  const handleToss = async () => {
    if (!bet || loading) return

    let flipInterval: any

    try {
      setLoading(true)

      flipInterval = startSpin() // store interval

      const res = await axiosClient.post("/virtual/coin", {
        pick: bet,
        stake: 100
      })

      setTimeout(() => {
        stopSpin()
        clearInterval(flipInterval) // stop flipping

        const data = res.data
        setResult(data)

        // set final face from API
        if (data.result === 'head') setFace('head')
        if (data.result === 'tail') setFace('tail')

        if (data.win) {
          const newStreak = streak + 1
          setStreak(newStreak)
          setMultiplier(updateMultiplier(newStreak))
          setHistory(prev => ['win', ...prev.slice(0, 5)])
        } else {
          setStreak(0)
          setMultiplier(1)
          setHistory(prev => [
            data.result === 'edge' ? 'edge' : 'lose',
            ...prev.slice(0, 5),
          ])
        }

        setBet(null)
      }, 800)

    } catch (e) {
      stopSpin()
      if (flipInterval) clearInterval(flipInterval) // safety
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={["#0f3b2e", "#06281f"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", gap: 20, padding: 12 }}
      >
        {/* HEADER */}
        <View className='flex-row gap-2 justify-between items-center' style={{ marginTop: top }}>
          <View className='flex-row gap-1 items-center'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <Feather name="chevron-left" size={34} color="#d4af37" />
            </TouchableOpacity> 

            <View style={styles.logo}>
              <Image
                source={images.coin}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Text style={styles.title}>edge toss</Text>
          </View>

          <View style={styles.stats}>
            <View>
              <Text style={styles.statLabel}>STREAK</Text>
              <Text style={styles.statValue}>{streak}</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>MULTIPLIER</Text>
              <Text style={styles.statValue}>{multiplier}x</Text>
            </View>
          </View>
        </View>

        {/* COIN */}
        <View style={styles.coinWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToss}
            disabled={!bet || loading}
          >
            <Animated.View style={[styles.coinOuter, spinStyle]}>
              <View style={styles.coinInner}>
                {face === 'edge' && 
                  <Text style={{ fontSize: 200, color: "#caa85e" }}>
                    ⚡
                  </Text>
                }
                {face === 'head' && (
                  <Image
                    source={images.coin}
                    style={{ width: 200, height: 200 }}
                  />
                )}
                {face === 'tail' && 
                  <Image
                    source={images.coinTail}
                    style={{ width: 200, height: 200 }}
                  />
                }
              </View>
            </Animated.View>
          </TouchableOpacity>

          <Text style={styles.tapText}>tap coin to flip</Text>
        </View>

        {/* ACTION BOX */}
        <View style={styles.actionBox}>
          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.greenBtn}
              onPress={() => setBet('heads')}
              disabled={loading}
            >
              <Text style={styles.btnText}>🪙 heads</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.orangeBtn}
              onPress={() => setBet('tails')}
              disabled={loading}
            >
              <Text style={styles.btnText}>🪙 tails</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.edgeBtn}
            onPress={() => setBet('edge')}
            disabled={loading}
          >
            <Text style={styles.edgeText}>⚡ edge</Text>
          </TouchableOpacity>
        </View>

        {/* BET */}
        <View style={styles.betBox}>
          <Text style={styles.betText}>place your bet</Text>

          <View style={styles.betBadge}>
            <Text style={{ color: "#1c2b1f", fontWeight: "700" }}>1x</Text>
          </View>
        </View>

        {/* TOSS BUTTON */}
        <TouchableOpacity
          style={styles.tossBtn}
          onPress={handleToss}
          disabled={!bet || loading}
        >
          {loading ? (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <ActivityIndicator color="#000" />
              <Text style={{ fontSize: 18 }}>Rolling...</Text>
            </View>
          ) : (
            <Text style={{ fontSize: 18 }}>🎲 toss coin</Text>
          )}
        </TouchableOpacity>

        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last rolls 🔊 sound on</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* {lastRolls.map((r, i) => (
              <Text key={i}>{r.win ? '✅' : '❌'}</Text>
            ))} */}
          </View>
          <Text className='text-white text-xl italic'>place a bet & toss</Text>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d4af37",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  title: {
    color: "#e6e1c5",
    fontSize: 20,
  },

  stats: {
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "#caa85e",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  statLabel: {
    color: "#9fb7a9",
    fontSize: 10,
  },

  statValue: {
    color: "#e6d59b",
    fontSize: 16,
    fontWeight: "bold",
  },

  coinWrapper: {
    alignItems: "center",
  },

  coinOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#d4af37",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  coinInner: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  tapText: {
    marginTop: 20,
    color: "#c9c39c",
    fontSize: 16
  },

  actionBox: {
    borderWidth: 1,
    borderColor: "#caa85e",
    borderRadius: 30,
    padding: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  greenBtn: {
    flex: 1,
    backgroundColor: "#2f8f4e",
    padding: 16,
    borderRadius: 30,
    marginRight: 10,
    alignItems: "center",
  },

  orangeBtn: {
    flex: 1,
    backgroundColor: "#c45a33",
    padding: 16,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
  },

  edgeBtn: {
    marginTop: 20,
    backgroundColor: "#b8a34a",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    width: 180,
    marginHorizontal: "auto"
  },

  edgeText: {
    fontSize: 18,
    fontWeight: "600",
  },

  betBox: {
    borderWidth: 1,
    borderColor: "#caa85e",
    borderRadius: 30,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  betText: {
    color: "#e6e1c5",
    fontSize: 18,
  },

  betBadge: {
    backgroundColor: "#e2b95b",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  tossBtn: {
    backgroundColor: "#6b6a3b",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    width: 250,
    marginHorizontal: "auto"
  },

  footer: {
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#caa85e",
  },

  footerText: {
    color: "#e6e1c5",
    fontSize: 16,
    marginBottom: 10,
  },
});