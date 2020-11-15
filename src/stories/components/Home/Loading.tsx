import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

function Loader(props: any) {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        source={require('../../../../assets/stopwatch.json')}
        // OR find more Lottie files @ https://lottiefiles.com/featured
      />
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
