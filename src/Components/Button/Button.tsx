import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {
  cornerHelper,
  sizeHelper,
  textColorHelper,
  variantHelper,
} from '../../Helpers/StyleHelpers/ButtonStyleHelpers';

type Props = {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: Function;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'filled' | 'outlined';
  corners?: 'cornered' | 'curved' | 'rounded';
  color?: string;
  textColor?: string;
};
const Button: React.FC<Props> = ({
  buttonStyle,
  textStyle,
  onPress,
  text,
  loading,
  disabled,
  size,
  variant,
  corners,
  color,
  textColor,
}) => {
  return (
    <TouchableOpacity
      key={text}
      disabled={disabled}
      style={[
        styles.button,
        sizeHelper(size),
        variantHelper(variant, color),
        cornerHelper(corners),
        buttonStyle,
      ]}
      onPress={() => !disabled && onPress()}
      onPressIn={async () => !disabled}>
      <Text
        numberOfLines={1}
        key={text + '1'}
        style={[
          styles.buttonText,
          textStyle,
          {color: textColorHelper(variant, color, textColor)},
        ]}>
        {loading ? (
          <ActivityIndicator
            size={27}
            color={textColorHelper(variant, color, textColor)}
            style={{alignSelf: 'center'}}
          />
        ) : (
          text
        )}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    paddingHorizontal: 8,
    minHeight: 37,
    marginVertical: 3,
  },
  buttonText: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Assistant-Medium',
  },
});
export default Button;
