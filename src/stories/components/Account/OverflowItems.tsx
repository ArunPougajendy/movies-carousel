import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Rating from '../Home/Rating';

const OVERFLOW_HEIGHT = 45;
const SPACING = 10;

interface Props {
  movies: any;
  scrollX?: Animated.Value;
}

function OverflowItems(props: Props) {
  const { movies, scrollX } = props;
  return (
    <View style={styles.overflowContainer}>
      <View>
        {movies.map((movie: any, index: number) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {movie.title}
              </Text>
              <View style={styles.details}>
                <Rating rating={movie.rating} noMargin />
                <Text style={styles.genreAndDate} numberOfLines={1}>
                  {movie.releaseDate}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default OverflowItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -1,
  },
  genreAndDate: {
    fontSize: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
