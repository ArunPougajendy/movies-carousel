import * as React from 'react';
import { AppLoading } from 'expo';

import App from '../App';
import { Platform, UIManager } from 'react-native';

export interface State {
  isReady: boolean;
}

export default class Setup extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
    }
    // Needed for animations on Android
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this.setState({
      isReady: true
    })
  };
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <App />
    );
  }
}
