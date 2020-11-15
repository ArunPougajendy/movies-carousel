import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GenreProps {
  genres: string[];
}

function Genre(props: GenreProps) {
  return (
    <View style={styles.genresContainer}>
      {props.genres.map((genre: string, index: number) => (
        <View key={index} style={styles.genre}>
          <Text style={styles.genreText}>{genre}</Text>
        </View>
      ))}
    </View>
  );
}

export default Genre;

const styles = StyleSheet.create({
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    flexWrap: 'wrap',
  },
  genre: {
    margin: 3,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
  },
  genreText: {
    fontSize: 9,
    color: 'grey',
  },
});
