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
    'AlreadyGottenJobScreen'
  >;
  route: RouteProp<AppStackParamList, 'AlreadyGottenJobScreen'>;
};

const AlreadyGottenJobScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <Text style={styles.headText}>בקשתך התקבלה</Text>
        <Text style={styles.bodyText}>
          משימה זו לא תופיע לך יותר במשימות לתיאום
        </Text>
        <Button
          text="למשימות שלי"
          variant="filled"
          corners="curved"
          color={COLORS.purpleLight}
          onPress={() => {
            navigation.navigate('MyJobTaskScheduleMainScreen');
          }}
          buttonStyle={styles.button}
        />
        <Button
          text="לדף הבית"
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

export default AlreadyGottenJobScreen;

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
