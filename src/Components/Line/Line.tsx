import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../Constants/colors';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const Line: React.FC<Props> = React.memo(({style}: Props) => {
  return <View style={[styles.line, style]} />;
});

export default Line;

const styles = StyleSheet.create({
  line: {
    width: '95%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.lightPurple,
    alignSelf: 'center',
  },
});
