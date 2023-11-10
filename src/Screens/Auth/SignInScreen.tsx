import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {AuthStackParamList} from '../../Constants/AuthStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../Constants/colors';
import {getWidth} from '../../Helpers/widthHeightHelpers';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {signin} from '../../Redux/actions/authActions';
import {LoginModel} from '../../Models/AuthModels';
import {clearStates} from '../../Redux/reducer/reducer';
import CheckBox from '../../Components/CheckBox/CheckBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignInScreen'>;
  route: RouteProp<AuthStackParamList, 'SignInScreen'>;
};

const SignInScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {isFetchingUser, error, message, success} = useAppSelector(
    state => state.global,
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [terms, setTerms] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [lang, setLang] = useState('');
  const handlePhoneNumber = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const handlePress = async () => {
    if (phoneNumber !== '' && terms) {
      let dataToBeSent: LoginModel = {
        country_code: '+972',
        phone_no:
          phoneNumber.charAt(0) == '0' ? phoneNumber.slice(1) : phoneNumber,
      };
      console.log(dataToBeSent, '.....');

      await dispatch(signin(dataToBeSent));
    } else {
      setPhoneError(true);
    }
  };

  Keyboard.addListener('keyboardDidShow', () => {
    setKeyboardIsOpen(true);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardIsOpen(false);
  });

  useEffect(() => {
    if (success) {
      dispatch(clearStates());
      if (phoneNumber.length != 0) {
        navigation.navigate('CodeVerificationScreen', {
          shouldNavigateTo: undefined,
          country_code: '+972',
          phone_no:
            phoneNumber.charAt(0) == '0' ? phoneNumber.slice(1) : phoneNumber,
        });
      }
    }
  }, [success]);

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
  };

  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader
        header={t('signInScreen.login')}
        subHeader={t('signInScreen.goodToSeeYou')}
        isHeaderBold={true}
        isSubheaderBold={true}
      />

      <View style={styles.form}>
        <Text style={styles.formHeader}>
          {t('signInScreen.enterMobileVerificationWillBeSent')}
        </Text>
        <Input
          label={t('signInScreen.phoneNumber')}
          placeholder={`+972 ` + t('signInScreen.phoneNumber')}
          error={(error || phoneError) && t('signInScreen.error')}
          onTextChanged={handlePhoneNumber}
          keyboardType="phone-pad"
        />

        <View style={styles.checkbox}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                lang == 'en'
                  ? 'https://umegoirl.com/terms_en'
                  : 'https://umegoirl.com/terms',
              )
            }>
            <Text style={styles.agreeTerms}>
              {t('signUpScreen.agreeTerms')}
            </Text>
          </TouchableOpacity>
          <CheckBox onChange={(value: boolean) => setTerms(value)} />
        </View>
        <Button
          text={t('signInScreen.ok')}
          variant="filled"
          size="xlarge"
          corners="curved"
          loading={isFetchingUser}
          disabled={isFetchingUser}
          color={COLORS.purpleLight}
          onPress={() => handlePress()}
          buttonStyle={styles.button}
        />
        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate('SignUpScreen')}>
          {t('signInScreen.firstTimeHereRegister')}
        </Text>
        {error && <Text style={styles.error}>{message}</Text>}
      </View>
      {!keyboardIsOpen && (
        <View style={styles.bottomImages}>
          <Image
            style={styles.peopleImage}
            source={require('../../Assets/Images/people1.png')}
          />
          <Image
            style={styles.bottomImage}
            source={require('../../Assets/Images/people_bottom.png')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkbox: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 13,
    paddingHorizontal: 15,
  },
  agreeTerms: {
    color: COLORS.blue,
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  headerText: {
    color: COLORS.purpleLight,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: getWidth(22),
  },
  subText: {
    alignSelf: 'center',
    color: COLORS.text,
    fontSize: getWidth(16),
    fontWeight: 'bold',
  },
  form: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: '8%',
    paddingVertical: 20,
  },
  formHeader: {
    alignSelf: 'center',
    color: COLORS.text,
    marginBottom: 10,
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
    marginTop: 13,
  },
  bottomImages: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  peopleImage: {
    zIndex: 10,
    transform: [{scale: 0.8}],
  },
  error: {
    alignSelf: 'center',
    color: COLORS.error,
    fontStyle: 'italic',
  },
  bottomImage: {
    bottom: 40,
  },
});
