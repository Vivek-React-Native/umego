import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Input from '../../Components/Input/Input';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {COLORS} from '../../Constants/colors';
import {CreateOrUpdateBankDetailsModel} from '../../Models/UserModels';
import {getWidth} from '../../Helpers/widthHeightHelpers';
import {AppStackParamList} from '../../Constants/AppStackParamList';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'BankInfoScreen'>;
  route: RouteProp<AppStackParamList, 'BankInfoScreen'>;
};

const values: CreateOrUpdateBankDetailsModel = {
  bank_name: '',
  full_name: '',
  bank_branch: '',
  account_number: '',
};

export type FormErrors = {
  bank_name: string;
  full_name: string;
  bank_branch: string;
  account_number: string;
};
const errors: FormErrors = {
  bank_name: '',
  full_name: '',
  bank_branch: '',
  account_number: '',
};

const BankAccInfoScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();

  const [formValues, setFormValues] =
    useState<CreateOrUpdateBankDetailsModel>(values);
  const [formErrors, setFormErrors] = useState<FormErrors>(values);

  const {profileInfo} = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const handleFormValues = (value: string, name: string) => {
    setFormValues({...formValues, [name]: value});
    setFormErrors({...formErrors, [name]: value === '' ? true : false});
  };

  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader
        header={t('bankInfoScreen.bankInfo')}
        showBackButton={true}
        isHeaderBold={true}
      />
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formBody}>
            <Input
              name="bank_name"
              onTextChanged={handleFormValues}
              label={t('bankInfoScreen.bank')}
              inputValue={profileInfo?.bank_name}
              editable={false}
            />
            <View style={styles.nameArea}>
              <Input
                label={t('bankInfoScreen.accountNumber')}
                name="account_number"
                onTextChanged={handleFormValues}
                size="half"
                keyboardType="number-pad"
                editable={false}
                style={styles.inputStyle}
                inputValue={profileInfo?.account_number}
              />
              <View style={{width: 20}} />
              <Input
                label={t('bankInfoScreen.branchNumber')}
                name="bank_branch"
                onTextChanged={handleFormValues}
                editable={false}
                size="half"
                style={styles.inputStyle}
                inputValue={profileInfo?.bank_branch}
                keyboardType="number-pad"
              />
            </View>
            <Input
              label={t('bankInfoScreen.fullName')}
              name="full_name"
              onTextChanged={handleFormValues}
              style={styles.inputStyle}
              editable={false}
              inputValue={profileInfo?.full_name}
              size="full"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BankAccInfoEdit');
              }}>
              <Image
                style={styles.editImage}
                source={require('../../Assets/Images/edit.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{textAlign: 'center'}}>
          {t('bankInfoScreen.willNeverUse')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankAccInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
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
  inputStyle: {
    width: null,
    flex: 1,
    margin: 0,
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
    paddingHorizontal: 10,
    marginTop: 10,
  },
  nameArea: {
    flexDirection: 'row-reverse',
    flex: 1,
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
});
