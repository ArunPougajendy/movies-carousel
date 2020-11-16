import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import posed, { Transition as PosedTransition } from 'react-native-pose';
import { movies } from '../../../../data';
import { formatMovieResponse } from '../../../utils/helper';
import styles, { colors, height, DURATION } from './styles';
import Title from '../../components/Account/Title';
import Description from '../../components/Account/Description';
import Details from '../../components/Account/Details';

const formattedMovies = formatMovieResponse(movies);

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

function Account(props: any) {
  const [index, setIndex] = useState(0);
  const color = index % 2 === 0 ? colors.lightText : colors.darkText;
  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<any>();
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

  return (
    <FlingGestureHandler
      key={'up'}
      direction={Directions.UP}
      onHandlerStateChange={(e: any) => {
        if (e.nativeEvent.state === State.END) {
          if (index === formattedMovies.length - 1) {
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
                height: height * formattedMovies.length,
                transform: [{ translateY }],
              },
            ]}>
            {formattedMovies.map((_: any, i: number) => {
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
                  source={{ uri: formattedMovies[index].poster }}
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
                  source={{ uri: formattedMovies[index].poster }}
                  style={styles.image}
                />
              </PosedView>
            )}
          </PosedTransition>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.detailsContainer}>
            <Title
              color={color}
              index={index}
              text={formattedMovies[index].title}
            />
            <Details color={color} index={index} movies={formattedMovies} />
            <Description
              color={color}
              index={index}
              text={formattedMovies[index].description}
            />
          </Transitioning.View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

export default Account;
