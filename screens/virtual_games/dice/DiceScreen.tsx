import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { axiosClient } from '@/globalApi'
import Toast from 'react-native-toast-message'
import { useAudioPlayer } from 'expo-audio';
import { triggerHaptic } from '@/utils/vibration'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated'
import { sounds } from '@/constants'

const Dice = ({ value }: { value: number }) => {
  const dots: Record<number, number[][]> = {
    1: [[1,1]],
    2: [[0,0],[2,2]],
    3: [[0,0],[1,1],[2,2]],
    4: [[0,0],[0,2],[2,0],[2,2]],
    5: [[0,0],[0,2],[1,1],[2,0],[2,2]],
    6: [[0,0],[0,1],[0,2],[2,0],[2,1],[2,2]],
  }

  return (
    <View style={styles.dice}>
      <View style={styles.diceGrid}>
        {[0,1,2].map(row =>
          [0,1,2].map(col => {
            const isActive = dots[value]?.some(
              ([r,c]) => r === row && c === col
            )

            return (
              <View
                key={`${row}-${col}`}
                style={[
                  styles.dot,
                  { opacity: isActive ? 1 : 0 }
                ]}
              />
            )
          })
        )}
      </View>
    </View>
  )
}

const DiceScreen = () => {
  const { top, bottom } = useSafeAreaInsets()

  const [stake, setStake] = useState(10)
  const [diceCount, setDiceCount] = useState(2)

  const [mode, setMode] = useState<'even' | 'high' | 'specific'>('even')
  const [choice, setChoice] = useState<any>('even')

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [lastRolls, setLastRolls] = useState<any[]>([])

  const [rolling, setRolling] = useState(false)
  const [animDice, setAnimDice] = useState<number[]>(
    Array.from({ length: diceCount }, () => 1)
  );

  const rollPlayer = useAudioPlayer(sounds.rollDice);
  const winPlayer = useAudioPlayer(sounds.winDice);
  const losePlayer = useAudioPlayer(sounds.rollDice);

  const shake = useSharedValue(0)

  const playSound = (type: 'roll' | 'win' | 'lose') => {
    if (type === 'roll') {
      rollPlayer.seekTo(0);
      rollPlayer.play();
    }

    if (type === 'win') {
      winPlayer.seekTo(0);
      winPlayer.play();
    }

    if (type === 'lose') {
      losePlayer.seekTo(0);
      losePlayer.play();
    }
  };

  const stopRollSound = () => {
    rollPlayer.pause()
    rollPlayer.seekTo(0)
    stopShake()
  }

  const startShake = () => {
    shake.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 60 }),
        withTiming(-1, { duration: 60 })
      ),
      -1, // infinite
      true
    )
  }

  const stopShake = () => {
    cancelAnimation(shake)
    shake.value = 0
  }

  const startRollingAnimation = () => {
    setRolling(true)

    const interval = setInterval(() => {
      setAnimDice(prev =>
        prev.map(() => Math.ceil(Math.random() * 6))
      )
    }, 500)

    return interval
  }

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: shake.value * 6 },
        { translateY: shake.value * 3 },
        { rotate: `${shake.value * 6}deg` },
      ],
    }
  })

  useEffect(() => {
    rollPlayer.loop = true;
    rollPlayer.volume = 0.5;
    winPlayer.volume = 0.35;
    losePlayer.volume = 0.3;
  }, []);

  useEffect(() => {
    setAnimDice(Array.from({ length: diceCount }, () => 1));
  }, [diceCount]);

  // 🎯 MULTIPLIER LOGIC
  const getMultiplier = () => {
    if (mode === 'even') return 1.5
    if (mode === 'high') return 1.5
    if (mode === 'specific') return 5
    return 1
  }

  // const getMultiplier = () => {
  //   if (mode === 'even') return 1.8
  //   if (mode === 'high') return 1.8

  //   if (mode === 'specific') {
  //     // harder to hit → higher multiplier
  //     const range = diceCount * 6 - diceCount + 1
  //     return Number((range / 6).toFixed(2))
  //   }

  //   return 1
  // }

  const getSpecificNumbers = () => {
    const min = diceCount
    const max = diceCount * 6

    return Array.from({ length: max - min + 1 }, (_, i) => i + min)
  }

  useEffect(() => {
    if (mode === 'specific') {
      setChoice(diceCount) // minimum value
    }
  }, [diceCount])

  // ROLL FUNCTION
  const handleRoll = async () => {
    if (!stake || stake <= 0) return alert("Enter valid stake")

    try {
      setLoading(true)
      setRolling(true) // ADD THIS

      const interval = startRollingAnimation() // start switching
      startShake()
      playSound('roll')
      triggerHaptic('roll')

      const res = await axiosClient.post("/virtual/dice", {
        bet_type:
          mode === 'even'
            ? choice
            : mode === 'high'
            ? choice
            : 'specific',
        guess: mode === 'specific' ? choice : 0,
        stake,
        dice: diceCount
      })

      setTimeout(() => {
        // STOP the rolling sound
        stopRollSound()
      }, 400)

      setTimeout(() => {
        clearInterval(interval) // STOP switching

        setResult(res.data)
        setRolling(false)

        if (res.data.win) { // FIX (use res, not result)
          triggerHaptic('win')
          playSound('win')
        } else {
          triggerHaptic('lose')
          playSound('lose')
        }
      }, 500)

    } catch (error: any) {
      setRolling(false)
      stopRollSound()
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || "Something went wrong"
      })
    } finally {
      setLoading(false)
    }
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
        <View style={[styles.header, { marginTop: top }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="chevron-left" size={30} color="#fff" />
            </TouchableOpacity>

            <View style={styles.logoCircle}>
              <Text>🎲</Text>
            </View>

            <Text style={styles.title}>dice streak</Text>
          </View>

          <View style={styles.balanceBox}> 
            <View> 
              <Text style={styles.smallLabel}>BALANCE</Text> 
              <Text style={styles.goldText}>1000</Text> 
            </View> 
            <View> 
              <Text style={styles.smallLabel}>STREAK</Text> 
              <Text style={styles.goldText}>0</Text> 
            </View> 
          </View>
        </View>

        {/* CONTROLS */}
        <View style={styles.row}>
          <View style={styles.controlPill}>
            <Text style={styles.controlLabel}>stake</Text>
            <View style={styles.counterRow}>
              <TextInput
                value={String(stake)}
                onChangeText={(text) => setStake(Number(text) || 1)}
                keyboardType="numeric"
                placeholder="Enter stake"
                placeholderTextColor="#9fb7a9"
                cursorColor="white"
                style={{
                  backgroundColor: "#0e2c40",
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

          <View style={styles.controlPill}>
            <Text style={styles.controlLabel}>dice</Text>
            <View style={styles.counterRow}>
              <TouchableOpacity onPress={() => setDiceCount(Math.max(1, diceCount - 1))}>
                <Text style={styles.counterBtn}>−</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{diceCount}</Text>
              <TouchableOpacity onPress={() => setDiceCount(Math.min(6, diceCount + 1))}>
                <Text style={styles.counterBtn}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* MODES */}
        <View style={styles.modeRow}>
          {['even', 'high', 'specific'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeBtn, mode === m && styles.activeMode]}
              onPress={() => {
                setMode(m as any)
                setChoice(m === 'even' ? 'even' : m === 'high' ? 'high' : 2)
              }}
            >
              <Text style={mode === m ? styles.activeModeText : styles.modeText}>
                {m === 'even' ? 'even/odd' : m === 'high' ? 'high/low' : 'specific'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DYNAMIC OPTIONS */}
        {mode === 'even' && (
          <View style={styles.choiceRow}>
            <TouchableOpacity
              style={[styles.choiceBtn, choice === 'even' && styles.activeChoice]}
              onPress={() => setChoice('even')}
            >
              <Text style={[styles.choiceText, choice === 'even' && styles.choiceActiveText]}>✅ EVEN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.choiceBtn, choice === 'odd' && styles.activeChoice]}
              onPress={() => setChoice('odd')}
            >
              <Text style={[styles.choiceText, choice === 'odd' && styles.choiceActiveText]}>🔴 ODD</Text>
            </TouchableOpacity>
          </View>
        )}

        {mode === 'high' && (
          <View style={styles.choiceRow}>
            <TouchableOpacity
              style={[styles.choiceBtn, choice === 'high' && styles.activeChoice]}
              onPress={() => setChoice('high')}
            >
              <Text style={[styles.choiceText, choice === 'high' && styles.choiceActiveText]}>⬆️ HIGH (&gt;6)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.choiceBtn, choice === 'low' && styles.activeChoice]}
              onPress={() => setChoice('low')}
            >
              <Text style={[styles.choiceText, choice === 'low' && styles.choiceActiveText]}>⬇️ LOW (≤6)</Text>
            </TouchableOpacity>
          </View>
        )}

        {mode === 'specific' && (
          <View style={styles.grid}>
            {getSpecificNumbers().map(num => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.circle,
                  choice === num && styles.activeCircle
                ]}
                onPress={() => setChoice(num)}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 20, width:"100%" }}>
          {Array.from({ length: diceCount }).map((_, i) => (
            <Animated.View key={i} style={rolling ? shakeStyle : undefined}>
              <Dice
                value={
                  rolling
                    ? animDice[i] || 1   // LIVE changing values
                    : (result?.rolled?.[i] || 1) // final result
                }
              />
            </Animated.View>
          ))}
        </View>

        {/* RESULT */}
        {result && (
          <View style={styles.resultBox}>
            <Text style={{ color: result.win ? "#4ade80" : "#ef4444", fontWeight: "bold" }}>
              {result.win ? "✅ WIN 🎉" : "❌ LOSE 🤕"}{" "}
              {result.win ? `+${Math.floor(stake * getMultiplier())}` : `-${stake}`}
            </Text>

            <Text style={{ color: "#c7d6df" }}>
              {getMultiplier()}x
            </Text>
          </View>
        )}

        {/* ROLL */}
        <TouchableOpacity style={styles.rollBtn} onPress={handleRoll} disabled={loading}>
          {loading ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <ActivityIndicator size="small" color="#0b1d26" />
              <Text style={styles.rollText}>ROLLING...</Text>
            </View>
          ) : (
            <Text style={styles.rollText}>🎲 ROLL DICE</Text>
          )}
        </TouchableOpacity>

        {/* LAST ROLLS */}
        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last rolls 🔊 sound on</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {lastRolls.map((r, i) => (
              <Text key={i}>{r.win ? '✅' : '❌'}</Text>
            ))}
          </View>
          <Text className='text-white text-xl italic'>roll the dice</Text>
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

export default DiceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1b4a5f",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },

  title: {
    color: "#dbe7ee",
    fontSize: 20,
    fontWeight: "600",
  },

  balanceBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  smallLabel: {
    fontSize: 10,
    color: "#7fa6b8",
  },

  goldText: {
    color: "#f6d98a",
    fontSize: 18,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  controlPill: {
    flex: 1,
    backgroundColor: "#173b4c",
    borderRadius: 30,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  controlLabel: {
    color: "#9fb7c3",
    marginBottom: 6,
  },

  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6
  },

  counterValue: {
    color: "#f6d98a",
    fontSize: 22,
    fontWeight: "bold",
  },

  counterBtn: {
    fontSize: 22,
    color: "#c7d6df",
  },

  /* MODE TABS */
  modeRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  modeBtn: {
    flex: 1,
    backgroundColor: "#173b4c",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },

  activeMode: {
    borderWidth: 2,
    borderColor: "#e3a843",
    backgroundColor: "#1f4d5f",
  },

  activeModeText: {
    color: "#f6d98a",
    fontWeight: "600",
  },

  modeText: {
    color: "#c7d6df",
  },

  /* CHOICE BUTTONS */
  choiceRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  choiceBtn: {
    flex: 1,
    paddingVertical: 18,
    fontWeight: "800",
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#173b4c",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  },

  activeChoice: {
    backgroundColor: "#e3a843",
  },

  choiceActiveText: {
    color: "#1b2a34",
    fontWeight: "800",
  },

  choiceText: {
    color: "#c7d6df",
  },

  /* SPECIFIC GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e6e1d9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  activeCircle: {
    backgroundColor: "#e3a843",
  },

  /* RESULT BOX */
  resultBox: {
    marginTop: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2f5668",
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  /* ROLL BUTTON */
  rollBtn: {
    marginTop: 10,
    backgroundColor: "#4fa3d1",
    padding: 20,
    borderRadius: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  rollText: {
    color: "#0b1d26",
    fontWeight: "bold",
    fontSize: 18,
  },

  /* LAST ROLLS */
  footer: {
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  footerText: {
    color: "#c7d6df",
    fontSize: 16,
    marginBottom: 10,
  },

  dice: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#e6d9c3",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },

  diceGrid: {
    width: "70%",
    height: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#000",
  },
})