import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import posed, { Transition as PosedTransition } from 'react-native-pose';
import { isApikeyAvailable } from '../../../utils/helper';
import styles, { colors, height, DURATION } from './styles';
import Title from '../../components/Account/Title';
import Description from '../../components/Account/Description';
import Details from '../../components/Account/Details';
import { getMovies } from '../../../actions/movies';
import Loader from '../../components/Home/Loading';
import { Feather } from '@expo/vector-icons';

const transition = (
  <Transition.Together>
    <Transition.Out
      type='slide-bottom'
      durationMs={DURATION}
      interpolation='easeIn'
    />
    <Transition.Change />
    <Transition.In
      type='slide-bottom'
      durationMs={DURATION}
      interpolation='easeOut'
    />
  </Transition.Together>
);

const config = {
  transition: {
    type: 'tween',
    duration: DURATION,
    easing: Easing.elastic(0.7),
  },
};

const PosedView = posed.View({
  enter: { opacity: 1, rotate: '0deg', ...config },
  exit: { opacity: 0, rotate: '180deg', ...config },
});

function MovieReels(props: any) {
  const [welcome, setWelcome] = useState(true);
  const [movies, setMovies] = useState<any>([]);
  const [index, setIndex] = useState(0);
  const color = index % 2 === 0 ? colors.lightText : colors.darkText;
  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<any>();
  useEffect(() => {
    fetchMoviesHelper();
  }, []);

  const fetchMoviesHelper = () => {
    if (isApikeyAvailable()) {
      const fetchData = async () => {
        const movies = await getMovies(true);
        setMovies(movies);
      };
      if (movies.length === 0) {
        fetchData();
      }
    } else {
      alert('API_KEY not available \n Register or contact Developer');
    }
  };
  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  });

  const setActiveIndex = (newIndex: number) => {
    activeIndex.setValue(newIndex);
    // Intimate the component that the component has been changed, do the aimation
    ref.current.animateNextTransition();
    setIndex(newIndex);
  };

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

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
    <FlingGestureHandler
      key={'up'}
      direction={Directions.UP}
      onHandlerStateChange={(e: any) => {
        if (e.nativeEvent.state === State.END) {
          if (index === movies.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}>
      <FlingGestureHandler
        key={'down'}
        direction={Directions.DOWN}
        onHandlerStateChange={(e: any) => {
          if (e.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}>
        <View style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: height * movies.length,
                transform: [{ translateY }],
              },
            ]}>
            {movies.map((_: any, i: number) => {
              return (
                <View
                  key={i}
                  style={{
                    height: height,
                    backgroundColor:
                      i % 2 === 0 ? colors.darkBg : colors.lightBg,
                  }}
                />
              );
            })}
          </Animated.View>
          {welcome && (
            <View style={styles.alertBox}>
              <Feather name='chevrons-up' size={50} color='black' />
              <TouchableOpacity
                style={styles.alertButton}
                onPress={() => {
                  setWelcome(false);
                }}>
                <Text>Scroll Options</Text>
              </TouchableOpacity>
              <Feather name='chevrons-down' size={50} color='black' />
            </View>
          )}
          <PosedTransition>
            {/* Rendering same image twice with different 'key' to stimualte animation */}
            {index % 2 === 0 ? (
              <PosedView
                key='image0'
                style={[
                  styles.imageConatiner,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image
                  source={{ uri: movies[index].poster }}
                  style={styles.image}
                />
              </PosedView>
            ) : (
              <PosedView
                key='image1'
                style={[
                  styles.imageConatiner,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image
                  source={{ uri: movies[index].poster }}
                  style={styles.image}
                />
              </PosedView>
            )}
          </PosedTransition>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.detailsContainer}>
            <Title color={color} index={index} text={movies[index].title} />
            <Details color={color} index={index} movies={movies} />
            <Description
              color={color}
              index={index}
              text={movies[index].description}
            />
          </Transitioning.View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

export default MovieReels;
