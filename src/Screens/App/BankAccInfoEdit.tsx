import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Input from '../../Components/Input/Input';
import {AuthStackParamList} from '../../Constants/AuthStackParamList';
import Button from '../../Components/Button/Button';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {COLORS} from '../../Constants/colors';
import {CreateOrUpdateBankDetailsModel} from '../../Models/UserModels';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {createOrUpdateBankDetails} from '../../Redux/actions/otherActions';
import {getWidth} from '../../Helpers/widthHeightHelpers';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {useSelector} from 'react-redux';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'BankInfoScreen'>;
  route: RouteProp<AppStackParamList, 'BankInfoScreen'>;
};

export type FormErrors = {
  bank_name: string;
  full_name: string;
  bank_branch: string;
  account_number: string;
};

const BankAccInfoEdit = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const {isLoading, profileInfo, success} = useAppSelector(
    state => state.global,
  );
  const values: CreateOrUpdateBankDetailsModel = {
    bank_name: profileInfo.bank_name,
    full_name: profileInfo.full_name,
    bank_branch: profileInfo.bank_branch,
    account_number: profileInfo.account_number,
  };

  const errors: FormErrors = {
    bank_name: profileInfo.bank_name,
    full_name: profileInfo.full_name,
    bank_branch: profileInfo.bank_branch,
    account_number: profileInfo.account_number,
  };

  const [formValues, setFormValues] =
    useState<CreateOrUpdateBankDetailsModel>(values);
  const [formErrors, setFormErrors] = useState<FormErrors>(errors);
  const [generalError, setGeneralError] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormValues = (value: string, name: string) => {
    setFormValues({...formValues, [name]: value});
    setFormErrors({...formErrors, [name]: value === '' ? true : false});
  };

  const handleBankInformation = async () => {
    let dataToBeSend = formValues;
    let isSendable = true;
    if (
      (formErrors.bank_name && formErrors.bank_name === '') ||
      formValues.bank_name === ''
    )
      isSendable = false;
    if (
      (formErrors.full_name && formErrors.full_name === '') ||
      formValues.full_name === ''
    )
      isSendable = false;
    if (
      (formErrors.bank_branch && formErrors.bank_branch === '') ||
      formValues.bank_branch === ''
    )
      isSendable = false;
    if (
      (formErrors.account_number && formErrors.account_number === '') ||
      formValues.account_number === ''
    )
      isSendable = false;

    if (isSendable) {
      await dispatch(createOrUpdateBankDetails(dataToBeSend));
    } else {
      setGeneralError(true);
    }
  };
  useEffect(() => {
    if (!isLoading && success) {
      navigation.navigate('MyProfileScreen');
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader
        header={t('bankInfoScreen.bankInfo')}
        showBackButton={true}
        isHeaderBold={true}
      />

      {isLoading && (
        <View style={styles.isLoading}>
          <ActivityIndicator size={50} color="white" />
        </View>
      )}
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formBody}>
            <Input
              name="bank_name"
              onTextChanged={handleFormValues}
              style={styles.inputStyle}
              label={t('bankInfoScreen.bank')}
              inputValue={profileInfo?.bank_name}
              error={generalError}
            />

            <View style={styles.nameArea}>
              <Input
                label={t('bankInfoScreen.accountNumber')}
                name="account_number"
                onTextChanged={handleFormValues}
                size="half"
                style={styles.inputStyle}
                keyboardType="number-pad"
                inputValue={profileInfo?.account_number}
                error={generalError}
              />
              <Input
                label={t('bankInfoScreen.branchNumber')}
                name="bank_branch"
                onTextChanged={handleFormValues}
                style={styles.inputStyle}
                size="half"
                inputValue={profileInfo?.bank_branch}
                keyboardType="number-pad"
                error={generalError}
              />
            </View>
            <Input
              label={t('bankInfoScreen.fullName')}
              name="full_name"
              onTextChanged={handleFormValues}
              style={styles.inputStyle}
              inputValue={profileInfo?.full_name}
              size="full"
              error={generalError}
            />
            <View style={styles.buttonView}>
              <Button
                text={t('bankAccInfoEdit.keeping')}
                variant="filled"
                corners="curved"
                color={COLORS.purpleLight}
                onPress={() => {
                  handleBankInformation();
                }}
                buttonStyle={styles.button}
                loading={isLoading}
              />

              <Button
                text={t('bankAccInfoEdit.cancelation')}
                corners="curved"
                color={COLORS.purpleLight}
                onPress={() => {
                  navigation.goBack();
                }}
                buttonStyle={[styles.button]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankAccInfoEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
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
    transform: [{scale: 1.5}],
    alignSelf: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    top: '145%',
    right: '50%',
    transform: [{scale: 1.2}],
  },
  formBody: {
    // paddingHorizontal: 10,
    marginTop: 10,
  },
  nameArea: {
    flexDirection: 'row-reverse',
    flex: 1,
    marginTop: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    alignItems: 'center',
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
    marginHorizontal: 5,
    flex: 1,
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
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertical: 10,
    flex: 1,
  },
  infoText: {
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 12,
  },
  editImage: {
    height: getWidth(20),
    width: getWidth(20),
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  isLoading: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100000,
  },
});
