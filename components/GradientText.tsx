import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = ({ text, style }: { text: string; style?: any }) => {
  return (
    <MaskedView maskElement={<Text style={[style, { textAlign: "center", backgroundColor: 'transparent' }]}>{text}</Text>}>
      <LinearGradient
        colors={['#FFAE4D', '#EF4734']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={[style, { opacity: 0, textAlign: "center" }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
