import { StyleSheet, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');
export const ITEM_SIZE = width * 0.72;
const SPACING = 10;
export const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
export const BACKDROP_HEIGHT = height * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieContainer: {
    width: ITEM_SIZE,
  },
  movieInner: {
    alignItems: 'center',
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    backgroundColor: 'white',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  spacerConatiner: {
    height: 200,
    width: SPACER_ITEM_SIZE,
  },
  backdropContainer: {
    position: 'absolute',
    height: BACKDROP_HEIGHT,
    width: width,
    backgroundColor: 'white',
  },
  backdropImage: {
    position: 'absolute',
    resizeMode: 'cover',
    height: BACKDROP_HEIGHT,
    width,
  },
  backdropLinear: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
    bottom: 0,
  },
  retryButton: {
    alignSelf: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 10,
  },
});
export default styles;
