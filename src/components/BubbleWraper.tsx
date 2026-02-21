import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

type Props = {
  index: number;
  x: number;
  y: number;
  selectedIndices: SharedValue<number[]>;
  cellSize: number;
  rowCount: number;
  children: React.ReactNode;
};

const BubbleWrapper: React.FC<Props> = ({
  index,
  x,
  y,
  selectedIndices,
  cellSize,
  children
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const selectedArray = selectedIndices.value ?? [];
    const selected = selectedArray.includes(index);

    return {
      zIndex: selected ? 10 : 1
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: cellSize,
          height: cellSize,
          justifyContent: 'center',
          alignItems: 'center'
        },
        animatedStyle
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default BubbleWrapper;