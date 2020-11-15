import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import { movies } from '../../../../data';
import { DetailsKey } from '../../../utils/constants';
import { formatMovieResponse } from '../../../utils/helper';
import OverflowItems from '../../components/Account/OverflowItems';
import Genre from '../../components/Home/Genre';

const { width, height } = Dimensions.get('window');
const formattedMovies = formatMovieResponse(movies);
const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = width * 0.8;

const colors = {
  lightBg: '#323232',
  darkBg: '#2C2D51',
  lightText: 'grey',
  darkText: '#323232',
};

const Item = ({ children, style }: any) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const Description = ({ index, text, color }: any) => {
  return (
    <Item>
      <Text key={`description-${index}`} style={{ fontSize: 12, color }}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({ index, text, color }: any) => {
  return (
    <Item style={{ height: TITLE_SIZE * 3, justifyContent: 'flex-end' }}>
      <Text
        key={`title-${index}`}
        numberOfLines={2}
        style={{ fontSize: TITLE_SIZE, fontWeight: '900', color }}>
        {text}
      </Text>
    </Item>
  );
};

const Details = ({ color, index }: any) => {
  return (
    <View style={{ marginVertical: SPACING }}>
      {DetailsKey.map((key: string) => {
        return (
          <View
            key={key}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 25,
            }}>
            {key === 'genres' ? (
              <Item
                style={{
                  flex: 1,
                  height: 50,
                  justifyContent: 'flex-start',
                }}>
                <View style={{ width: width / 3 }}>
                  <Genre
                    genres={formattedMovies[index][key]}
                    customStyle={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginVertical: 0,
                    }}
                  />
                </View>
              </Item>
            ) : (
              <Item style={{ flex: 1, height: 26, justifyContent: 'center' }}>
                <Text key={`${key}-${index}`} style={{ fontSize: 12, color }}>
                  {formattedMovies[index][key]}
                </Text>
              </Item>
            )}
          </View>
        );
      })}
    </View>
  );
};

function Account(props: any) {
  const [index, setIndex] = useState(0);
  const color = index % 2 === 0 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 0 ? colors.lightBg : colors.darkText;
  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION,
      useNativeDriver: true,
    });
  });

  const setActiveIndex = (newIndex: number) => {
    activeIndex.setValue(newIndex);
    setIndex(newIndex);
  };

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
          <View
            style={[
              styles.imageConatiner,
              { borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg },
            ]}>
            <Image
              source={{ uri: formattedMovies[index].poster }}
              style={{
                height: IMAGE_SIZE,
                width: IMAGE_SIZE,
                borderRadius: IMAGE_SIZE / 2,
                right: -SPACING * 0.2,
                padding: SPACING,
              }}
            />
          </View>
          <View
            style={{ padding: 20, flex: 1, justifyContent: 'space-evenly' }}>
            <Title
              color={headingColor}
              index={index}
              text={formattedMovies[index].title}
            />
            <Details color={color} index={index} />
            <Description
              color={headingColor}
              index={index}
              text={formattedMovies[index].description}
            />
          </View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageConatiner: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    right: -SPACING * 1.1,
    borderRadius: IMAGE_SIZE / 2,
    borderWidth: 1,
  },
});
