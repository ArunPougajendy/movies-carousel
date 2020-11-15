import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultOptions } from './navHelpers';
import AppStack from './AppStack';

const screenOptions = defaultOptions(null);

export default function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"App"}>
      <Stack.Screen
        name="App"
        component={AppStack}
        options={screenOptions}
      />
    </Stack.Navigator>
  )
}