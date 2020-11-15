import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Animated,
  Dimensions,
} from 'react-native';

interface Props {
  route: any;
  navigation: any;
}

export default function Home(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
