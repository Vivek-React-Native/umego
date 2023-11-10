import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Input from '../../Components/Input/Input';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../Constants/colors';
import {getWidth} from '../../Helpers/widthHeightHelpers';
import {useAppSelector} from '../../Redux/store/store';
import {CreditCardInfoModel, FormErrors} from '../Auth/CreditCardInfoScreen';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'CreditCardScreen'>;
  route: RouteProp<AppStackParamList, 'CreditCardScreen'>;
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
const CreditCardScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const [formValues, setFormValues] = useState<CreditCardInfoModel>(values);
  const [formErrors, setFormErrors] = useState<FormErrors>(errors);
  const {isLoading, profileInfo} = useAppSelector(state => state.global);
  const handleFormValues = (value: string, name: string) => {
    setFormValues({...formValues, [name]: value});
    setFormErrors({...formErrors, [name]: value === '' ? true : false});
  };
  const handleCardInfo = () => {
    let dataToBeSend = formValues;
    let isSendable = true;

    if (formErrors.card_number || formValues.card_number === '')
      isSendable = false;
    if (formErrors.full_name || formValues.full_name === '') isSendable = false;
    if (formErrors.cvv || formValues.cvv === 0) isSendable = false;
    if (formErrors.date || formValues.date === '') isSendable = false;
    navigation.navigate('HomeScreen');
    if (isSendable) {
      // await dispatch(createOrUpdateBankDetails(dataToBeSend));
      // need an api for creating card info
    } else {
    }
  };
  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader
        header={t('creaditCardInfoScreen.creditDetails')}
        showBackButton={true}
        isHeaderBold={true}
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
            onTextChanged={() => {}}
            size="full"
            editable={false}
          />

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("BankAccInfoEdit");
            }}
          >
            <Image
              style={styles.editImage}
              source={require("../../Assets/Images/edit.png")}
            />
          </TouchableOpacity> */}
        </View>
        <Button
          onPress={handleCardInfo}
          text={t('creaditCardInfoScreen.ok')}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          buttonStyle={styles.button}
        />
        <Text style={styles.infoText}>
          {t('creaditCardInfoScreen.willNeverUse')}
        </Text>
      </View>
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

export default CreditCardScreen;

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
    marginHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  formBody: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  formHeader: {
    backgroundColor: COLORS.white,
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
  editImage: {
    height: getWidth(20),
    width: getWidth(20),
    marginHorizontal: 10,
    alignSelf: 'flex-end',
  },
  inputStyle: {
    marginHorizontal: 5,
    flex: 1,
  },
  profileImage: {
    transform: [{scale: 1.5}],
    alignSelf: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    top: '145%',
    right: '50%',
    transform: [{scale: 1.2}],
  },
  //   formBody: {
  //     paddingHorizontal: 10,
  //     marginTop: 10,
  //     flex: 1,
  //   },
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
    paddingVertical: 10,
  },
  infoText: {
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 12,
  },
  bottomImages: {
    alignItems: 'center',
  },
  peopleImage: {
    marginBottom: -15,
  },
});
