import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../Constants/colors';
import Button from '../../Components/Button/Button';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'CancelTaskRequestScreen'
  >;
  route: RouteProp<AppStackParamList, 'CancelTaskRequestScreen'>;
};

const CancelTaskRequestScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <Text style={styles.headText}>
          {t('AlreadyGottenJob.OopsMissedIt')}
        </Text>
        <Text style={styles.bodyText}>
          {t('AlreadyGottenJob.anotherServiceProvider')}
        </Text>
        <Button
          text={t('AlreadyGottenJob.MyMissions')}
          variant="filled"
          corners="curved"
          color={COLORS.purpleLight}
          onPress={() => {
            navigation.navigate('MyJobTaskScheduleMainScreen');
          }}
          buttonStyle={styles.button}
        />
        <Button
          text={t('reportReceivedScreen.homePage')}
          corners="curved"
          color={COLORS.purpleLight}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          buttonStyle={[styles.button, {marginTop: 15}]}
        />
      </View>
    </SafeAreaView>
  );
};

export default CancelTaskRequestScreen;

const styles = StyleSheet.create({
  mainView: {
    marginTop: 158,
  },
  headText: {
    color: COLORS.purpleLight,
    fontSize: 36,
    alignSelf: 'center',
    fontWeight: '500',
  },
  bodyText: {
    color: COLORS.black,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '100',
  },
  buttonViewStyle: {
    margin: 30,
  },
  button: {
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 30,
  },
});
