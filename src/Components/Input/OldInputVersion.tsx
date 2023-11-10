import {
  KeyboardType,
  NativeSyntheticEvent,
  Platform,
  RecyclerViewBackedScrollViewComponent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS} from '../../Constants/colors';
import {
  getHeight,
  getHeightStr,
  getWidth,
} from '../../Helpers/widthHeightHelpers';

type Props = {
  label?: string;
  error?: boolean;
  onTextChanged: (value: string, name?: string) => void;
  keyboardType?: KeyboardType;
  autoFocus?: boolean;
  size?: 'full' | 'half';
  style?: ViewStyle;
  placeholder?: string;
  cardInput?: boolean;
  type?: 'textarea' | 'input';
  name?: string;
  required?: boolean;
};

const OldInput: React.FC<Props> = React.memo(
  ({
    label,
    error,
    onTextChanged,
    keyboardType = 'default',
    autoFocus,
    size = 'full',
    style,
    placeholder,
    cardInput,
    type = 'input',
    name,
    required,
  }: Props) => {
    const [value, setValue] = useState('');
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
      if (error) {
        setHasError(true);
      }
    }, [error]);

    const handleInputValue = cardInput
      ? (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          if (Platform.OS === 'ios') {
            if (value.length === 1) {
              setValue(e.nativeEvent.text + '/');
            } else {
              setValue(e.nativeEvent.text);
            }
          }
        }
      : (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          if (Platform.OS === 'ios') {
            onTextChanged(e.nativeEvent.text, name);
            if (e.nativeEvent.text === '') setHasError(true);
            else setHasError(false);
          }
        };
    const handleOnChange = (text: string) => {
      if (Platform.OS === 'android') {
        if (cardInput) {
          if (value.length === 1) {
            setValue(text + '/');
          } else {
            setValue(text);
          }
        } else {
          onTextChanged(text, name);
          setValue(text);
        }
        if (text === '') setHasError(true);
        else setHasError(false);
      }
    };
    return (
      <>
        <View
          style={[
            styles.inputContainer,
            {
              width: size === 'full' ? '90%' : '45%',
            },
            style,
            type === 'textarea' && styles.textarea,
          ]}>
          <Text style={[styles.label, {color: hasError ? 'red' : COLORS.text}]}>
            {label}
          </Text>
          {cardInput ? (
            <TextInput
              style={[styles.input, {borderColor: error ? 'red' : undefined}]}
              placeholder={placeholder ? placeholder : label}
              onChange={handleInputValue}
              autoFocus={autoFocus}
              keyboardType={keyboardType}
              value={value}
              maxLength={5}
            />
          ) : (
            <TextInput
              style={[styles.input, type === 'textarea' && styles.textarea2]}
              placeholder={
                type === 'textarea' ? '' : placeholder ? placeholder : label
              }
              onBlur={handleInputValue}
              onChangeText={handleOnChange}
              autoFocus={autoFocus}
              keyboardType={keyboardType}
              multiline={type === 'textarea'}
              scrollEnabled={type === 'textarea'}
            />
          )}
        </View>
      </>
    );
  },
);

export default OldInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    marginVertical: '1%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.system,
    marginHorizontal: 10,
  },
  label: {
    fontSize: getWidth(14),
    alignSelf: 'flex-start',
    color: COLORS.text,
  },
  input: {
    borderStyle: 'solid',
    fontSize: getWidth(16),
    paddingVertical: 5,
    textAlign: 'right',
    alignSelf: 'center',
    width: '100%',
    paddingLeft: 5,
  },
  error: {
    color: COLORS.error,
    fontSize: getWidth(12),
    marginHorizontal: 10,
    position: 'absolute',
    top: '100%',
    left: -10,
  },
  textarea: {},
  textarea2: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 20,
    borderColor: COLORS.disable,
  },
});
