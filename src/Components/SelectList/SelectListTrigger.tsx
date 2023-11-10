import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS } from '../../Constants/colors';
type Props = {
  onPress: (value?: any) => void;
  loading: boolean;
  error: boolean;
  label: string;
  value: any;
};

const SelectListTrigger = ({ onPress, loading, error, label, value }: Props) => {
  return (
    <TouchableOpacity style={styles.selectListTrigger} onPress={onPress}>
      <View style={styles.labelAndValue}>
        {loading ? (
          <ActivityIndicator size={30} color={COLORS.black} />
        ) : (
          <>
            <Text
              style={[
                styles.label,
                { color: error ? COLORS.error : COLORS.text },
              ]}>
              {label}
            </Text>
            <Text numberOfLines={1} style={[styles.value, { marginBottom: 5 }]}>
              {value ? value : ''}
            </Text>
          </>
        )}
      </View>
      <Image
        source={require('../../Assets/Images/arrowDown.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default SelectListTrigger;

const styles = StyleSheet.create({
  selectListTrigger: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.disable,
    borderBottomWidth: 1,
    // paddingVertical: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    marginHorizontal: 1,
    // width: '95%',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  labelAndValue: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 5,
  },
  value: {
    marginBottom: -5,
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'left',
    marginRight: 10,
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: '50%',
  },
});
