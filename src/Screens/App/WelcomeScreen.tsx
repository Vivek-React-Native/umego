import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import Button from '../../Components/Button/Button';
import { COLORS } from '../../Constants/colors';

import { AuthStackParamList } from '../../Constants/AuthStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useAppDispatch } from '../../Redux/store/store';
import { clearStates } from '../../Redux/reducer/reducer';
import { AppStackParamList } from '../../Constants/AppStackParamList';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'WelcomeScreen'>;
  route: RouteProp<AppStackParamList, 'WelcomeScreen'>;
};

const WelcomeScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigateToSignIn = () => navigation.navigate('HomeScreen');
  // useEffect(() => {
  //   navigation.navigate('HomeScreen');
  //   // dispatch(clearStates());
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        header={t('welcomeScreen.welcome')}
        subHeader={t('welcomeScreen.yourRegistrationEnded')}
        isHeaderBold={true}
        showBackButton={true}
      />
      <Image
        source={require('../../Assets/Images/welcome.png')}
        style={styles.image}
      />
      <Text style={styles.text}>{t('welcomeScreen.needHelp')}</Text>
      <View style={styles.buttons}>
        <Button
          onPress={navigateToSignIn}
          size="xlarge"
          color={COLORS.purpleLight}
          corners="curved"
          text={t('welcomeScreen.createRequest')}
          variant="filled"
          buttonStyle={styles.button}
        />
        <Button
          onPress={navigateToSignIn}
          size="xlarge"
          color={COLORS.purpleLight}
          corners="curved"
          text={t('welcomeScreen.toHome')}
          buttonStyle={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    marginVertical: 10,
  },
  buttons: {
    position: 'absolute',
    bottom: '37%',
    width: '90%',
    alignItems: 'center',
  },
  text: {
    color: COLORS.text,
    alignSelf: 'center',
    marginTop: 40,
    fontSize: 18,
  },
  image: {
    marginTop: 40,
  },
});
