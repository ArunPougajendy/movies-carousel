import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from '../../stories/screens/Home';

export interface Props {
  route: any;
  navigation: any;
}

function HomeContainer(props: Props) {
  return (
    <View style={{ flex: 1, paddingBottom: 0 }}>
      <Home route={props.route} navigation={props.navigation} />
    </View>
  );
}

export default HomeContainer;
