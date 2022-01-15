import { StyleSheet } from 'react-native';
import { Color, CommonProperties } from '.';

export const widgetStyles = StyleSheet.create({
  widget: {
    ...CommonProperties.mt3,
    ...CommonProperties.mb3,
    ...CommonProperties.borderRadius,
    ...CommonProperties.shadow,
  },
  topBorder: {
    borderTopWidth: 0.5,
    borderTopColor: Color.text.low,
  },
  time: {
    //width: '50%',
    //flex: 1,
    //alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: Color.text.low,
  },
});
