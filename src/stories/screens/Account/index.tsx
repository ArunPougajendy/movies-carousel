import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';

interface Props {
  route: any;
  navigation: any;
}

interface State {
  count: number;
}

export class Account extends React.Component<Props, State> {
  state = {
    count: 0,
  };

  modifyCount = (increase: boolean = true) => {
    if (increase) {
      this.setState({ count: this.state.count + 1 });
    } else {
      this.setState({ count: this.state.count - 1 });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.padding}>Account Screen!</Text>
        <Text style={styles.padding}>{this.state.count}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title='Add'
            onPress={() => {
              this.modifyCount(true);
            }}
          />
          <Button
            title='Subtract'
            onPress={() => {
              this.modifyCount(false);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'grey',
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  padding: {
    paddingVertical: 5,
  },
});

export default Account;
