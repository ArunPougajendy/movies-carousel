import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, Animated, Image } from 'react-native';

import { data } from '../../../data';
import Genre from '../../components/Genre';
import Rating from '../../components/Rating';
import Backdrop from '../../components/Backdrop';
import { getMovies, MovieType } from '../../../actions/movies';
import styles, { ITEM_SIZE } from './styles';
interface Props {
  route: any;
  navigation: any;
}

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

export default function Home(props: Props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [movies, setMovies] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{ key: 'left-spacer' }, ...movies, { key: 'right-spacer' }]);
    };
    if (movies.length === 0) {
      fetchData();
    }
  }, []);
  if (movies.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={{ alignSelf: 'center' }}>Loading ...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        horizontal
        keyExtractor={(_: any, index: number) => `${index}`}
        contentContainerStyle={{ alignItems: 'center', marginTop: 100 }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16} // 60fps
        renderItem={({ item, index }: { item: MovieType; index: number }) => {
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
            outputRange: [100, -50, 100],
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
          });

          return (
            <Animated.View key={index} style={[styles.movieContainer]}>
              <Animated.View
                style={[
                  styles.movieInner,
                  { opacity, transform: [{ translateY }] },
                ]}>
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
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
