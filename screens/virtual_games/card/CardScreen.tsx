import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput
} from 'react-native'
import React, { useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Entypo, Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'

const CardScreen = () => {

  const { top, bottom } = useSafeAreaInsets()

  const [stake, setStake] = useState(10)
  const [card, setCard] = useState({ value: 7, suit: "♠" })
  const [streak, setStreak] = useState(0)
  const [bonus, setBonus] = useState(0)
  const [loading, setLoading] = useState(false)

  const scale = useSharedValue(1)
  const translateY = useSharedValue(0)
  const rotateY = useSharedValue(0)

  const animateCard = () => {
    // start smaller (stronger press)
    scale.value = 0.85
    translateY.value = 20

    // big pop out + bounce
    scale.value = withSpring(1, {
      damping: 5,
      stiffness: 150,
    }, () => {
      // settle back to normal
      scale.value = withSpring(1.1, {
        damping: 6,
        stiffness: 120,
      })
    })

    translateY.value = withSpring(-10, {
      damping: 5,
      stiffness: 150,
    }, () => {
      translateY.value = withSpring(0)
    })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 }, // important for 3D feel
        { rotateY: `${rotateY.value}deg` },
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    }
  })

  const handleNext = () => {
    if (loading) return

    animateCard()

    // flip OUT (to back)
    rotateY.value = withTiming(90, { duration: 150 }, () => {
      // switch card in middle of flip
      runOnJS(setCard)({ value: 7, suit: "♠" })

      // flip IN (back to front)
      rotateY.value = withTiming(0, { duration: 150 })
    })
  }

  const getSuitData = (input: string) => {
    const suit = input.toLowerCase()

    switch (suit) {
      case "spades":
      case "♠":
        return { symbol: "♠", color: "#1f2f38" }

      case "hearts":
      case "♥":
        return { symbol: "♥", color: "#c03939" }

      case "diamonds":
      case "♦":
        return { symbol: "♦", color: "#c03939" }

      case "clubs":
      case "♣":
        return { symbol: "♣", color: "#1f2f38" }

      default:
        return { symbol: input, color: "#000" }
    }
  }

  const handleGuess = async (guess: string) => {
    if (loading) return

    animateCard()

    try {
      setLoading(true)

      const res = await axiosClient.post("/virtual/pick-card", {
        guess, // "higher" or "lower"
        stake: Number(stake),
      })

      setTimeout(() => {
        const suitData = getSuitData(res.data.suits)

        setCard({
          value: res.data.data.next_card,
          suit: suitData.symbol, // adjust from API
        })

        setStreak(res.data.data.streak)
        setBonus(res.data.data.score)

        Toast.show({
          type: 'success',
          text1: res.data.message,
        })

        setLoading(false)
      }, 200)

    } catch (error: any) {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1:
          error?.response?.data?.message?.stake ||
          error?.response?.data?.message ||
          "Something went wrong",
      })
    }
  }

  const suit = getSuitData(card.suit)

  return (
    <LinearGradient
      colors={["#0f3b2e", "#06281f"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          gap: 20,
          padding: 12,
        }}
      >

        {/* HEADER */}
        <View style={{ marginTop: top, flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={34} color="#e6e1c5" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Image
                source={require('@/assets/images/cards/jack_of_spades.png')}
                style={{ width: 24, height: 24 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text style={styles.title}>Higher</Text>
              <Entypo name="arrow-long-up" size={18} color="#e6e1c5" />
              <Entypo name="arrow-long-down" size={18} color="#e6e1c5" />
              <Text style={styles.title}>Lower</Text>
            </View>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.row}>
          <View style={styles.controlPill}>
            <Text style={styles.controlLabel}>STAKE</Text>
            <View style={styles.counterRow}>
              <TextInput
                value={String(stake)}
                onChangeText={(text) => setStake(Number(text) || 1)}
                keyboardType="numeric"
                placeholder="Enter stake"
                placeholderTextColor="#9fb7a9"
                cursorColor="white"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius:16,
                  borderWidth: 1,
                  borderColor: "#caa85e",
                  padding: 8,
                  fontSize: 16,
                  flex: 1,
                  color: "#fff",
                  textAlign: "center"
                }}
              />
            </View>
          </View>

          <View style={styles.stats}>
            <View>
              <Text style={styles.statLabel}>STREAK</Text>
              <Text style={styles.statValue}>{streak}</Text>
            </View>

            <View>
              <Text style={styles.statLabel}>BONUS</Text>
              <Text style={styles.statValue}>{bonus}</Text>
            </View>
          </View>
        </View>

        {/* CARD FLIP */}
        <View style={{ alignItems: "center" }}>
          <View style={{ width: 200, height: 260 }}>
            <Animated.View style={[styles.card, animatedStyle]}>
              {loading ? (
                <ActivityIndicator size="large" color={suit.color} />
              ) : (
                <>
                  <Text style={[styles.cardNumber, { color: suit.color }]}>{card.value}</Text>
                  <Text style={[styles.cardSuit, { color: suit.color }]}>{card.suit}</Text>
                </>
              )}
            </Animated.View>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.greenBtn}
            disabled={loading}
            onPress={() => handleGuess("higher")}
          >
            <Text style={styles.btnText}><Entypo name="arrow-long-up" size={18} color="#e6e1c5" /> Higher</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.orangeBtn}
            disabled={loading}
            onPress={() => handleGuess("lower")}
          >
            <Text style={styles.btnText}><Entypo name="arrow-long-down" size={18} color="#e6e1c5" /> Lower</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBox}>
          {/* LEFT TEXT */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Entypo name="arrow-long-up" size={18} color="#2f8f4e" /> 
            <Text className='text-white text-lg'>or</Text> 
            <Entypo name="arrow-long-up" size={18} color="#c45a33" /> 
            <Text className='text-white text-lg'>?</Text> 
          </View>

          {/* RIGHT BUTTON */}
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>next <Entypo name="arrow-long-right" size={16} color="#0f3b2e" /> </Text>
          </TouchableOpacity>

        </View>

        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last results 🔊 sound on</Text>
          {/* <View style={{ flexDirection: 'row', gap: 10 }}>
            {lastRolls.map((r, i) => (
              <Text key={i}>{r.win ? '✅' : '❌'}</Text>
            ))}
          </View> */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}> 
            {loading ? ( <Text style={{ color: "#fff" }}>Playing...</Text> ) : (
              <Text className='text-[#9fb7a9] text-lg italic'> Make your first guess</Text> 
            )} 
          </View>
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

export default CardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d4af37",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#e6e1c5",
    fontSize: 20,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },

  controlPill: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 25,
    padding: 16
  },

  controlLabel: {
    fontSize: 12,
    color: "#9fb7a9",
    marginBottom: 6,
  },

  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6
  },

  stats: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent:'space-between',
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 25,
  },

  statLabel: {
    color: "#9fb7a9",
    fontSize: 12,
  },

  statValue: {
    color: "#e6d59b",
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    width: 200,
    height: 260,
    backgroundColor: "#e9e5dc",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  cardNumber: {
    fontSize: 90,
    fontWeight: "bold",
  },

  cardSuit: {
    fontSize: 50
  },

  actions: {
    flexDirection: "row",
    marginTop: 20,
  },

  greenBtn: {
    flex: 1,
    backgroundColor: "#2f8f4e",
    padding: 20,
    borderRadius: 40,
    marginRight: 10,
    alignItems: "center",
  },

  orangeBtn: {
    flex: 1,
    backgroundColor: "#c45a33",
    padding: 20,
    borderRadius: 40,
    marginLeft: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
  },

  bottomBox: {
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#caa85e",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    //  gradient-like feel
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  bottomText: {
    color: "#e6e1c5",
    fontSize: 18,
  },

  nextBtn: {
    backgroundColor: "#caa85e",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  nextText: {
    color: "#0f3b2e",
    fontSize: 18,
    fontWeight: "600",
  },

  /* LAST ROLLS */
  footer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    gap: 4,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#caa85e",
  },

  footerText: {
    color: "#e6d59b",
    fontSize: 16,
    marginBottom: 10,
  },
})