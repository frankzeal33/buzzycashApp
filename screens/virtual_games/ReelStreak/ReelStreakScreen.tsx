import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const ReelStreakScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [bet, setBet] = useState(10)

  return (
    <LinearGradient
      colors={["#1a0f2b", "#0d061a"]}
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
              <Feather name="chevron-left" size={34} color="#f6d98a" />
            </TouchableOpacity> 

            <View style={styles.logo}>
              <Text style={{ fontSize: 18 }}>🎰</Text>
            </View>

            <Text style={styles.title}>reel streak</Text>
          </View>

          <View style={styles.topStats}>
            <View>
              <Text style={styles.small}>RTP</Text>
              <Text style={styles.gold}>96.5%</Text>
            </View>
            <View>
              <Text style={styles.small}>CREDITS</Text>
              <Text style={styles.gold}>1000</Text>
            </View>
          </View>
        </View>

        {/* REEL BOX */}
        <View style={styles.reelBox}>
          <View style={styles.reels}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.reel}>
                <Text style={styles.reelEmoji}>🍒</Text>
              </View>
            ))}
          </View>

          <Text style={styles.pullText}>✨ pull the lever ✨</Text>
        </View>

        {/* BET + SPIN */}
        <View style={styles.betRow}>
          <View style={styles.betBox}>
            <Text style={styles.betLabel}>bet</Text>
            <View style={styles.betValueBox}>
              <Text style={styles.betValue}>{bet}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.spinBtn}>
            <Text style={styles.spinText}>🎲 SPIN</Text>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={styles.stats}>
          <View>
            <Text style={styles.small}>STREAK</Text>
            <Text style={styles.gold}>0</Text>
          </View>
          <View>
            <Text style={styles.small}>BONUS</Text>
            <Text style={styles.gold}>0</Text>
          </View>
          <View>
            <Text style={styles.small}>LAST WIN</Text>
            <Text style={styles.gold}>0</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last spins   🔊 sound fx</Text>

          <View style={styles.cancelBtn}>
            <Text style={{ color: "red", fontSize: 24 }}>✖</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default ReelStreakScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6f4bb8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },

  title: {
    color: "#e5dcff",
    fontSize: 20,
  },

  topStats: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 12,
    borderRadius: 20,
  },

  small: {
    fontSize: 10,
    color: "#b9a7e6",
  },

  gold: {
    color: "#f6d98a",
    fontSize: 16,
    fontWeight: "bold",
  },

  reelBox: {
    backgroundColor: "#2a1d44",
    borderRadius: 30,
    padding: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12,
  },

  reels: {
    flexDirection: "row",
    gap: 15,
  },

  reel: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#eae7df",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },

  reelEmoji: {
    fontSize: 40,
  },

  pullText: {
    marginTop: 15,
    color: "#f6d98a",
    fontSize: 18,
  },

  betRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  betBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  betLabel: {
    color: "#c7bff0",
    fontSize: 18,
  },

  betValueBox: {
    backgroundColor: "#4c3575",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  betValue: {
    color: "#f6d98a",
    fontSize: 20,
    fontWeight: "bold",
  },

  spinBtn: {
    backgroundColor: "#a88be0",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },

  spinText: {
    color: "#1b1030",
    fontSize: 20,
    fontWeight: "bold",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2a1d44",
    padding: 20,
    borderRadius: 30,
  },

  footer: {
    backgroundColor: "#2a1d44",
    borderRadius: 30,
    padding: 20,
  },

  footerText: {
    color: "#c7bff0",
  },

  cancelBtn: {
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3a2a5a",
    justifyContent: "center",
    alignItems: "center",
  },
})