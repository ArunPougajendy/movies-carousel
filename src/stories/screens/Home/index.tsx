import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

import Genre from '../../components/Home/Genre';
import Rating from '../../components//Home/Rating';
import Backdrop from '../../components/Home/Backdrop';
import { getMovies, MovieType } from '../../../actions/movies';
import styles, { ITEM_SIZE } from './styles';
import Loader from '../../components/Home/Loading';
import { isApikeyAvailable } from '../../../utils/helper';
interface Props {
  route: any;
  navigation: any;
}

export default function Home(props: Props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [movies, setMovies] = useState<any>([]);
  useEffect(() => {
    fetchMoviesHelper();
  }, []);

  const fetchMoviesHelper = () => {
    if (isApikeyAvailable()) {
      const fetchData = async () => {
        const movies = await getMovies();
        setMovies([{ key: 'left-spacer' }, ...movies, { key: 'right-spacer' }]);
      };
      if (movies.length === 0) {
        fetchData();
      }
    } else {
      alert('API_KEY not available \n Register or contact Developer');
    }
  };
  if (movies.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Loader />
        <TouchableOpacity
          onPress={fetchMoviesHelper}
          style={styles.retryButton}>
          <Text style={{ color: 'white' }}>Retry</Text>
        </TouchableOpacity>
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
