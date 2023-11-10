import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  text: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  onPress?: () => void;
};

const Label: React.FC<Props> = React.memo(
  ({text, backgroundColor, textColor, fontSize, onPress}: Props) => {
    return (
      <View style={[styles.cont, {backgroundColor}]} onTouchEnd={onPress}>
        <Text style={[styles.text, {color: textColor, fontSize}]}>{text}</Text>
      </View>
    );
  },
);

export default Label;

const styles = StyleSheet.create({
  cont: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 8,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    fontFamily: 'Assistant-Medium',
  },
});
