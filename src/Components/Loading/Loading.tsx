import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#fff'} size={30} style={styles.loading} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100000000,
    width: '100%',
    height: '100%',
  },
  loading: {
    alignSelf: 'center',
  },
});
