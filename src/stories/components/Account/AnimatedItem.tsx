import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: any;
  style?: any;
}
const Item = ({ children, style }: Props) => {
  return <View style={[styles.root, style]}>{children}</View>;
};

export default Item;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});
