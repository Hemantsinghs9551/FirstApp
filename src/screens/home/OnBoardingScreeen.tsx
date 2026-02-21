import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

import BubbleItem from '../../components/BubbleItem';
import BubbleWrapper from '../../components/BubbleWraper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DATA = [
  'POP', 'INDIE', 'ROCK', 'ELECTRONIC', 'COUNTRY', 'LATIN', 'HIP HOP', 'JAZZ',
  'CLASSIC ROCK', 'FOLK/BLUES', 'ALTERNATIVE', 'METAL', 'PUNK', 'R&B', 'SOUL',
  'REGGAE', 'BLUES', 'GOSPEL', 'NEW AGE', 'AMBIENT', 'HOUSE', 'TECHNO', 'DUBSTEP',
  'FUNK', 'DISCO', 'K-POP', 'AFROBEATS', 'BOSSANOVA', 'SALSA', 'MERENGUE',
  'GRUNGE', 'EMO', 'INDUSTRIAL', 'SYNTH-POP', 'LO-FI'
];

const COLORS = ['#E24C8B', '#B84D7A', '#C2397A', '#D8437A', '#E85A4A'];

const BUBBLE_SIZE = 96;
const ACTIVE_SCALE = 1.35;
const SELECTED_PADDING = 24;

const ROW_COUNT = 4;

// reserve space for scaled bubble
const cellSize = Math.ceil(BUBBLE_SIZE * ACTIVE_SCALE) + SELECTED_PADDING;

const getPosition = (index: number) => {
  const row = index % ROW_COUNT;
  const col = Math.floor(index / ROW_COUNT);
  const stagger = (row % 2) * (cellSize * 0.3);

  return {
    x: col * cellSize + stagger,
    y: row * (cellSize * 0.85)
  };
};

const OnBoardingScreen: React.FC = () => {
  const scrollRef = useRef<Animated.ScrollView>(null);

  const sharedSelected = useSharedValue<number[]>([]);

  const centerOnBubble = (index: number) => {
    const { x } = getPosition(index);
    const offset = Math.max(0, x - SCREEN_WIDTH / 2 + cellSize / 2);
    scrollRef.current?.scrollTo({ x: offset, animated: true });
  };

  const handleSelect = (_: string, index: number) => {
    const current = sharedSelected.value ?? [];

    if (current.includes(index)) {
      sharedSelected.value = current.filter(i => i !== index);
    } else {
      sharedSelected.value = [...current, index];
    }

    centerOnBubble(index);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: Math.ceil(DATA.length / ROW_COUNT) * cellSize + cellSize,
          height: ROW_COUNT * cellSize
        }}
      >
        {DATA.map((item, index) => {
          const { x, y } = getPosition(index);

          return (
            <BubbleWrapper
              key={`${item}-${index}`}
              index={index}
              x={x}
              y={y}
              selectedIndices={sharedSelected}
              cellSize={cellSize}
              rowCount={ROW_COUNT}
            >
              <BubbleItem
                label={item}
                index={index}
                size={BUBBLE_SIZE}
                color={COLORS[index % COLORS.length]}
                selectedIndices={sharedSelected}
                onSelect={handleSelect}
              />
            </BubbleWrapper>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});