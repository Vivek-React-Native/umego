import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthStackParamList } from '../../Constants/AuthStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../Constants/colors';
import Input from '../../Components/Input/Input';
import SelectBox from '../../Components/SelectBox/SelectBox';
import CheckBox from '../../Components/CheckBox/CheckBox';
import Button from '../../Components/Button/Button';
import * as ImagePicker from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import { signUp } from '../../Redux/actions/authActions';
import { SignUpModel } from '../../Models/AuthModels';
import { getAbsolutePath } from '../../Helpers/getAbsolutePath';
import { uploadMedia } from '../../Redux/actions/otherActions';
import RNFetchBlob from 'rn-fetch-blob';
import { API_BASE_URL } from '../../Constants/api';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import { clearStates } from '../../Redux/reducer/reducer';
import SelectList from '../../Components/SelectList/SelectList';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignUpScreen'>;
  route: RouteProp<AuthStackParamList, 'SignUpScreen'>;
};

const country_code = '+972';
const SignUpScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState('');
  const [first_name, setFirst_name] = useState({ data: '', error: false });
  const [last_name, setLast_name] = useState({ data: '', error: false });
  const [email, setEmail] = useState({ data: '', error: false });
  const [phone_no, setPhone_no] = useState({ data: '', error: false });
  const [gender, setGender] = useState({ data: '', error: false });
  const [city, setCity] = useState({ data: 'בחירת עיר', error: false });
  const [image, setImage] = useState({ data: '2', error: false });
  const [imgUrl, setImgUrl] = React.useState<string>('');
  const [allCity, setAllCity] = useState('');
  const [apiMsg, setApiMsg] = useState('');

  const [loadingImage, setLoadingImage] = useState(false);
  const { isFetchingUser, isLoading, success, message } = useAppSelector(
    state => state.global,
  );
  const dispatch = useAppDispatch();
  const handleSelection = (value: boolean, name: string) => {
    if (value) {
      setSelectedItem(name);
      setGender({ data: name, error: false });
    } else setSelectedItem('');
  };

  useEffect(() => {
    // setAllCity([{ 'name': 'Israel', 'id': '1', 'created_at': '2022-06-10T20:17:03.450673Z' }])
    getCountry()
  }, []);

  const getCountry = async () => {
    const endPoint = API_BASE_URL + `/city/get-all-cities/`
    const lng = await AsyncStorage.getItem("lng");
    const headers = {
      "lang": lng == "en" ? "en" : "ar"
    }
    axios.get(endPoint, { headers })
      .then((res) => {
        console.log(res?.data?.data, "===---===");

        setAllCity(res?.data?.data)
      })
      .catch((err) => {
        console.log(err.response, "message error city");
      });
  }

  const onImageLibraryPress = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 720,
      maxHeight: 480,
      quality: 0.5,
    };
    ImagePicker.launchImageLibrary(options, async response => {
      const imageData = new FormData();
      if (!response.didCancel) {
        const selectedimage =
          response?.assets[0].uri!.startsWith('ph://') && Platform.OS === 'ios'
            ? await getAbsolutePath(response?.assets[0].uri!)
            : response?.assets[0].uri!;
        setImgUrl(selectedimage);
        imageData.append('media', {
          uri: selectedimage,
          name: 'image.png',
          fileName: 'image',
          type: 'image/png',
        });
      }

      let file = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].name != null ? response.assets[0].name : response.assets[0].uri,
        size: response.assets[0].fileSize
      }



      const userData = new FormData();
      userData.append(`media`, file)

      console.log(userData, "file.......");

      const endPoint = API_BASE_URL + `/upload/media/`
      const headers = {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
      }
      axios.post(endPoint, userData, { headers })
        .then((res) => {
          console.log(res?.data?.data[0]?.id, "Done req");
          setImage({ data: res?.data?.data[0]?.id, error: false })
        })
        .catch((err) => {
          console.log(err.response, "message error req");
        });


      // setLoadingImage(true);
      // axios({
      //   method: 'post',
      //   url: `${API_BASE_URL}/upload/media/`,
      //   data: imageData,
      // })
      //   .then(function (response) {
      //     console.log(response, "image111---");

      //     setImage({ data: response.data.data[0].id, error: false });
      //     setLoadingImage(false);
      //   })
      //   .then(error => {
      //     console.log('error riased', error);
      //   });
      // setLoadingImage(false);
    });
  };

  const handleSignUp = async () => {
    setApiMsg('')
    let genderdata = "";
    if(gender.data == "גבר"){
      genderdata = "Male"
    }else if(gender.data == "אישה"){
      genderdata = "Female"
    }else if(gender.data == "אחר"){
      genderdata = "Other"
    }else{
      genderdata = "Prefers not to specify"
    }
    let isSendable = true;
    let dataToBeSend = {
      first_name: first_name.data,
      last_name: last_name.data,
      email: email.data,
      // phone_no: phone_no.data,
      phone_no: phone_no.data.charAt(0) == '0' ? phone_no.data.slice(1) : phone_no.data,
      city: city.data,
      country_code,
      image: image.data,
      gender: genderdata,
    };
    console.log(dataToBeSend, "----dataToBeSend----");

    if (first_name.data == '') {
      isSendable = false;
      setFirst_name({ data: '', error: true });
      // return null;
    }
    if (last_name.data == '') {
      isSendable = false;
      setLast_name({ data: '', error: true });
      // return null;
    }
    if (phone_no.data == '') {
      isSendable = false;
      setPhone_no({ data: '', error: true });
      // return null;
    }
    if (email.data == '') {
      isSendable = false;
      setEmail({ data: '', error: true });
      // return null;
    }
    if (city.error || city.data === '') {
      isSendable = false;
      setCity({ data: '', error: true });
      // return null;
    }
    // if (image.error || image.data == '') {
    //   isSendable = false;
    //   setImage({ data: '', error: true });
    //   return null;
    // }


    if (city.error || city.data === '') isSendable = false;
    if (email.error || email.data === '') isSendable = false;
    if (gender.error || gender.data === '') isSendable = false;
    if (last_name.error || last_name.data === '') isSendable = false;
    if (first_name.error || first_name.data === '') isSendable = false;
    if (gender.error || gender.data === '') isSendable = false;

    if (isSendable) {
      await dispatch(signUp(dataToBeSend));
    } else {
      console.log('there are errors');
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(clearStates());
      navigation.navigate('CodeVerificationScreen', {
        shouldNavigateTo: 'BankInfoScreen',
        phone_no: phone_no.data,
        country_code: country_code,
      });
    }
    if (message) {
      setApiMsg(message)
    }
  }, [success, message]);

  return (
    <SafeAreaView onTouchStart={Keyboard.dismiss} style={styles.container}>
      <ScreenHeader
        header={t('signUpScreen.enroll')}
        subHeader={t('signUpScreen.theInfoYouEnter')}
        isHeaderBold={true}
      />
      {loadingImage && (
        <View style={styles.loadingImage}>
          <ActivityIndicator size={50} color="white" />
        </View>
      )}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <View style={styles.formHeader}>
              <View style={styles.imgContainer}>
                {imgUrl ? (
                  <Image
                    style={styles.selectedImage}
                    source={{
                      uri: `${imgUrl}`,
                    }}
                  />
                ) : (
                  <Image
                    style={[
                      styles.profileImage,
                      {
                        borderColor: image.error ? 'red' : 'white',
                        borderWidth: 1,
                      },
                    ]}
                    source={require('../../Assets/Images/profileImage.png')}
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={onImageLibraryPress}>
                <Image source={require('../../Assets/Images/camera.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.formBody}>
              <View style={styles.nameArea}>
                <Input
                  name="last_name"
                  label={t('signUpScreen.lastName')}
                  onTextChanged={(value: string) =>
                    setLast_name({ data: value, error: value === '' })
                  }
                  size="half"
                  required={true}
                  error={last_name.error}
                />
                <Input
                  label={t('signUpScreen.firstName')}
                  onTextChanged={(value: string) =>
                    setFirst_name({ data: value, error: value === '' })
                  }
                  size="half"
                  name="first_name"
                  required={true}
                  error={first_name.error}
                />
              </View>
              <Text
                style={[
                  styles.gender,
                  {
                    color: gender.error ? 'red' : COLORS.text,
                  },
                ]}>
                {t('signUpScreen.gender')}
              </Text>
              <View style={styles.genderArea}>
                <SelectBox
                  name={'מעדיפ/ה לא לציין'}
                  onSelection={handleSelection}
                  text={t('signUpScreen.prefersNotToSpecify')}
                  selected={selectedItem === 'מעדיפ/ה לא לציין'}
                />
                <SelectBox
                  name={'אחר'}
                  onSelection={handleSelection}
                  text={t('signUpScreen.other')}
                  selected={selectedItem === 'אחר'}
                />
                <SelectBox
                  name={'אישה'}
                  onSelection={handleSelection}
                  text={t('signUpScreen.woman')}
                  selected={selectedItem === 'אישה'}
                />
                <SelectBox
                  name={'גבר'}
                  onSelection={handleSelection}
                  text={t('signUpScreen.man')}
                  selected={selectedItem === 'גבר'}
                />
              </View>
              <Input
                label={t('signUpScreen.phoneNumber')}
                placeholder={`+972 ` + t('signUpScreen.phoneNumber')}
                onTextChanged={value =>
                  setPhone_no({ data: value, error: value === '' })
                }
                style={styles.inputStyle}
                size="full"
                name="phone_no"
                error={phone_no.error}
              />
              <Input
                label={t('signUpScreen.email')}
                onTextChanged={value =>
                  setEmail({ data: value, error: value === '' })
                }
                style={styles.inputStyle}
                error={email.error}
                name="email"
              />
              {/* <Input
                label={t('signUpScreen.hometown')}
                onTextChanged={value =>
                  setCity({ data: value, error: value === '' })
                }
                style={styles.inputStyle}
                name="city"
                error={city.error}
                inputValue={city?.data}
              /> */}
              <SelectList
                displayValue="city"
                dataSource={allCity}
                onSelect={(value: any) => {
                  setCity({ data: value, error: value === '' });
                }}
                label={t('createRequestScreen.city')}
                error={city.error}
              />
              <View style={styles.checkbox}>
                <TouchableOpacity onPress={() => Linking.openURL('https://umegoirl.com/terms')}>
                  <Text style={styles.agreeTerms}>
                    {t('signUpScreen.agreeTerms')}
                  </Text>
                </TouchableOpacity>
                <CheckBox onChange={(value: boolean) => console.log(value)} />
              </View>
            </View>
            <Button
              onPress={handleSignUp}
              text={t('signUpScreen.ok')}
              color={COLORS.purpleLight}
              variant="filled"
              corners="curved"
              buttonStyle={styles.button}
              loading={isFetchingUser || isLoading}
              disabled={isFetchingUser || isLoading}
            />
            {(email.error ||
              phone_no.error ||
              last_name.error ||
              first_name.error ||
              city.error) && (
                <Text style={styles.errorText}>{t('allfieldsrequired')}</Text>
              )}
            {apiMsg != '' &&
              <Text style={styles.errorText}>{apiMsg}</Text>
            }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cameraIcon: {
    position: 'absolute',
    right: '60%',
    transform: [{ scale: 1.2 }],
    top: '100%',
  },
  formBody: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  nameArea: {
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'space-between',
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
    marginLeft: 10,
  },
  checkbox: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 13,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  selectedImage: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  profileImage: {
    alignSelf: 'center',
    height: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  imgContainer: {
    width: 120,
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingImage: {
    width: '100%',
    height: '120%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100000,
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    marginVertical: 5,
  },
});
