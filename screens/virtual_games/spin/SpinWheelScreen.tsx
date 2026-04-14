import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const SpinWheelScreen = () => {
  const { top, bottom } = useSafeAreaInsets()
  const [stake, setStake] = useState(10)

  return (
    <LinearGradient
      colors={["#0c2036", "#071827"]}
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
              <Feather name="chevron-left" size={34} color="#fff" />
            </TouchableOpacity> 

            <View style={styles.logo}>
              <Text style={{ fontSize: 22 }}>🎡</Text>
            </View>

            <Text style={styles.title}>Spin wheel</Text>
          </View>

          <View style={styles.balanceBox}>
            <Text style={styles.small}>BALANCE</Text>
            <Text style={styles.gold}>1000</Text>
          </View>
        </View>

        {/* STAKE + HELP */}
        <View style={styles.row}>
          <View style={styles.stakeBox}>
            <Text style={styles.stakeLabel}>stake</Text>
            <View style={styles.stakeValueBox}>
              <Text style={styles.stakeValue}>{stake}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.helpBtn}>
            <Text style={styles.helpText}>?</Text>
          </TouchableOpacity>
        </View>

        {/* WHEEL */}
        <View style={styles.wheelWrapper}>
          <View style={styles.pointer} />
          <View style={styles.wheelOuter}>
            <View style={styles.wheelInner} />
          </View>
        </View>

        {/* SPIN BAR */}
        <View style={styles.spinBar}>
          <Text style={styles.spinText}>⬆️ spin the wheel</Text>
          <View style={styles.multiplierBox}>
            <Text style={styles.multiplierText}>0x</Text>
          </View>
        </View>

        {/* MAIN BUTTON */}
        <TouchableOpacity style={[styles.spinBtn, { marginBottom: bottom }]}>
          <Text style={styles.spinBtnText}>🎡 LONG SPIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  )
}

export default SpinWheelScreen

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
    backgroundColor: '#2e5f8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  title: {
    color: '#dbe7f5',
    fontSize: 20
  },

  balanceBox: {
    backgroundColor: '#2a4a68',
    padding: 14,
    borderRadius: 10
  },

  small: {
    fontSize: 10,
    color: '#9fb6c9'
  },

  gold: {
    color: '#f3d27a',
    fontSize: 16,
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
    backgroundColor: '#2a4a68',
    padding: 10,
    borderRadius: 25
  },

  stakeLabel: {
    color: '#c7d6e6',
    marginRight: 10
  },

  stakeValueBox: {
    backgroundColor: '#102a44',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20
  },

  stakeValue: {
    color: '#f3d27a',
    fontWeight: 'bold'
  },

  helpBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3b75f',
    justifyContent: 'center',
    alignItems: 'center'
  },

  helpText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  wheelWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#e53935',
    marginBottom: -40,
    zIndex: 2
  },

  wheelOuter: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#3b5d7a',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12
  },

  wheelInner: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#d9cfbf'
  },

  spinBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a4a68',
    padding: 20,
    borderRadius: 30
  },

  spinText: {
    color: '#dbe7f5',
    fontSize: 18
  },

  multiplierBox: {
    backgroundColor: '#e3b75f',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20
  },

  multiplierText: {
    fontWeight: 'bold'
  },

  spinBtn: {
    backgroundColor: '#5f92c2',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center'
  },

  spinBtnText: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})
