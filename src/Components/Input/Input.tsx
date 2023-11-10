import {
  KeyboardType,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../Constants/colors';
import {getWidth} from '../../Helpers/widthHeightHelpers';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
type Props = {
  label?: string;
  error?: boolean;
  onTextChanged: (value: string, name?: string) => void;
  keyboardType?: KeyboardType;
  autoFocus?: boolean;
  size?: 'full' | 'half';
  style?: ViewStyle;
  placeholder?: string;
  inputValue?: string;
  cardInput?: boolean;
  type?: 'textarea' | 'input';
  name?: string;
  required?: boolean;
  editable?: boolean;
  inputStyle?: ViewStyle;
  multiline?: boolean;
  maxLength?: number;
  defaultValue?: any;
  numberOfLines?: any;
};

const Input: React.FC<Props> = React.memo(
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
    inputValue,
    type = 'input',
    name,
    editable,
    required,
    inputStyle,
    multiline,
    maxLength,
    defaultValue,
    numberOfLines,
  }: Props) => {
    const [value, setValue] = useState(inputValue);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      if (error) {
        setHasError(true);
      }
    }, [error]);

    useEffect(() => {
      setValue(inputValue);
    }, [inputValue]);

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
      } else {
        onTextChanged(text, name);
        setValue(text);
      }
    };
    return (
      <View
        style={[
          {
            width: size === 'full' ? '90%' : '45%',
            alignSelf: 'center',
          },
          style,
        ]}>
        {type === 'textarea' ? (
          <OutlinedTextField
            label={placeholder ? placeholder : label}
            keyboardType={keyboardType}
            editable={editable}
            onBlur={handleInputValue}
            value={value}
            onChangeText={handleOnChange}
            multiline={type === 'textarea'}
            inputContainerStyle={inputStyle}
          />
        ) : (
          <TextField
            label={placeholder ? placeholder : label}
            keyboardType={keyboardType}
            editable={editable}
            defaultValue={defaultValue}
            onBlur={handleInputValue}
            value={value}
            onChangeText={handleOnChange}
            inputContainerStyle={[
              inputStyle,
              {
                borderColor: error ? 'red' : undefined,
                borderBottomWidth: error ? 1 : 0,
              },
            ]}
            titleTextStyle={{fontFamily: 'Assistant-Medium'}}
            labelTextStyle={{fontFamily: 'Assistant-Medium'}}
            multiline={multiline}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
          />
        )}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({});
