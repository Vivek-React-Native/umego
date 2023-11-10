import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../../Components/Card/Card';
import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../Constants/AppStackParamList';
import { RouteProp } from '@react-navigation/native';
import { getWidth, getWidthStr } from '../../Helpers/widthHeightHelpers';
import Drawer from '../../Components/Drawer/Drawer';
import Line from '../../Components/Line/Line';
import Button from '../../Components/Button/Button';
import { COLORS } from '../../Constants/colors';
import Header from '../../Components/ScreenHeader/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import { UpdateProfileModel } from '../../Models/UserModels';
import { updateProfile } from '../../Redux/actions/otherActions';
import * as ImagePicker from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import Input from '../../Components/Input/Input';
import { getAbsolutePath } from '../../Helpers/getAbsolutePath';
import { API_BASE_URL } from '../../Constants/api';
import axios from 'axios';
import { getProfileInfo } from '../../Redux/actions/otherActions';
import SelectList from '../../Components/SelectList/SelectList';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'MyProfileScreen'>;
  route: RouteProp<AppStackParamList, 'MyProfileScreen'>;
};

export type FormErrors = {
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  gender: string;
};

const MyProfileScreen = ({ navigation, route }: Props) => {
  const { isLoading, profileInfo } = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<any>(profileInfo);
  const [allCity, setAllCity] = useState('');
  const [city, setCity] = useState({ data: profile.city, error: false });

  const didMount = React.useRef(false);

  useEffect(() => {
    async function getData() {
      await dispatch(getProfileInfo());
    }
    getData();
  }, []);

  useEffect(() => {
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
        setAllCity(res?.data?.data)
      })
      .catch((err) => {
        console.log(err.response, "message error city");
      });
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (profileInfo) {
      setProfile(profileInfo);
    }
  }, [profileInfo]);

  const values: UpdateProfileModel = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    city: city.data,
    gender: profile.gender,
  };

  const errors: FormErrors = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    city: profile.city,
    gender: profile.gender,
  };

  const [formValues, setFormValues] = useState<UpdateProfileModel>(values);
  const [formErrors, setFormErrors] = useState<FormErrors>(errors);
  const [gender, setGender] = useState(profile.gender);
  const [imageURL, setImageURL] = useState(profile?.image?.media_file_url);
  const [generalError, setGeneralError] = useState(false);

  const handleFormValues = (value: string, name: string) => {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: value === '' ? true : false });
  };

  const handleProfileData = async () => {
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
    let dataToBeSend = formValues;
    console.log(dataToBeSend, "....>><<,,..");
    let isSendable = true;
    if (
      (formErrors.first_name && formErrors.first_name === '') ||
      formValues.first_name === ''
    )
      isSendable = false;
    if (
      (formErrors.last_name && formErrors.last_name === '') ||
      formValues.last_name === ''
    )
      isSendable = false;
    if (
      (formErrors.email && formErrors.email === '') ||
      formValues.email === ''
    )
      isSendable = false;
    if ((formErrors.city && formErrors.city === '') || formValues.city === '')
      isSendable = false;
    if (
      (formErrors.gender && formErrors.gender === '') ||
      formValues.gender === ''
    )
      isSendable = false;

    if (isSendable) {
      await dispatch(updateProfile(dataToBeSend));
      navigation.navigate('MyProfileScreen');
    } else {
      setGeneralError(true);
    }
  };

  function onImagePress() {
    const options: ImagePicker.ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 720,
      maxHeight: 480,
      quality: 0.5,
    };
    ImagePicker.launchImageLibrary(options, async response => {
      if (!response.didCancel) {
        const image =
          response?.assets[0].uri!.startsWith('ph://') && Platform.OS === 'ios'
            ? await getAbsolutePath(response?.assets[0].uri!)
            : response?.assets[0].uri!;
        setImageURL(image);

        if (Platform.OS === 'ios') {
          uploadImage(image);
        } else {
          let file = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].name != null ? response.assets[0].name : response.assets[0].uri,
            size: response.assets[0].size
          }
          uploadImage(file)
        }

      }
    });
  }

  function uploadImage(image) {

    const endPoint = API_BASE_URL + `/upload/media/`
    const headers = {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
    }
    const imageData = new FormData();
    imageData.append('media', image)
    axios.post(endPoint, imageData, { headers })
      .then((res) => {
        console.log(res, "-------");
        setFormValues({ ...formValues, image: res.data.data[0].id });
      })
      .catch((err) => {
        console.log(err.response, "message error");
      });

    // const imageData = new FormData();
    // imageData.append('media', {
    //   uri: image,
    //   name: 'image.png',
    //   fileName: 'image',
    //   type: 'image/png',
    // });
    // axios({
    //   method: 'post',
    //   url: `${API_BASE_URL}/upload/media/`,
    //   data: imageData,
    // })
    //   .then(function (response) {
    //     setFormValues({ ...formValues, image: response.data.data[0].id });
    //   })
    //   .then(error => {
    //     console.log('error riased', error);
    //   });
  }

  function renderGender() {
    return (
      <View style={styles.flex1}>
        <TouchableOpacity
          onPress={() => {
            setGender(t('signUpScreen.man'));
            // handleFormValues(t('signUpScreen.man'), 'gender');
            handleFormValues("Male", 'gender');
          }}>
          <Text
            style={
              gender === t('signUpScreen.man')
                ? styles.buttons_2
                : styles.buttons_
            }>
            {' '}
            {t('signUpScreen.man')}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGender(t('signUpScreen.woman'));
            // handleFormValues(t('signUpScreen.woman'), 'gender');
            handleFormValues("Female", 'gender');
          }}>
          <Text style={gender === t('signUpScreen.woman') ? styles.buttons_2 : styles.buttons_}>
            {' '}
            {t('signUpScreen.woman')}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGender(t('signUpScreen.other'));
            // handleFormValues(t('signUpScreen.other'), 'gender');
            handleFormValues("Other", 'gender');
          }}>
          <Text
            style={
              gender === t('signUpScreen.other')
                ? styles.buttons_2
                : styles.buttons_
            }>
            {' '}
            {t('signUpScreen.other')}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGender(t('signUpScreen.prefersNotToSpecify'));
            // handleFormValues(t('signUpScreen.prefersNotToSpecify'), 'gender');
            handleFormValues("Prefers not to specify", 'gender');
          }}>
          <Text
            style={
              gender === t('signUpScreen.prefersNotToSpecify')
                ? styles.buttons_2
                : styles.buttons_
            }>
            {' '}
            {t('signUpScreen.prefersNotToSpecify')}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log(profile, "-----profile----")

  return (
    <>
      {isLoading && (
        <View style={styles.isLoading}>
          <ActivityIndicator size={50} color="white" />
        </View>
      )}
      <SafeAreaView>
        <Header header={t('editProfile')} showBackButton />
        <ScrollView style={styles.container}>
          <View style={styles.box}>
            <View>
              <Image style={styles.image} source={{ uri: imageURL }} />
              <TouchableOpacity
                style={{ position: 'absolute', left: 120, bottom: -18 }}
                onPress={() => {
                  onImagePress();
                }}>
                <Image
                  style={styles.editImageProfile}
                  source={require('../../Assets/Images/camera.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flex1}>
            <Input
              label={t('signUpScreen.firstName')}
              size="half"
              name="first_name"
              inputValue={profile.first_name}
              onTextChanged={handleFormValues}
              error={generalError}
            />
            <Input
              label={t('signUpScreen.lastName')}
              onTextChanged={handleFormValues}
              size="half"
              name="last_name"
              inputValue={profile.last_name}
            />
          </View>
          <Text style={styles.top}>{t('signUpScreen.gender')}</Text>

          {renderGender()}

          <Input
            label={t('signUpScreen.phoneNumber')}
            onTextChanged={handleFormValues}
            size="full"
            name="phone_no"
            editable={false}
            inputValue={`${profile.country_code + profile.phone_no}`}
          />
          <Input
            label={t('signUpScreen.email')}
            onTextChanged={handleFormValues}
            size="full"
            inputValue={profile.email}
            name="email"
          />
          {/* <Input
            label={t('signUpScreen.hometown')}
            onTextChanged={handleFormValues}
            size="full"
            inputValue={profile.city}
            name="city"
          /> */}
          <SelectList
            displayValue="city"
            dataSource={allCity}
            onSelect={(value: any) => {
              handleFormValues(value, 'city');
            }}
            label={t('createRequestScreen.city')}
            error={city.error}
          />
          <View style={styles.button}>
            <View style={styles.btn}>
              <Button
                size="xlarge"
                text={t('bankAccInfoEdit.keeping')}
                onPress={handleProfileData}
                color={COLORS.purpleLight}
                variant="filled"
                corners="curved"
                buttonStyle={styles.buttonStyle}
              />
            </View>
            <View style={styles.btn}>
              <Button
                size="xlarge"
                text={t('bankAccInfoEdit.cancelation')}
                onPress={() => {
                  navigation.goBack();
                }}
                color={COLORS.light}
                variant="outlined"
                corners="curved"
                buttonStyle={styles.buttonStyle}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignSelf: 'center',
  },
  btn: {
    width: '100%',
    paddingHorizontal: 7,
  },
  editImageProfile: {
    height: getWidth(40),
    width: getWidth(40),
  },
  buttonStyle: {
    paddingVertical: 10,
  },
  image: {
    width: 92,
    height: 126,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
  },
  flex1: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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

  flex: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 130,
  },
  flex2: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 10,
  },
  box: {
    backgroundColor: COLORS.lightPurple,
    width: '90%',
    height: 159,
    borderRadius: 12,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
  },
  box2: {
    marginTop: 50,
    marginLeft: -170,
    display: 'flex',
    flexDirection: 'row',
  },

  box3: {
    marginLeft: -107,
    marginTop: 80,
    display: 'flex',
    flexDirection: 'row',
  },
  box4: {
    marginLeft: -103,
    marginTop: 110,
    display: 'flex',
    flexDirection: 'row',
  },
  boxText: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '700',
  },
  headings: {
    marginTop: 40,
    marginLeft: -150,
  },
  texts: {
    marginRight: 90,
    marginTop: 31,
    fontSize: 18,
    fontWeight: '400',
    color: '#8D7BAF',
  },
  texts1: {
    marginLeft: -160,
    marginTop: 28,
    fontSize: 14,
    fontWeight: '400',
    color: '#323233',
  },
  line: {
    marginTop: 11,
  },
  subHeader: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
    color: '#000',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    width: '50%',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
  },
  containerStyle: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '8%',
  },
  cardsHeaderText: {
    fontSize: 17,
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  scroll: {
    paddingBottom: getWidthStr(10),
    alignItems: 'center',
  },
  card: {
    width: '95%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    height: getWidthStr(22),
  },
  title: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 17,
  },
  cardBody: {
    paddingHorizontal: 5,
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBox: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imgAndText: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 17,
  },
  top1: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 14,
    textAlign: 'left',
    marginTop: 17,
  },
  imgAndText2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginRight: -10,
  },

  buttons_: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 8,
  },
  buttons_2: {
    borderWidth: 1,
    borderColor: '#8D7BAF',
    backgroundColor: '#EDEFFF',
    textAlign: 'center',
    marginRight: 5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: '400',
    fontSize: 14,
  },
  buttons_1: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // height: 40,
    // width: 115,
    textAlign: 'center',
    paddingVertical: 10,
    marginRight: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  rightSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '65%',
  },
});
