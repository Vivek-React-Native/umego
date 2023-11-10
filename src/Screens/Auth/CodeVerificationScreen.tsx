import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { AuthStackParamList } from '../../Constants/AuthStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../Constants/colors';
import { getWidth } from '../../Helpers/widthHeightHelpers';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import { verifyCode } from '../../Redux/actions/authActions';
import { CodeVerificationModel } from '../../Models/AuthModels';

type Props = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    'CodeVerificationScreen'
  >;
  route: RouteProp<AuthStackParamList, 'CodeVerificationScreen'>;
};

const CodeVerificationScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isFetchingUser, message, error } = useAppSelector(
    state => state.global,
  );
  const [verificationCode, setVerificationCode] = useState('');
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  const handleVerificationCode = useCallback((value: string) => {
    setVerificationCode(value);
  }, []);

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardIsOpen(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardIsOpen(false);
  });
  console.log(route.params.shouldNavigateTo)
  const handlePress = () => {
    if (route.params.shouldNavigateTo) {
      let dataToBeSend: CodeVerificationModel = {
        phone_no: route?.params?.phone_no.charAt(0) == '0' ? route?.params?.phone_no.slice(1) : route?.params?.phone_no,
        country_code: route.params?.country_code,
        otp: verificationCode,
      };
      dispatch(verifyCode(dataToBeSend));
      navigation.navigate(route.params.shouldNavigateTo);
    }
    if (!route.params.shouldNavigateTo) {
      let dataToBeSend: CodeVerificationModel = {
        phone_no: route?.params?.phone_no.charAt(0) == '0' ? route?.params?.phone_no.slice(1) : route?.params?.phone_no,
        country_code: route.params?.country_code,
        otp: verificationCode,
      };
      dispatch(verifyCode(dataToBeSend));
    }
    // route.params.shouldNavigateTo &&
    //   navigation.navigate(route.params.shouldNavigateTo);
    // if (!route.params.shouldNavigateTo) {
    //   let dataToBeSend: CodeVerificationModel = {
    //     phone_no: route.params?.phone_no,
    //     country_code: route.params?.country_code,
    //     otp: verificationCode,
    //   };
    //   dispatch(verifyCode(dataToBeSend));
    // }
  };

  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader
        header={t('codeVerificationScreen.phoneNumberVerification')}
        isHeaderBold={true}
        showBackButton={true}
      />
      <View style={styles.form}>
        <Text style={styles.formHeader}>
          {t('codeVerificationScreen.dontKnow')} {route.params?.phone_no}
        </Text>
        <Input
          label={t('codeVerificationScreen.verificationCode')}
          error={t('codeVerificationScreen.incorrectCode')}
          onTextChanged={handleVerificationCode}
        />
        <Button
          text={
            route.params.shouldNavigateTo
              ? t('codeVerificationScreen.ok')
              : t('codeVerificationScreen.login')
          }
          variant="filled"
          size="xlarge"
          corners="curved"
          color={COLORS.purpleLight}
          onPress={handlePress}
          buttonStyle={styles.button}
          loading={isFetchingUser}
          disabled={isFetchingUser}
        />

        <Text style={styles.subText}>
          {t('codeVerificationScreen.didNotReceiveMessage')}
        </Text>
        <Text style={styles.registerText}>
          {t('codeVerificationScreen.sendSmsAgain')}
        </Text>
        {error && <Text style={styles.error}>{message}</Text>}
      </View>
      {!keyboardIsOpen &&
        <View style={styles.bottomImages}>
          <Image
            style={styles.peopleImage}
            source={require('../../Assets/Images/people2.png')}
          />
          <Image source={require('../../Assets/Images/people_bottom.png')} />
        </View>
      }
    </SafeAreaView>
  );
};

export default CodeVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: COLORS.purpleLight,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: getWidth(33),
  },
  subText: {
    alignSelf: 'center',
    color: COLORS.text,
    fontSize: getWidth(16),
    marginVertical: 5,
  },
  form: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: '5%',
    paddingVertical: 20,
  },
  formHeader: {
    alignSelf: 'flex-start',
    color: COLORS.text,
    marginBottom: 10,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    marginTop: 40,
  },
  registerText: {
    color: COLORS.blue,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  error: {
    alignSelf: 'center',
    color: COLORS.error,
    fontStyle: 'italic',
  },
  bottomImages: {
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
  },
  peopleImage: {
    marginBottom: -20,
    zIndex: 10,
  },
  arrowRight: {
    padding: 7,
    position: 'absolute',
    right: 15,
    top: 8,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    width: '100%',
  },
});
