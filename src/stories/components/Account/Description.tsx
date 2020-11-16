import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Item from './AnimatedItem';
import styles from '../../screens/Account/styles';

interface Props {
  index: number;
  text: string;
  color: string;
}

const Description = ({ index, text, color }: Props) => {
  return (
    <Item>
      <Text
        numberOfLines={3}
        key={`description-${index}`}
        style={[styles.description, { color }]}>
        {text}
      </Text>
    </Item>
  );
};

export default Description;
