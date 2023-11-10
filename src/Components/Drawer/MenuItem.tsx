import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Line from '../Line/Line';
import { COLORS } from '../../Constants/colors';

type Props = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
};

const MenuItem: React.FC<Props> = React.memo(({ text, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuText}>{text}</Text>
      <Line style={{ borderWidth: 0.7 }} />
    </TouchableOpacity>
  );
});

export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
  },
  menuText: {
    paddingVertical: 17,
    paddingHorizontal: 15,
    color: COLORS.text,
    fontFamily: 'Assistant-Medium',
  },
});
