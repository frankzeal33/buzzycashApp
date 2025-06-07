import React from 'react';
import Svg, { Text as SvgText } from 'react-native-svg';
import { View, useWindowDimensions } from 'react-native';

const wrapText = (text: string, maxCharsPerLine: number) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine += ` ${word}`;
    } else {
      lines.push(currentLine.trim());
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine.trim());

  return lines;
};

const StrokedText = ({
  text,
  color = '#FF7A00',
  stroke = '#000',
  fontSize = 24,
  maxCharsPerLine = 20,
  lineHeight = 1.3,
}: {
  text: string;
  color?: string;
  stroke?: string;
  fontSize?: number;
  maxCharsPerLine?: number;
  lineHeight?: number;
}) => {
  const { width } = useWindowDimensions();
  const lines = wrapText(text, maxCharsPerLine);
  const lineHeightPx = fontSize * lineHeight;
  const totalHeight = lineHeightPx * lines.length + fontSize * 0.4; // Extra 40% to avoid cutting

  return (
    <View style={{ width: '100%', height: totalHeight }}>
      <Svg height={totalHeight} width="100%" viewBox={`0 0 ${width} ${totalHeight}`}>
        {lines.map((line, idx) => {
          const y = lineHeightPx * (idx + 1);

          return (
            <React.Fragment key={idx}>
              <SvgText
                x={width / 2}
                y={y}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="bold"
                stroke={stroke}
                strokeWidth={5}
                fill="none"
                alignmentBaseline="middle"
              >
                {line}
              </SvgText>
              <SvgText
                x={width / 2}
                y={y}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="bold"
                fill={color}
                alignmentBaseline="middle"
              >
                {line}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default StrokedText;
