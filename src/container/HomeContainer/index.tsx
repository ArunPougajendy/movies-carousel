import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from '../../stories/screens/Home';

export interface Props {
  route: any;
  navigation: any;
}

function HomeContainer(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 0 }} >
      <Home route={props.route} navigation={props.navigation} />
    </SafeAreaView>
  )
}

export default HomeContainer;
