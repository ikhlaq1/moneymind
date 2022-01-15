import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { CommonProperties } from '../styles';

const BaseText = (props) => {
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return <Text {...props} style={[styles.defaultTextStyle, ...incomingStyle]} />;
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    ...CommonProperties.body,
    ...CommonProperties.fontFamily,
  },
});

export default BaseText;
