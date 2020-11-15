import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

import { data } from '../../../data';
import Genre from '../../components/Genre';
import Rating from '../../components/Rating';

interface Props {
  route: any;
  navigation: any;
}

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const SPACING = 10;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;
const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const movies = data.map(
  ({
    id,
    original_title,
    poster_path,
    backdrop_path,
    vote_average,
    overview,
    release_date,
    genres,
  }) => ({
    key: String(id),
    title: original_title,
    poster: getImagePath(poster_path),
    backdrop: getBackdropPath(backdrop_path),
    rating: vote_average,
    description: overview,
    releaseDate: release_date,
    genres: genres.map(({ id, name }) => name),
  }),
);

const orgData = [{ key: 'left-Spact' }, ...movies, { key: 'right-Spact' }];

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Backdrop = ({ movies, scrollX }: { movies: any; scrollX: any }) => {
  return (
    <View style={styles.backdropContainer}>
      <FlatList
        data={movies}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item, index }) => {
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
                  <Rect height={height} width={width} x='0' y='0' fill='red' />
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
};

export default function Home(props: Props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop movies={orgData} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={orgData}
        horizontal
        keyExtractor={(_: any, index: number) => `${index}`}
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16} // 60fps
        renderItem={({ item, index }: { item: any; index: number }) => {
          if (!item.poster) {
            return <View style={styles.spacerConatiner} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [50, 0, 50],
          });

          return (
            <View key={index} style={styles.movieContainer}>
              <Animated.View
                style={[styles.movieInner, { transform: [{ translateY }] }]}>
                <Image
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }}>{item.title}</Text>
                <Rating rating={item.rating} />
                <Genre genres={item.genres} />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieContainer: {
    width: ITEM_SIZE,
  },
  movieInner: {
    alignItems: 'center',
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    backgroundColor: 'white',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  spacerConatiner: {
    height: 200,
    width: SPACER_ITEM_SIZE,
  },
  backdropContainer: {
    position: 'absolute',
    height: BACKDROP_HEIGHT,
    width: width,
    backgroundColor: 'red',
  },
  backdropImage: {
    position: 'absolute',
    resizeMode: 'cover',
    height: BACKDROP_HEIGHT,
    width,
  },
  backdropLinear: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
    bottom: 0,
  },
});
