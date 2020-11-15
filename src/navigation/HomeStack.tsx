import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultOptions } from './navHelpers';

import HomeContainer from '../container/HomeContainer';
import AccountContainer from '../container/AccountContainer';

const options = defaultOptions();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen component={HomeContainer} name="Home" options={options} />
    </Stack.Navigator>
  )
}

export default HomeStack;