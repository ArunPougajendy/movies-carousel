import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Account from '../../stories/screens/Account';

export interface Props {
  route: any;
  navigation: any;
}

function AccountContainer(props: Props) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <Account route={props.route} navigation={props.navigation} />
    </View>
  );
}

export default AccountContainer;
