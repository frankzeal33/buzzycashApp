import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StickyHeaderScrollView, useStickyHeaderScrollProps } from 'react-native-sticky-parallax-header';

const PARALLAX_HEIGHT = 330;
const SNAP_START_THRESHOLD = 10;
const SNAP_STOP_THRESHOLD = 330;

const HomeScreen = () => {

  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className='flex-1 bg-gray-100'>
      <View className='flex-1 px-4'>
        
        <StickyHeaderScrollView
          ref={scrollViewRef}
          containerStyle={{ flex: 1 }}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          renderHeader={() => (
            <View pointerEvents="box-none" style={{ height: scrollHeight }}>
              {/* balance */}
              <View>
                
              </View>

              {/* Promo Banner */}
              <View style={{ backgroundColor: '#FFA500', marginTop: 16, padding: 16, borderRadius: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Turn your gameplay into a gateway to big rewards</Text>
                <Button title="Play Now" onPress={() => {}} />
              </View>

              {/* Featured Games */}
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>Featured Games</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ marginRight: 12, width: 120, height: 120, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                  <Text>Spin 2 Win</Text>
                </View>
                <View style={{ marginRight: 12, width: 120, height: 120, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                  <Text>Trivia Game</Text>
                </View>
              </ScrollView>

              {/* Live Feed */}
              <Text style={{ marginTop: 16, fontSize: 14, color: 'gray' }}>+234****490 just won ₦5,000.00 - 33mins ago</Text>
            </View>
          )}

          renderTabs={() => (
            <View style={{ paddingHorizontal: 16 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
          )}

          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View>
            <Text>More content here...</Text>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <View style={{ backgroundColor: '#000933', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Weekend Allowee</Text>
                <Text style={{ color: '#fff', fontSize: 24, marginVertical: 8 }}>04 : 21 : 06</Text>
                <Button title="Play With ₦200.00" onPress={() => {}} color="#FF6600" />
              </View>
            </View>
          </View>
        </StickyHeaderScrollView>

        <StatusBar style="dark" backgroundColor=" #E9E9E9" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
