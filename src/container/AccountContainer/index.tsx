import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Account from '../../stories/screens/Account';

export interface Props {
  route: any;
  navigation: any;
}

function AccountContainer(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 0 }} >
      <Account route={props.route} navigation={props.navigation} />
    </SafeAreaView>
  )
}

export default AccountContainer;
