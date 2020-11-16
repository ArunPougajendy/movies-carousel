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
  alertBox: {
    position: 'absolute',
    justifyContent: 'space-evenly',
    height: height / 4,
    width: width - 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    zIndex: 1,
    alignItems: 'center',
  },
  alertButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
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
    resizeMode: 'cover',
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
  retryButton: {
    alignSelf: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 10,
  },
});
export default styles;
