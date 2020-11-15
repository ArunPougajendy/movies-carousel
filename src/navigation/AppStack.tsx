import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import AccountStack from './AccountStack';

export interface Props {
  color: string;
}

const Tab = createBottomTabNavigator();
const android = Platform.OS === 'android';

export default function () {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      lazy={false}
      tabBarOptions={{
        activeTintColor: '#1D2531',
        inactiveTintColor: '#BBBFC5',
        showIcon: true,
        showLabel: true,
        style: {
          backgroundColor: '#FCFDFF',
          shadowColor: '#000',
          shadowOffset: {
            height: -2,
            width: 0,
          },
          shadowOpacity: 0.1,
        },
        tabStyle: {},
      }}>
      <Tab.Screen
        component={HomeStack}
        name='Home'
        options={{
          tabBarIcon: (props: Props) => (
            <Ionicons name='md-home' size={24} color={props.color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        component={AccountStack}
        name='Account'
        options={{
          tabBarIcon: (props: Props) => (
            <Ionicons name='md-settings' size={24} color={props.color} />
          ),
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
}
