export function defaultOptions(styles?: any, additionalOptions?: any) {
  return {
    cardStyle: {
      backgroundColor: '#FCFDFF',
      ...styles,
    },
    gestureEnabled: false,
    headerShown: false,
    ...additionalOptions,
  };
}
