import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const ranges = [
  { label: "1-10", max: 10, multiplier: "2.0x" },
  { label: "1-20", max: 20, multiplier: "1.5x" },
  { label: "1-30", max: 30, multiplier: "1.2x" },
]

const HotColdScreen = () => {
  const { top, bottom } = useSafeAreaInsets()

  const [selectedRange, setSelectedRange] = useState(ranges[0])
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)

  const numbers = Array.from({ length: selectedRange.max }, (_, i) => i + 1)

  return (
    <LinearGradient
      colors={["#0b2a3a", "#061c26"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", gap: 20, padding: 12 }}
      >
        {/* HEADER */}
        <View className='flex-row items-center gap-1' style={{ marginTop: top }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
            <Feather name="chevron-left" size={34} color="#e6e1c5" />
          </TouchableOpacity>
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={{ fontSize: 18 }}>🔢</Text>
            </View>
            <Text style={styles.title}>hot/cold guess</Text>
          </View>
        </View>

        {/* RANGE INFO */}
        <View style={styles.rangeInfo}>
          <View>
            <Text style={styles.label}>RANGE</Text>
            <Text style={styles.gold}>{selectedRange.label}</Text>
          </View>
          <View>
            <Text style={styles.label}>MULTIPLIER</Text>
            <Text style={styles.gold}>{selectedRange.multiplier}</Text>
          </View>
        </View>

        {/* RANGE SELECT */}
        <View style={styles.rangeRow}>
          {ranges.map((r) => {
            const active = r.label === selectedRange.label
            return (
              <TouchableOpacity
                key={r.label}
                style={[styles.rangeBtn, active && styles.activeRange]}
                onPress={() => {
                  setSelectedRange(r)
                  setSelectedNumber(null)
                }}
              >
                <Text style={active ? styles.activeText : styles.rangeText}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* NUMBER GRID */}
        <View style={styles.gridBox}>
          <View style={styles.grid}>
            {numbers.map((num) => {
              const active = num === selectedNumber
              return (
                <TouchableOpacity
                  key={num}
                  style={[styles.circle, active && styles.activeCircle]}
                  onPress={() => setSelectedNumber(num)}
                >
                  <Text style={styles.circleText}>{num}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* PICK BOX */}
        <View style={styles.pickBox}>
          <Text style={styles.pickText}>🔥 pick a number</Text>
          <View style={styles.multiplierPill}>
            <Text style={styles.multiplierText}>
              {selectedRange.multiplier}
            </Text>
          </View>
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.playBtn}>
          <Text style={styles.playText}>🎯 guess & reveal</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last results   🔊 sound on</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default HotColdScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#12394a",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#dbe7ee",
    fontSize: 20,
    fontWeight: "600",
  },

  rangeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 30,
  },

  label: {
    color: "#7fa6b8",
    fontSize: 12,
  },

  gold: {
    color: "#f6d98a",
    fontSize: 28,
    fontWeight: "bold",
  },

  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  rangeBtn: {
    flex: 1,
    backgroundColor: "#173b4c",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
  },

  activeRange: {
    borderWidth: 2,
    borderColor: "#e3a843",
  },

  rangeText: {
    color: "#c7d6df",
  },

  activeText: {
    color: "#f6d98a",
    fontWeight: "bold",
  },

  gridBox: {
    backgroundColor: "#173b4c",
    borderRadius: 30,
    padding: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  circle: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#e6e3da",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  activeCircle: {
    backgroundColor: "#e3a843",
  },

  circleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b2a34",
  },

  pickBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2f5668",
    padding: 18,
  },

  pickText: {
    color: "#c7d6df",
    fontSize: 16,
  },

  multiplierPill: {
    backgroundColor: "#e3a843",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  multiplierText: {
    color: "#1b2a34",
    fontWeight: "bold",
  },

  playBtn: {
    backgroundColor: "#2a5163",
    padding: 20,
    borderRadius: 40,
    alignItems: "center",
  },

  playText: {
    color: "#0b1d26",
    fontSize: 20,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 10,
  },

  footerText: {
    color: "#c7d6df",
  },
})