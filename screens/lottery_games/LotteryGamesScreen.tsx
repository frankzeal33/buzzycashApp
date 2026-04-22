import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

const LotteryGamesScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [stake, setStake] = useState(10)

    const numbers = Array.from({ length: 40 }, (_, i) => i + 1);
    const [numbersSelected, setNumbersSelected] = useState<number[]>([]);

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
            <Text style={styles.title}>Lottery</Text>
          </View>
        </View>

        {/* RANGE INFO */}
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
                  backgroundColor: "rgba(255,255,255,0.05)",
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

          <View style={styles.rangeInfo}>
            <View>
              <Text style={styles.label}>PICKED</Text>
              <Text style={styles.gold}>{numbersSelected?.length}</Text>
            </View>
            <View>
              <Text style={styles.label}>MULTIPLIER</Text>
              <Text style={styles.gold}>2.0x</Text>
            </View>
          </View>
        </View>

        <View className='gap-2 px-4'>
            {numbersSelected.length <= 0 && (
                <Text className='font-msbold text-white'>Pick 5 numbers</Text>
            )}
            {numbersSelected.length > 0 && (
                <View className='flex-row items-center justify-between'>
                    <Text className='font-msbold text-white'>Numbers picked</Text>
                    <TouchableOpacity onPress={clear}>
                        <Text className='font-msbold text-red-500'>Clear</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View className='flex-row gap-1 flex-wrap items-center'>
                {numbersSelected.map((num, index) => (
                    <View
                        key={num}
                        style={styles.pickedCircle}
                    >
                        <Text style={styles.circleText}>{num}</Text>
                    </View>
                ))}
            </View>
        </View>

        {/* NUMBER GRID */}
        <View style={styles.gridBox}>
          <View style={styles.grid}>
            {numbers.map((num) => {
              const picked = numbersSelected.includes(num)
              return (
                <TouchableOpacity
                  key={num}
                  style={[styles.circle, picked && styles.activeCircle]}
                  onPress={() => addNumber(num)}
                >
                  <Text style={styles.circleText}>{num}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* PICK BOX */}
        <View style={styles.pickBox}>
          <Text style={styles.pickText}>🔥 pick 5 numbers</Text>
          <View style={styles.multiplierPill}>
            <Text style={styles.multiplierText}>
              2.0x
            </Text>
          </View>
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.playBtn}>
          <Text style={styles.playText}>▶ Play</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last rolls 🔊 sound on</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* {lastRolls.map((r, i) => (
              <Text key={i}>{r.win ? '✅' : '❌'}</Text>
            ))} */}
          </View>
          <Text className='text-white text-xl italic'>place a lottery</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default LotteryGamesScreen

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

  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "stretch",
  },

  controlPill: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
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

  rangeInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 16,
    borderRadius: 25,
    gap: 10,
  },

  label: {
    color: "#7fa6b8",
    fontSize: 12,
  },

  gold: {
    color: "#f6d98a",
    fontSize: 22,
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
    padding: 20
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },

  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e6e3da",
    justifyContent: "center",
    alignItems: "center",

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

  pickedCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e6e3da",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
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
    gap: 4,
    backgroundColor: '#163447',
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#2f5668",
  },

  footerText: {
    color: "#e6e1c5",
    fontSize: 16,
    marginBottom: 10,
  }
})