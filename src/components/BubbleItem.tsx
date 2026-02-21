/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const ACTIVE_SCALE = 1.35;

const SPRING = {
  damping: 18,
  stiffness: 160,
  mass: 0.9
};

type Props = {
  label: string;
  index: number;
  size: number;
  color: string;
  selectedIndices: SharedValue<number[]>;
  onSelect: (label: string, index: number) => void;
};

const BubbleItem: React.FC<Props> = ({
  label,
  index,
  size,
  color,
  selectedIndices,
  onSelect
}) => {
  const tapGesture = Gesture.Tap().onEnd(() => {
    'worklet';
    scheduleOnRN(onSelect, label, index);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const selectedArray = selectedIndices.value ?? [];
    const selected = selectedArray.includes(index);

    return {
      transform: [
        {
          scale: withSpring(selected ? ACTIVE_SCALE : 1, SPRING)
        }
      ],
      zIndex: selected ? 20 : 1
    };
  });

  const fontSize = Math.max(
    11,
    Math.min(11, 8 + Math.floor(size / 28))
  );

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center'
          },
          animatedStyle
        ]}
      >
        <Text
          numberOfLines={1}
          style={{
            color: '#fff',
            fontSize,
            fontWeight : "700",
            textAlign: 'center',
            paddingHorizontal: Math.max(
              6,
              Math.floor(size / 12)
            )
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default BubbleItem;