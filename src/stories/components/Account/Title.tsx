import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Item from './AnimatedItem';
import { TITLE_SIZE } from '../../screens/Account/styles';

interface Props {
  index: number;
  text: string;
  color: string;
}

const Title = ({ index, text, color }: Props) => {
  return (
    <Item style={styles.customStyle}>
      <Text
        key={`title-${index}`}
        numberOfLines={2}
        style={[styles.title, { color }]}>
        {text}
      </Text>
    </Item>
  );
};

export default Title;

const styles = StyleSheet.create({
  customStyle: {
    height: TITLE_SIZE * 3,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: TITLE_SIZE,
    fontWeight: '900',
  },
});
