import {
  ActivityIndicator,
  AppState,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {getWidth, getWidthStr} from '../../Helpers/widthHeightHelpers';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import Drawer from '../../Components/Drawer/Drawer';
import Line from '../../Components/Line/Line';
import Person from '../../Components/Person/Person';
import {getProfileInfo, updateProfile} from '../../Redux/actions/otherActions';
import {getAllMyTask} from '../../Redux/actions/taskAction';
import {ReportTaskModel} from '../../Models/TaskModels';
import {SignUpModel} from '../../Models/AuthModels';
import {COLORS} from '../../Constants/colors';
import {formatDate} from '../../Helpers/FormatDate';
import {clearStates} from '../../Redux/reducer/reducer';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {API_BASE_URL} from '../../Constants/api';
import {UpdateProfileModel} from '../../Models/UserModels';
import {getAbsolutePath} from '../../Helpers/getAbsolutePath';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'MyProfileScreen'>;
  route: RouteProp<AppStackParamList, 'MyProfileScreen'>;
};

const MyProfileScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {isLoading, profileInfo, allTaskList} = useAppSelector(
    state => state.global,
  );

  const values: UpdateProfileModel = {
    first_name: profileInfo.first_name,
    last_name: profileInfo.last_name,
    email: profileInfo.email,
    city: profileInfo.city,
    gender: profileInfo.gender,
  };

  const [imageURL, setImageURL] = useState(profileInfo?.image?.media_file_url);
  const [formValues, setFormValues] = useState<UpdateProfileModel>(values);
  const [generalError, setGeneralError] = useState(false);
  const [currentLang, setCurrentLang] = useState('');
  const [gender, setGender] = useState<string>('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfileInfo());
      dispatch(getAllMyTask());
      dispatch(clearStates());
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getLang();
  }, []);

  const getLang = async () => {
    await AsyncStorage.getItem('lng').then(lang => {
      if (lang == 'he') {
        if (profileInfo.gender == 'Male') {
          setGender('זכר');
        } else if (profileInfo.gender == 'Female') {
          setGender('נקבה');
        } else if (profileInfo.gender == 'Other') {
          setGender('אחר');
        } else if (profileInfo.gender == 'Prefers not to specify') {
          setGender('מעדיפ/ה לא לציין');
        } else {
          setGender(profileInfo.gender);
        }
      } else {
        setGender(profileInfo.gender);
      }
      setCurrentLang(lang);
    });

    console.log(lng, 'XXXX');
  };

  const renderPrice = item => {
    if (item.price > 0) {
      return <Text style={styles.colored}> ₪+{item.price}</Text>;
    } else if (item.price < 0) {
      return <Text style={styles.colored2}> ₪-{item.price}</Text>;
    } else {
      return <Text style={styles.colored3}>{item.task_status}</Text>;
    }
  };

  const renderItem = ({item}) => (
    <View style={{flex: 1, paddingVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text style={styles.texts2}>{item.created_by?.first_name}</Text>
        {renderPrice(item)}
      </View>
      <Text
        style={[styles.lowerText, {color: COLORS.black, fontWeight: '400'}]}>
        {item.title}
      </Text>
      <Text style={styles.lowerText}>
        {t('paymentHasBeenMadeOn')} -{' '}
        {formatDate(item.start_date, 'MM/DD/YYYY')}
      </Text>
      <Line style={styles.line} />
    </View>
  );

  const editImage = () => {
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
        uploadImage(image);

        if (Platform.OS === 'ios') {
          uploadImage(image);
        } else {
          let file = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name:
              response.assets[0].name != null
                ? response.assets[0].name
                : response.assets[0].uri,
            size: response.assets[0].size,
          };
          uploadImage(file);
        }
      }
    });
  };

  function uploadImage(image) {
    const endPoint = API_BASE_URL + `/upload/media/`;
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };
    const imageData = new FormData();
    imageData.append('media', image);
    axios
      .post(endPoint, imageData, {headers})
      .then(res => {
        console.log(res, '-------');
        setFormValues({...formValues, image: res.data.data[0].id});
        handleProfileData(res);
      })
      .catch(err => {
        console.log(err.response, 'message error');
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
    //     handleProfileData(response)
    //   })
    //   .then(error => {
    //     console.log('error riased', error);
    //   });
  }

  const handleProfileData = async response => {
    setFormValues({...formValues, image: response.data.data[0].id});

    const data = {
      first_name: profileInfo.first_name,
      last_name: profileInfo.last_name,
      email: profileInfo.email,
      city: profileInfo.city,
      gender: profileInfo.gender,
      image: response.data.data[0].id,
    };

    let dataToBeSend = data;
    console.log(dataToBeSend, '....>><<,,..');
    let isSendable = true;

    if (isSendable) {
      await dispatch(updateProfile(dataToBeSend));
      dispatch(getProfileInfo());
      // navigation.navigate('MyProfileScreen');
    } else {
      setGeneralError(true);
    }
  };

  return (
    <>
      {isLoading && (
        <View style={styles.isLoading}>
          <ActivityIndicator size={50} color="white" />
        </View>
      )}
      <Drawer style={{marginTop: '5%'}} />
      <SafeAreaView>
        <ScreenHeader header={t('myProfile')} />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.box}>
              <View style={styles.personDetailsContainer}>
                <View>
                  <Image
                    style={styles.personImageStyle}
                    source={{uri: profileInfo?.image?.media_file_url}}
                  />
                  <TouchableOpacity
                    style={{position: 'absolute', left: 0, bottom: -18}}
                    onPress={() => editImage()}>
                    <Image
                      // style={styles.editImageProfile}
                      source={require('../../Assets/Images/camera.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.personDetailsStyle}>
                  <View style={styles.personItemStyles}>
                    <View style={styles.imgAndText2}>
                      {/* <Text>{profileInfo.full_name}</Text> */}
                      <View style={styles.genderTexts}>
                        <Text style={styles.itemTextStyle}>
                          {profileInfo?.first_name +
                            ' ' +
                            profileInfo?.last_name}
                        </Text>
                        <Text style={styles.genderText1}>
                          {`${t('gender')}: ${gender}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.personItemStyles}>
                    <Image
                      style={styles.iconStyle}
                      source={require('../../Assets/Images/mobile1.png')}
                    />
                    <Text style={styles.itemTextStyle}>
                      {profileInfo?.country_code}-{profileInfo?.phone_no}
                    </Text>
                  </View>
                  <View style={styles.personItemStyles}>
                    <Image
                      style={styles.iconStyle}
                      source={require('../../Assets/Images/mail1.png')}
                    />
                    <Text style={styles.itemTextStyle}>
                      {profileInfo?.email}
                    </Text>
                  </View>
                  <View style={styles.personItemStyles}>
                    <Image
                      style={styles.iconStyle}
                      source={require('../../Assets/Images/location.png')}
                    />
                    <Text style={styles.itemTextStyle}>
                      {profileInfo?.city}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('MyProfileEditScreen')}>
                <Image
                  style={styles.editImage}
                  source={require('../../Assets/Images/edit.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.boxAndText}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('BankAccInfoScreen');
                }}>
                <Image source={require('../../Assets/Images/icon1.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  navigation.navigate('BankAccInfoScreen');
                }}>
                <Text style={styles.texts1}>{t('bankAccount')}</Text>
                <Image
                  style={[
                    styles.back,
                    currentLang == 'en' && {
                      transform: [{scaleX: -1}],
                    },
                  ]}
                  source={require('../../Assets/Images/back.png')}
                />
              </TouchableOpacity>
            </View>
            <Line style={styles.line} />
            {/* <View style={styles.boxAndText}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreditCardScreen');
                }}>
                <Image source={require('../../Assets/Images/icon2.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  navigation.navigate('CreditCardScreen');
                }}>
                <Text style={styles.texts1}>{t('creditCard')}</Text>
                <Image
                  style={[styles.back, currentLang == 'en' && {
                    transform: [
                      { scaleX: -1 }
                    ]
                  }]}
                  source={require('../../Assets/Images/back.png')}
                />
              </TouchableOpacity>

            </View> */}
            {/* <Line style={styles.line} /> */}
            <View style={styles.boxAndText}>
              <Text style={styles.texts1}>{t('taskHistory')}</Text>
            </View>
            <Line style={styles.line} />

            <View style={{width: '100%'}}>
              <FlatList
                data={allTaskList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MyProfileScreen;
const styles = StyleSheet.create({
  container: {},
  personDetailsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  iconStyle: {
    marginRight: 5,
  },
  personDetailsStyle: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    alignContent: 'center',
    marginHorizontal: 20,
    // paddingVertical: 5
  },
  itemTextStyle: {
    color: COLORS.black,
  },
  personItemStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  personImageStyle: {
    width: 92,
    height: 126,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: 310,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '98%',
    marginLeft: -6,
  },
  topText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '400',
    marginLeft: -120,
  },
  back: {
    marginLeft: 10,
  },
  allText: {
    display: 'flex',
    flexDirection: 'row',
  },
  editImage: {
    height: getWidth(20),
    width: getWidth(20),
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editImageProfile: {
    height: getWidth(40),
    width: getWidth(40),
  },
  boxAndText: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginLeft: 20,
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  flexing: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },

  flexing2: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: -225,
  },

  imageText: {
    color: '#8D7BAF',
    fontSize: 18,
    fontWeight: '700',
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 130,
  },

  flex2: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 70,
  },

  box: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    // height: 169,
    borderRadius: 12,
    // paddingLeft: 10,
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
    display: 'flex',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
  },

  texts: {
    marginRight: 90,
    marginTop: 31,
    fontSize: 18,
    fontWeight: '400',
    color: '#8D7BAF',
  },
  texts1: {
    marginLeft: 10,
    marginTop: -2,
    fontSize: 14,
    fontWeight: '400',
    color: '#323233',
  },
  lowerText: {
    // marginLeft: -305,
    marginTop: 5,
    textAlign: 'left',
    color: '#A5A5A5',
    marginHorizontal: 20,
  },
  lowerText2: {
    // marginLeft: -290,
    marginTop: 20,
    width: '80%',
    textAlign: 'left',
  },

  texts3: {
    marginLeft: 140,
    marginTop: -2,
    fontSize: 14,
    fontWeight: '700',
    color: '#A5A5A5',
  },

  texts4: {
    marginLeft: -210,
    marginTop: 40,
    fontSize: 14,
    fontWeight: '400',
    color: '#A5A5A5',
  },

  texts5: {
    marginLeft: -270,
    marginTop: 80,
    fontSize: 14,
    fontWeight: '400',
    color: '#A5A5A5',
  },

  colored: {
    // marginLeft: 220,
    // marginTop: -2,
    fontSize: 14,
    fontWeight: '700',
    color: '#28DC70',
  },

  colored2: {
    marginLeft: 220,
    marginTop: -2,
    fontSize: 14,
    fontWeight: '700',
    color: '#E54C6B',
  },

  colored3: {
    marginLeft: 220,
    marginTop: -2,
    fontSize: 14,
    fontWeight: '700',
    color: '#b7b1b2',
  },

  texts2: {
    // marginLeft: 20,
    // marginTop: -2,
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '700',
    color: '#323233',
  },

  line: {
    marginTop: 11,
  },

  scroll: {
    paddingBottom: getWidthStr(10),
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

  imgAndText2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  genderTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  genderText1: {
    color: '#A5A5A5',
    marginLeft: 10,
  },
  genderText2: {
    color: '#A5A5A5',
  },
});
