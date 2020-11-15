import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultOptions } from './navHelpers';

import AccountContainer from '../container/AccountContainer';

const options = defaultOptions();
const Stack = createStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen component={AccountContainer} name="Account" options={options} />
    </Stack.Navigator>
  )
}

export default AccountStack;