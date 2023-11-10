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
import {getHeight, getWidthStr} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'RateThankYouScreen'
  >;
  route: RouteProp<AppStackParamList, 'RateThankYouScreen'>;
};

const RateThankYouScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.header}>
        <ScreenHeader
          header={t('thanksForRating')}
          isHeaderBold={true}
          subHeader={t('itHelpsUs')}
        />
      </View>
      <Button
        size="xlarge"
        text={t('toHome')}
        onPress={() => {}}
        color={COLORS.purpleLight}
        variant="filled"
        corners="curved"
        buttonStyle={styles.button}
      />
      <Image
        style={styles.imageBoy}
        source={require('../../Assets/Images/Boy.png')}
      />
      <View></View>
    </SafeAreaView>
  );
};

export default RateThankYouScreen;

const styles = StyleSheet.create({
  header: {
    // width: 211,
    alignContent: 'center',
    color: '#8D7BAF',
    marginTop: '35%',
  },
  subHeader: {
    color: '#8D7BAF',
    fontSize: 36,
    fontWeight: '600',
    // marginLeft: 74,
    // marginRight: 75
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'normal',
  },
  text: {
    // marginLeft: 71,
    // height: 40,
    // width: 218
    textAlign: 'center',
  },
  text2: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    color: '#000000',
    lineHeight: 19.8,
    // width: 218
    marginLeft: 63,
    // alignSelf:'center'
    alignItems: 'center',
  },
  star1: {
    marginTop: -170,
    margin: 220,
  },
  star2: {
    marginTop: -230,
    margin: 85,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    width: '90%',
  },
  imageBoy: {
    position: 'absolute',
    bottom: 30,
  },
  containerStyle: {
    height: '100%',
    alignItems: 'center',
  },
});
