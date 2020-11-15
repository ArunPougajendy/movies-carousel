import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Account(props: any) {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
