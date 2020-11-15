import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface RatingProps {
  rating: number;
  noMargin?: boolean;
}
function Rating(props: RatingProps) {
  const filledStars = Math.floor(props.rating / 2);
  const emptyStars = Array(5 - filledStars).fill('staro');
  const stars = [...Array(filledStars).fill('star'), ...emptyStars];
  return (
    <View
      style={[
        styles.ratingContainer,
        { marginVertical: props.noMargin ? 0 : 5 },
      ]}>
      {stars.map((star: string, index: number) => (
        <AntDesign key={index} name={star} size={12} color='gold' />
      ))}
    </View>
  );
}

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
