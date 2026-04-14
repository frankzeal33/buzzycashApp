import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const RPSBetScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [stake, setStake] = useState(10)

  return (
    <LinearGradient
      colors={["#0b1d2e", "#071421"]}
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
              <Text style={styles.gold}>1000</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.small}>STREAK</Text>
              <Text style={styles.gold}>0</Text>
            </View>
          </View>
        </View>

        {/* STAKE */}
        <View style={styles.stakeContainer}>
          <Text style={styles.stakeLabel}>stake</Text>
          <View style={styles.stakeBox}>
            <Text style={styles.stakeValue}>{stake}</Text>
          </View>
        </View>

        {/* VS SECTION */}
        <View style={styles.vsContainer}>
          <View style={styles.playerBox}>
            <Text style={styles.playerLabel}>you</Text>
            <Text style={styles.emoji}>✋</Text>
          </View>

          <Text style={styles.vs}>VS</Text>

          <View style={styles.playerBox}>
            <Text style={styles.playerLabel}>AI</Text>
            <Text style={styles.emoji}>🤖</Text>
          </View>
        </View>

        {/* CHOICES */}
        <View style={styles.choices}>
          <TouchableOpacity style={styles.choiceBtn}><Text style={styles.choiceEmoji}>✊</Text></TouchableOpacity>
          <TouchableOpacity style={styles.choiceBtn}><Text style={styles.choiceEmoji}>📄</Text></TouchableOpacity>
          <TouchableOpacity style={styles.choiceBtn}><Text style={styles.choiceEmoji}>✂️</Text></TouchableOpacity>
        </View>

        {/* MULTIPLIER BAR */}
        <View style={styles.multiplierBar}>
          <Text style={styles.multiplierText}>choose your move</Text>
          <View style={styles.multiplierBox}>
            <Text style={styles.multiplierValue}>1.0x</Text>
          </View>
        </View>

        {/* PLAY AGAIN */}
        <TouchableOpacity style={[styles.playBtn, { marginBottom: bottom }]}>
          <Text style={styles.playText}>▶ play again</Text>
        </TouchableOpacity>
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
    backgroundColor: '#163447',
    paddingHorizontal: 25,
    paddingVertical: 10,
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
    width: 130
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
    borderRadius: 30
  },

  multiplierText: {
    color: '#9fb6c9'
  },

  multiplierBox: {
    backgroundColor: '#f5d27a',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20
  },

  multiplierValue: {
    color: '#0b1d2e',
    fontWeight: 'bold'
  },

  playBtn: {
    backgroundColor: '#254a63',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center'
  },

  playText: {
    color: '#0b1d2e',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
