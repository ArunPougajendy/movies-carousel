import { StyleSheet, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');
export const DURATION = 700;
export const TITLE_SIZE = 36;
export const SPACING = 80;
export const IMAGE_SIZE = width * 0.8;
export const colors = {
  lightBg: 'white',
  darkBg: '#999999',
  lightText: '#f0f8ff',
  darkText: 'black',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageConatiner: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    right: -100,
    borderRadius: IMAGE_SIZE / 2,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  detailsContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  description: {
    fontSize: 12,
  },
  title: {
    fontSize: TITLE_SIZE,
    fontWeight: '900',
  },
  detailsView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 25,
  },
  genreItems: {
    flex: 1,
    height: 50,
    justifyContent: 'flex-start',
  },
  customGenreStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 0,
  },
  detailsItem: {
    flex: 1,
    height: 26,
    justifyContent: 'center',
  },
});
export default styles;
