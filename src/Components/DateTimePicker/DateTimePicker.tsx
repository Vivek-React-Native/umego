import React, {ReactElement} from 'react';
import {
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../Constants/colors';

type Props = {
  mode: 'time' | 'date' | 'datetime';
  icon?: ReactElement;
  title: string;
  triggerOpening: () => void;
  image?: ImageRequireSource;
  value: string;
  disabled?: boolean;
  error?: boolean;
};

const DateTimePicker = ({
  disabled,
  image,
  icon,
  title,
  value,
  triggerOpening,
  error,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, {opacity: disabled ? 0.5 : 1}]}
      onPress={() => {
        !disabled && triggerOpening();
      }}>
      <Text style={[styles.title, {color: error ? COLORS.error : COLORS.text}]}>
        {title}
      </Text>
      <View style={styles.pickerTrigger}>
        <Text
          style={{
            fontFamily: 'Assistant-Medium',
            paddingLeft: 5,
            color: '#000000',
          }}>
          {value}
        </Text>
        {icon && icon}
        {image && (
          <Image
            source={image}
            resizeMode={'contain'}
            style={{marginBottom: 5}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'right',
    width: '45%',
    borderBottomWidth: 1,
    borderColor: COLORS.disable,
  },
  pickerTrigger: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'left',
    marginVertical: 10,
    color: COLORS.text,
    fontFamily: 'Assistant-Medium',
  },
});
