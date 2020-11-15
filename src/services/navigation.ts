import { CommonActions } from '@react-navigation/native';

let navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params?: any) {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
