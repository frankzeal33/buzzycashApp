import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const LuckyBoxScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [stake, setStake] = useState(10)

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
              <Feather name="chevron-left" size={34} color="#d2b48c" />
            </TouchableOpacity> 

            <View style={styles.logo}>
              <Text style={{ fontSize: 20 }}>🎁</Text>
            </View>
            <Text style={styles.title}>lucky box</Text>
          </View>

          <View style={styles.balanceBox}>
            <Text style={styles.small}>BALANCE</Text>
            <Text style={styles.gold}>1000</Text>
          </View>
        </View>

        {/* STAKE + MULTIPLIER */}
        <View style={styles.row}>
          <View style={styles.stakeBox}>
            <Text style={styles.stakeLabel}>stake</Text>
            <View style={styles.stakeValueBox}>
              <Text style={styles.stakeValue}>{stake}</Text>
            </View>
          </View>

          <View style={styles.multiplierBtn}>
            <Text style={styles.multiplierText}>2.5x</Text>
          </View>
        </View>

        {/* BOX OPTIONS */}
        <View style={styles.optionRow}>
          <TouchableOpacity style={styles.optionBtn}><Text>3 boxes</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn}><Text>5 boxes</Text></TouchableOpacity>
        </View>

        {/* BOXES */}
        <View style={styles.boxRow}>
          {[1,2,3].map((i) => (
            <TouchableOpacity key={i} style={styles.box}>
              <Text style={styles.boxEmoji}>🎁</Text>
              <View style={styles.boxNumber}><Text style={styles.boxNumberText}>{i}</Text></View>
            </TouchableOpacity>
          ))}
        </View>

        {/* PICK BAR */}
        <View style={styles.pickBar}>
          <Text style={styles.pickText}>🎁 pick a box</Text>
          <View style={styles.multiplierResult}>
            <Text style={styles.multiplierResultText}>0x</Text>
          </View>
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.openBtn}>
          <Text style={styles.openText}>✨ open new boxes</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={[styles.footer, { marginBottom: bottom }]}>
          <Text style={styles.footerText}>📋 last picks   🔊 sound on</Text>
          <Text style={styles.footerHint}>pick a box</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default LuckyBoxScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6c4bb8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  title: {
    color: '#e5dcff',
    fontSize: 20
  },

  balanceBox: {
    backgroundColor: '#2d214a',
    padding: 14,
    borderRadius: 20
  },

  small: {
    fontSize: 10,
    color: '#b9a7e6'
  },

  gold: {
    color: '#f6d98a',
    fontSize: 18,
    fontWeight: 'bold'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  stakeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d214a',
    padding: 10,
    borderRadius: 25
  },

  stakeLabel: {
    color: '#c7bff0',
    marginRight: 10
  },

  stakeValueBox: {
    backgroundColor: '#1a1230',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20
  },

  stakeValue: {
    color: '#f6d98a',
    fontWeight: 'bold'
  },

  multiplierBtn: {
    backgroundColor: '#b18cff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20
  },

  multiplierText: {
    fontWeight: 'bold',
    fontSize: 18
  },

  optionRow: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'flex-end'
  },

  optionBtn: {
    backgroundColor: '#6b56a5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20
  },

  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  box: {
    width: 110,
    height: 140,
    borderRadius: 25,
    backgroundColor: '#d2b48c',
    justifyContent: 'center',
    alignItems: 'center'
  },

  boxEmoji: {
    fontSize: 40
  },

  boxNumber: {
    marginTop: 10,
    backgroundColor: '#3b2b5a',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15
  },

  boxNumberText: {
    color: '#fff'
  },

  pickBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2d214a',
    padding: 20,
    borderRadius: 30
  },

  pickText: {
    color: '#e5dcff',
    fontSize: 18
  },

  multiplierResult: {
    backgroundColor: '#f6d98a',
    paddingHorizontal: 20,
    borderRadius: 20
  },

  multiplierResultText: {
    fontWeight: 'bold'
  },

  openBtn: {
    backgroundColor: '#5a4a7d',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center'
  },

  openText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  footer: {
    backgroundColor: '#2d214a',
    padding: 20,
    borderRadius: 30
  },

  footerText: {
    color: '#c7bff0'
  },

  footerHint: {
    marginTop: 10,
    color: '#b9a7e6',
    fontStyle: 'italic'
  }
})
