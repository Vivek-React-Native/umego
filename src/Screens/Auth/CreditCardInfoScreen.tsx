import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Input from '../../Components/Input/Input';
import { AuthStackParamList } from '../../Constants/AuthStackParamList';
import Button from '../../Components/Button/Button';
import CheckBox from '../../Components/CheckBox/CheckBox';
import { COLORS } from '../../Constants/colors';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import { clearStates } from '../../Redux/reducer/reducer';

type Props = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    'CreditCardInfoScreen'
  >;
  route: RouteProp<AuthStackParamList, 'CreditCardInfoScreen'>;
};
export type CreditCardInfoModel = {
  card_number: string;
  date: string;
  cvv: number;
  full_name: string;
};

const values: CreditCardInfoModel = {
  card_number: '',
  date: '',
  cvv: 0,
  full_name: '',
};

export type FormErrors = {
  card_number: boolean;
  date: boolean;
  cvv: boolean;
  full_name: boolean;
};
const errors: FormErrors = {
  card_number: false,
  date: false,
  cvv: false,
  full_name: false,
};
const CreditCardInfoScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<CreditCardInfoModel>(values);
  const [formErrors, setFormErrors] = useState<FormErrors>(errors);
  const { success, isLoading, error } = useAppSelector(state => state.global);
  const handleFormValues = (value: string, name: string) => {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: value === '' ? true : false });
  };
  const [generalError, setGeneralError] = useState(false);

  const handleCardInfo = () => {
    let dataToBeSend = formValues;
    let isSendable = true;

    if (formErrors.card_number || formValues.card_number === '')
      isSendable = false;
    if (formErrors.full_name || formValues.full_name === '') isSendable = false;
    if (formErrors.cvv || formValues.cvv === 0) isSendable = false;
    if (formErrors.date || formValues.date === '') isSendable = false;
    navigation.navigate('WelcomeScreen');
    if (isSendable) {
      // await dispatch(createOrUpdateBankDetails(dataToBeSend));
      // need an api for creating card info
    } else {
      setGeneralError(true);
    }
  };
  // useEffect(() => {
  //   if (!isLoading && success) {
  //     navigation.navigate('WelcomeScreen');
  //   }
  // }, [success]);

  useEffect(() => {
    dispatch(clearStates());
  }, []);

  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader
        header={t('creaditCardInfoScreen.creditDetails')}
        showBackButton={true}
        isHeaderBold={true}
        subHeader={t('creaditCardInfoScreen.toMakeAPayment')}
      />
      <View style={styles.form}>
        <View style={styles.formBody}>
          <Input
            onTextChanged={handleFormValues}
            label={t('creaditCardInfoScreen.creditNumber')}
            keyboardType="number-pad"
            name="card_number"
          />
          <View style={styles.nameArea}>
            <Input
              label={t('creaditCardInfoScreen.cvv')}
              onTextChanged={handleFormValues}
              size="half"
              keyboardType="number-pad"
              placeholder="CVV"
              name="cvv"
            />
            <Input
              label={t('creaditCardInfoScreen.validity')}
              onTextChanged={handleFormValues}
              size="half"
              keyboardType="number-pad"
              placeholder="MM/YY"
              cardInput={true}
              name="date"
            />
          </View>
          <Input
            label={t('creaditCardInfoScreen.fullName')}
            onTextChanged={handleFormValues}
            style={styles.inputStyle}
            size="full"
            name="full_name"
          />
        </View>
        <Button
          onPress={handleCardInfo}
          text={t('creaditCardInfoScreen.ok')}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          buttonStyle={styles.button}
        />
        <Text
          style={styles.agreeTerms}
          onPress={() => navigation.navigate('WelcomeScreen')}>
          {t('creaditCardInfoScreen.skip')}
        </Text>
        {error && <Text style={styles.error}>{t('somethingWentWrong')}</Text>}
      </View>
      <Text style={styles.infoText}>
        {t('creaditCardInfoScreen.willNeverUse')}
      </Text> 
      <View style={styles.bottomImages}>
        <Image
          style={styles.peopleImage}
          source={require('../../Assets/Images/people3.png')}
        />
        <Image source={require('../../Assets/Images/people_bottom.png')} />
      </View>
    </SafeAreaView>
  );
};

export default CreditCardInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 10,
    marginTop: 15,
    elevation: 2,
    paddingBottom: 10,
    width: '92%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  formHeader: {
    backgroundColor: COLORS.lightPurple,
    paddingVertical: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  profileImage: {
    transform: [{ scale: 1.5 }],
    alignSelf: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    top: '145%',
    right: '50%',
    transform: [{ scale: 1.2 }],
  },
  formBody: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  nameArea: {
    flexDirection: 'row-reverse',
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  genderArea: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gender: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputStyle: {
    marginTop: 15,
  },
  agreeTerms: {
    color: COLORS.blue,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  checkbox: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 13,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 25,
  },
  infoText: {
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 12,
  },
  bottomImages: {
    alignItems: 'center',
    position: 'absolute',
    bottom: '3%',
    left: 0,
    right: 0,
  },
  peopleImage: {
    marginBottom: -40,
    zIndex: 10,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});
