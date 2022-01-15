import React from 'react';
import { View } from 'react-native';
import { CommonStyles } from '../styles';

const RowView = ({ style, ...rest }) => {
  return <View style={[CommonStyles.row, style]} {...rest} />;
};

export default RowView;
