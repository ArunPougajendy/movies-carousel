import React from 'react';
import { View, FlatList, Animated, Image } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import { MovieType } from '../../../actions/movies';
import styles, { width, height, ITEM_SIZE } from '../../screens/Home/styles';

interface Props {
  movies: any[];
  scrollX: Animated.Value;
}
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function Backdrop(props: Props) {
  const { movies, scrollX } = props;
  return (
    <View style={styles.backdropContainer}>
      <FlatList
        data={movies}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item, index }: { item: MovieType; index: number }) => {
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });
          if (!item.backdrop) {
            return null;
          }
          return (
            <MaskedView
              style={{ position: 'absolute' }}
              maskElement={
                <AnimatedSvg
                  height={height}
                  width={width}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{ transform: [{ translateX }] }}>
                  <Rect
                    height={height}
                    width={width}
                    x='0'
                    y='0'
                    fill='white'
                  />
                </AnimatedSvg>
              }>
              <Image
                source={{ uri: item.poster }}
                style={styles.backdropImage}
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', 'white']}
        style={styles.backdropLinear}
      />
    </View>
  );
}

export default Backdrop;
