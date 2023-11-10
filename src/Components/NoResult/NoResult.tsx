import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../Constants/colors';
import {
  getHeightStr,
} from '../../Helpers/widthHeightHelpers';

type props = {
  message: string
}

const NoResultScreen = (props: props) => {

  return (

    <View style={styles.container}>

      <Text style={styles.message}>{props.message}</Text>
      <Image
        style={styles.humanImage}
        source={require('../../Assets/Images/human.png')}
      />

    </View>
  );
};

export default NoResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop: getHeightStr(50),
  },
  message: {
    marginTop: getHeightStr(20),
    fontSize: 18,
    fontWeight: "400",
    color: COLORS.subText
  },

  humanImage: {
    marginTop: getHeightStr(30),
    width: 320,
    height: 210,
    zIndex: 100,
  },
});
