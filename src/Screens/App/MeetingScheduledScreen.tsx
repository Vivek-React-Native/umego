import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import {getWidth} from '../../Helpers/widthHeightHelpers';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'MeetingScheduledScreen'
  >;
  route: RouteProp<AppStackParamList, 'MeetingScheduledScreen'>;
};

const MeetingScheduledScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <Text style={styles.headText}>
          {t('ScheduledMeetingScreen.compatibleTask')}
        </Text>
        <Text style={styles.bodyText}>
          {t('ScheduledMeetingScreen.taskMatched')}
        </Text>
        <Button
          text={t('ScheduledMeetingScreen.toMyRequests')}
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

export default MeetingScheduledScreen;

const styles = StyleSheet.create({
  mainView: {
    marginTop: 158,
  },
  headText: {
    color: COLORS.purpleLight,
    fontSize: getWidth(30),
    alignSelf: 'center',
    fontWeight: '500',
  },
  bodyText: {
    color: COLORS.black,
    fontSize: getWidth(16),
    alignSelf: 'center',
    fontWeight: '300',
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
