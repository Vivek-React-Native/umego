import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../Constants/AppStackParamList';
import { RouteProp } from '@react-navigation/native';
import { COLORS } from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'RequestCreatedScreen'
  >;
  route: RouteProp<AppStackParamList, 'RequestCreatedScreen'>;
};

const RequestCreatedScreen = ({ navigation, route }: Props) => {

  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* <Image source={require('../../Assets/Images/LogoText.png')} /> */}
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#8D7BAF', alignSelf: 'center', textAlign: 'center', fontStyle: 'normal' }}>{t('publishRequest')}</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={[styles.text, { textAlign: 'center', marginTop: 20 }]}>{t('publishText')}</Text>
      </View>
      <View style={styles.button}>
        <Button
          size="xlarge"
          text={t('toMyRequest')}
          onPress={() => {
            navigation.navigate('MyRequestMainScreen');
          }}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          textStyle={styles.buttonText}
        />
      </View>
      <View style={styles.button2}>
        <Button
          size="xlarge"
          color={COLORS.light}
          text={t('reportReceivedScreen.cancelButtonText')}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          corners="curved"
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default RequestCreatedScreen;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    // height: 40,
    // width: 220,
    marginTop: 158,
    position: 'relative',
  },
  subHeader: {
    marginLeft: 41,
    marginRight: 42,
    color: COLORS.system,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
  },
  button: {
    paddingVertical: 11,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 20,
    height: 40,
    width: 304,
  },
  button2: {
    paddingVertical: 11,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 20,
    height: 40,
    width: 304,
    color: '#8D7BAF',
  },
});
