import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {
  getHeight,
  getHeightStr,
  getWidthStr,
} from '../../Helpers/widthHeightHelpers';
import Drawer from '../../Components/Drawer/Drawer';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'JobProposalNoResultScreen'
  >;
  route: RouteProp<AppStackParamList, 'JobProposalNoResultScreen'>;
};

// const JobProposalNoResultScreen = ({navigation, route}: Props) => {
  const JobProposalNoResultScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Drawer />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.imageText}>משימות סביבי</Text>
        </View>
        <View style={styles.boxes}>
          <View style={styles.box1A}>
            <Text style={styles.text1}>אילת</Text>
            <Image
              style={styles.arrows}
              source={require('../../Assets/Images/arrowDown.png')}
            />
          </View>

          <View style={styles.box1B}>
            <Text style={styles.text1}>חיות מחמד</Text>
            <Image
              style={styles.arrows}
              source={require('../../Assets/Images/arrowDown.png')}
            />
          </View>

          <View style={styles.box1C}>
            <Text style={styles.text1}> תת קטגוריה </Text>
            <Image
              style={styles.arrows1}
              source={require('../../Assets/Images/arrowDown.png')}
            />
          </View>
        </View>
        <Text style={styles.mid}>לא נמצאו תוצאות לפי סינון זה</Text>
        <Image
          style={styles.humanImage}
          source={require('../../Assets/Images/human.png')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobProposalNoResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: 'center',
  },
  imageText: {
    color: '#8D7BAF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  humanImage: {
    width: 320,
    height: 210,
    position: 'absolute',
    bottom: 50,
    zIndex: 100,
  },
  mid: {
    marginTop: 189,
    fontSize: 18,
    fontWeight: '400',
    color: '#A5A5A5',
    alignSelf: 'center',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
    width: 94,
  },
  box1A: {
    display: 'flex',
    flexDirection: 'row',
    width: 94,
    marginLeft: -110,
  },
  box1B: {
    display: 'flex',
    flexDirection: 'row',
    width: 94,
    marginLeft: 0,
  },

  box1C: {
    display: 'flex',
    flexDirection: 'row',
    width: 94,
    marginLeft: 30,

  },
  arrows: {
    marginTop: 40,
    marginLeft: 30,
  },
  arrows1: {
    marginTop: 40,
    marginLeft: 10,
  },
  text1: {
    fontWeight: '400',
    fontSize: 14,
    paddingTop: 31,
  },
  subHeader: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
    color: '#000',
  },
  boxes: {
    display: 'flex',
    flexDirection: 'row',
    width: 94,
  },
  scroll: {
    paddingBottom: getWidthStr(10),
    alignItems: 'center',
    flex: 1,
  },
});
