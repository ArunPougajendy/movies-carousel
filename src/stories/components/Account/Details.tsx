import React from 'react';
import { View, Text } from 'react-native';
import Item from './AnimatedItem';
import Genre from '../Home/Genre';
import { DetailsKey } from '../../../utils/constants';
import styles, { colors, width, SPACING } from '../../screens/Account/styles';
import Rating from '../Home/Rating';

interface Props {
  index: number;
  color: string;
  movies: any;
}

const Details = ({ color, index, movies }: Props) => {
  return (
    <View style={{ marginVertical: SPACING }}>
      {DetailsKey.map((key: string) => {
        return (
          <View key={key} style={styles.detailsView}>
            {key === 'genres' ? (
              <Item style={styles.genreItems}>
                <View style={{ width: width / 3 }}>
                  <Genre
                    genres={movies[index][key]}
                    customStyle={styles.customGenreStyle}
                    customTextStyle={{
                      color:
                        index % 2 === 0 ? colors.lightText : colors.darkText,
                    }}
                  />
                </View>
              </Item>
            ) : key === 'rating' ? (
              <Item style={styles.detailsItem}>
                <Rating
                  rating={movies[index][key]}
                  noMargin
                  customStyle={{ justifyContent: 'flex-start' }}
                />
              </Item>
            ) : (
              <Item style={styles.detailsItem}>
                <Text key={`${key}-${index}`} style={{ fontSize: 12, color }}>
                  {movies[index][key]}
                </Text>
              </Item>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Details;
