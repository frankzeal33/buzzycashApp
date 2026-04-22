import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const RPSBetScreen = () => {
  const { top, bottom } = useSafeAreaInsets()

  const [stake, setStake] = useState(10)
  const [balance, setBalance] = useState(1000)
  const [streak, setStreak] = useState(0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [userChoice, setUserChoice] = useState("✋")
  const [aiChoice, setAiChoice] = useState("🤖")
  const [resultText, setResultText] = useState("choose your move")
  const [roundActive, setRoundActive] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  const choices = ["rock", "paper", "scissors"]

  const iconMap: any = {
    rock: "✊",
    paper: "📄",
    scissors: "✂️"
  }

  const getRandomChoice = () => {
    return choices[Math.floor(Math.random() * 3)]
  }

  const getResult = (user: string, ai: string) => {
    if (user === ai) return "draw"

    if (
      (user === "rock" && ai === "scissors") ||
      (user === "paper" && ai === "rock") ||
      (user === "scissors" && ai === "paper")
    ) return "win"

    return "lose"
  }

  const updateMultiplier = (streakValue: number) => {
    let m = 1.0

    if (streakValue >= 5) m = 2.5
    else if (streakValue >= 3) m = 1.8
    else if (streakValue >= 2) m = 1.3

    setMultiplier(m)
  }

  const handlePlay = (choice: string) => {
    if (roundActive) return

    if (stake > balance) {
      setResultText("❌ insufficient balance")
      return
    }

    const ai = getRandomChoice()

    setUserChoice(iconMap[choice])
    setAiChoice(iconMap[ai])

    const result = getResult(choice, ai)

    let newStreak = streak
    let newBalance = balance

    if (result === "win") {
      newStreak += 1
      const winAmount = Math.floor(stake * multiplier)
      newBalance += winAmount

      setResultText(`✅ WIN! +${winAmount}`)
      setHistory(prev => ["win", ...prev].slice(0, 10))
    }

    else if (result === "lose") {
      newStreak = 0
      newBalance -= stake

      setResultText(`❌ LOSS... -${stake}`)
      setHistory(prev => ["lose", ...prev].slice(0, 10))
    }

    else {
      setResultText(`🔄 DRAW · stake returned`)
      setHistory(prev => ["draw", ...prev].slice(0, 10))
    }

    setStreak(newStreak)
    updateMultiplier(newStreak)
    setBalance(newBalance)
    setRoundActive(true)
  }

  const resetGame = () => {
    setUserChoice("✋")
    setAiChoice("🤖")
    setResultText("choose your move")
    setRoundActive(false)
  }

  return (
    <LinearGradient colors={["#0b1d2e", "#071421"]} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", gap: 20, padding: 12 }}
      >

        {/* HEADER */}
        <View className='flex-row gap-2 justify-between items-center' style={{ marginTop: top }}>
          <View className='flex-row gap-1 items-center'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <Feather name="chevron-left" size={34} color="#f5d27a" />
            </TouchableOpacity>

            <View style={styles.logo}>
              <Text style={{ fontSize: 20 }}>✊</Text>
            </View>
            <Text style={styles.title}>rps bet</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.statBox}>
              <Text style={styles.small}>BALANCE</Text>
              <Text style={styles.gold}>{balance}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.small}>STREAK</Text>
              <Text style={styles.gold}>{streak}</Text>
            </View>
          </View>
        </View>

        {/* STAKE */}
        <View style={styles.stakeContainer}>
          <Text style={styles.stakeLabel}>stake</Text>
          <View style={styles.stakeBox}>
            <TextInput
              value={String(stake)}
              onChangeText={(text) => setStake(Number(text) || 1)}
              keyboardType="numeric"
              placeholder="Enter stake"
              placeholderTextColor="#9fb7a9"
              cursorColor="white"
              style={{
                backgroundColor: '#163447',
                borderRadius: 12,
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

        {/* VS */}
        <View style={styles.vsContainer}>
          <View style={styles.playerBox}>
            <Text style={styles.playerLabel}>you</Text>
            <Text style={styles.emoji}>{userChoice}</Text>
          </View>

          <Text style={styles.vs}>VS</Text>

          <View style={styles.playerBox}>
            <Text style={styles.playerLabel}>AI</Text>
            <Text style={styles.emoji}>{aiChoice}</Text>
          </View>
        </View>

        {/* CHOICES */}
        <View style={styles.choices}>
          <TouchableOpacity disabled={roundActive} style={styles.choiceBtn} onPress={() => handlePlay("rock")}>
            <Text style={styles.choiceEmoji}>✊</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={roundActive} style={styles.choiceBtn} onPress={() => handlePlay("paper")}>
            <Text style={styles.choiceEmoji}>📄</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={roundActive} style={styles.choiceBtn} onPress={() => handlePlay("scissors")}>
            <Text style={styles.choiceEmoji}>✂️</Text>
          </TouchableOpacity>
        </View>

        {/* MULTIPLIER */}
        <View style={styles.multiplierBar}>
          <Text style={styles.multiplierText}>{resultText}</Text>
          <View style={styles.multiplierBox}>
            <Text style={styles.multiplierValue}>{multiplier.toFixed(1)}x</Text>
          </View>
        </View>

        {/* PLAY AGAIN */}
        <TouchableOpacity
          disabled={!roundActive}
          style={[styles.playBtn, { marginBottom: bottom, opacity: roundActive ? 1 : 0.5 }]}
          onPress={resetGame}
        >
          <Text style={styles.playText}>▶ play again</Text>
        </TouchableOpacity>

        {/* FOOTER / HISTORY */}
        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last rolls 🔊 sound on</Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            {history.length === 0 ? (
              <Text className='text-[#9fb6c9] text-xl italic'>play a rounds</Text>
            ) : (
              history.map((h, i) => (
                <Text key={i}>
                  {h === "win" ? "✅" : h === "lose" ? "❌" : "🔄"}
                </Text>
              ))
            )}
          </View>
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

export default RPSBetScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2f6f88',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  title: {
    color: '#dce7f5',
    fontSize: 20,
  },

  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },

  statBox: {
    backgroundColor: '#163447',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },

  small: {
    fontSize: 10,
    color: '#9fb6c9'
  },

  gold: {
    color: '#f5d27a',
    fontSize: 16,
    fontWeight: 'bold'
  },

  stakeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10
  },

  stakeLabel: {
    color: '#9fb6c9',
    fontSize: 16
  },

  stakeBox: {
    width: 150,
    backgroundColor: '#163447',
    padding: 15,
    borderRadius: 20
  },

  stakeValue: {
    color: '#f5d27a',
    fontSize: 18,
    fontWeight: 'bold'
  },

  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  playerBox: {
    backgroundColor: '#163447',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    borderWidth: 1,
    borderColor: "#9fb6c9",
  },

  playerLabel: {
    color: '#9fb6c9',
    marginBottom: 10
  },

  emoji: {
    fontSize: 50
  },

  vs: {
    color: '#f5d27a',
    fontSize: 28,
    fontWeight: 'bold'
  },

  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  choiceBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#163447',
    justifyContent: 'center',
    alignItems: 'center'
  },

  choiceEmoji: {
    fontSize: 30
  },

  multiplierBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#163447',
    padding: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#9fb6c9",
  },

  multiplierText: {
    color: '#9fb6c9'
  },

  multiplierBox: {
    backgroundColor: '#f5d27a',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },

  multiplierValue: {
    color: '#0b1d2e',
    fontWeight: 'bold'
  },

  playBtn: {
    backgroundColor: '#358FCC',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center'
  },

  playText: {
    color: '#0b1d2e',
    fontSize: 20,
    fontWeight: 'bold'
  },

  footer: {
    gap: 4,
    backgroundColor: '#163447',
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#9fb6c9",
  },

  footerText: {
    color: "#e6e1c5",
    fontSize: 16,
    marginBottom: 10,
  }
})
