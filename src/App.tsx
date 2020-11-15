import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation';
import NavigationService from './services/navigation';

// Uncomment this line to remove all yellow warning dialogs
// console.disableYellowBox = true;

export default class App extends React.Component {
  currentRoute: string = '';

  // Get the current screen from the navigation state
  getActiveRouteName(navigationState: any): any {
    if (!navigationState || !navigationState.routes) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    return route.name;
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer
          ref={(navigatorRef: any) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onStateChange={(state: any) => {
            const newRouteName = this.getActiveRouteName(state);
            // Save the current route name for later comparision
            this.currentRoute = newRouteName;
          }}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
