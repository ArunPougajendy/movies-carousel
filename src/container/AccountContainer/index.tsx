import * as React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Account from '../../stories/screens/Account';

export interface Props {
  route: any;
  navigation: any;
}

function AccountContainer(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
      <StatusBar hidden />
      <Account route={props.route} navigation={props.navigation} />
    </SafeAreaView>
  );
}

export default AccountContainer;
