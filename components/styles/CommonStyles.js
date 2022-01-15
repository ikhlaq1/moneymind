import { StyleSheet } from 'react-native';
import CommonProperties from './CommonProperties';

const box = {
  flex: 1,
  backgroundColor: 'white',
  ...CommonProperties.mx3,
  ...CommonProperties.my2,
  ...CommonProperties.borderRadius,
};

const CommonStyles = StyleSheet.create({
  ...CommonProperties,
  box: {
    ...box,
  },
  boxShadow: {
    ...box,
    ...CommonProperties.shadow,
  },
  flex1: {
    flex: 1,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});

export default CommonStyles;
