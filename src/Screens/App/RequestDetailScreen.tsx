import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {getWidthStr, getHeightStr} from '../../Helpers/widthHeightHelpers';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import PersonDetail from '../../Components/PersonDetail/PersonDetail';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../Constants/colors';
import {ICONS} from '../../Constants/IconsList';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {
  getAppliedUserByTaskID,
  cancelHireRequest,
  hireRequest,
} from '../../Redux/actions/taskAction';
import {getProfileInfo} from '../../Redux/actions/otherActions';

import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import {API_BASE_URL} from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'RequestDetailScreen'
  >;
  route: RouteProp<AppStackParamList, 'RequestDetailScreen'>;
};

const RequestDetailScreen = ({navigation, route}: Props) => {
  const {profileInfo, isFetchingTask, appliedTaskList, isLoading, error} =
    useAppSelector(state => state.global);

  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const para = route.params;
  const [loading, setloading] = useState(true);
  const [taskDetail, setTtaskDetail] = useState<any>(para?.task);
  const [profile, setProfile] = useState<any>(profileInfo);
  const [listed, setListed] = useState(false);
  const [messageButton, setMessageButton] = useState(false);
  const [displayApplyButton, setDisplayApplyButton] = useState(false);
  const [commision, setCommision] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [lang, setLang] = useState<any>('');
  const [gender, setGender] = useState<string>('');
  const didMount = useRef(false);
  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    await AsyncStorage.getItem('lng').then(lang => {
      if (lang == 'he') {
        if (taskDetail?.created_by?.gender == 'Male') {
          setGender('זכר');
        } else if (taskDetail?.created_by?.gender == 'Female') {
          setGender('נקבה');
        } else if (taskDetail?.created_by?.gender == 'Other') {
          setGender('אחר');
        } else if (taskDetail?.created_by?.gender == 'Prefers not to specify') {
          setGender('מעדיפ/ה לא לציין');
        } else {
          setGender(taskDetail?.created_by?.gender);
        }
      } else {
        if (lang == 'en') {
          if (taskDetail?.created_by?.gender == 'גבר') {
            setGender('Male');
          } else if (taskDetail?.created_by?.gender == 'אישה') {
            setGender('Female');
          } else {
            setGender(taskDetail?.created_by?.gender);
          }
        }
      }
    });
    setLang(lang);
  };
  // useEffect(()=>{

  // },[taskDetail])
  const collect = () => {
    if (!isFetchingTask && !isLoading && appliedTaskList && profile) {
      appliedTaskList.length > 0 &&
        appliedTaskList.map((record: any) => {
          if (record.id === profile.id) {
            setListed(true);
          }
        });
      setloading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      setListed(false);
      await dispatch(getAppliedUserByTaskID(para.taskID));
    }
    getData();
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (appliedTaskList && profileInfo) {
      setProfile(profileInfo);
      collect();
    }
  }, [appliedTaskList, profile]);

  const handleHireRequest = () => {
    dispatch(hireRequest(taskDetail?.id));
    setListed(true);
  };
  const handleCancleHireRequest = () => {
    dispatch(cancelHireRequest(taskDetail?.id));
    if (!error) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    getAllChat();
  }, []);
  useEffect(() => {
    getAppliedTaskList();
  }, []);

  const getAllChat = async () => {
    const endPoint = API_BASE_URL + `/message/inobx-pagination-listing/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const data = {
      start: 0,
      length: 100,
    };
    axios
      .post(endPoint, data, {headers})
      .then(res => {
        res?.data?.data?.map(i => {
          if (i?.user_details?.id == taskDetail?.created_by?.id) {
            setMessageButton(true);
          }
        });
      })
      .catch(err => {
        console.log(err.response, 'message error req inobx');
      });
  };

  const getAppliedTaskList = async () => {
    const endPoint = API_BASE_URL + `/task/get-my-applied-task-list/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    axios
      .get(endPoint, {headers})
      .then(res => {
        console.log(res?.data?.data, '...//...//....//..');
        let aa = res?.data?.data?.filter(
          item => item?.task?.id == taskDetail?.id,
        );
        console.log(aa, 'xxxxxxxx');
        if (aa.length == 0) {
          setDisplayApplyButton(true);
        }

        // res?.data?.data?.map((i) => {
        //   if (i?.task?.id.match(taskDetail.id)) {
        //     console.log("1111");
        //     setDisplayApplyButton(true)
        //   } else {
        //     console.log("2222");
        //   }
        // })
      })
      .catch(err => {
        console.log(err.response, 'message error req applied');
      });
  };

  const handleChat = async () => {
    const endPoint = API_BASE_URL + `/message/send-message/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const body = {
      recipient: taskDetail?.created_by?.id,
      content: 'Hii',
    };

    axios
      .post(endPoint, body, {headers})
      .then(res => {
        console.log(res?.data, '-------');
        navigation.navigate('ChatOpenConversationScreen', {
          talkingWith: res?.data?.data,
        });
      })
      .catch(err => {
        console.log(err.response, 'message error');
      });
  };

  //cancel-hire-request/ need to call this api

  const handleRefusal = async () => {
    const endPoint = API_BASE_URL + `/task/cancel-hire-request/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const data = {
      request_id: taskDetail?.id,
    };
    axios
      .put(endPoint, data, {headers})
      .then(res => {
        if (res?.data?.code == 200) {
          navigation.navigate('AlreadyGottenJobScreen');
        }
      })
      .catch(err => {
        console.log(err.response, 'message error city');
      });
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    const endPoint = API_BASE_URL + `/user/get-user-details-by-token/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .get(endPoint, {headers})
      .then(res => {
        console.log(res?.data?.data, '...........xxx....');
        console.log(res?.data?.data?.merchant_id, '.........MMMM..xxx....');
        setCommision(res?.data?.data?.commision);
        setMerchantId(res?.data?.data?.merchant_id);
      })
      .catch(err => {
        console.log(err.response, 'message error req');
      });
  };

  const getUrl = () => {
    const body = {
      // seller_payme_id: '',
      seller_payme_id: merchantId,
      seller_id: null,
      sale_price: taskDetail?.price,
      currency: 'ILS',
      product_name: 'Umego Payment',
      transaction_id: '12345',
      installments: '1',
      market_fee: commision,
      sale_send_notifcation: true,
      sale_callback_url: 'https://api.umegoirl.com/api/payment/call-back/',
      sale_email: 'mailto:test@payme.io',
      sale_return_url: 'https://api.umegoirl.com/api/payment/call-back/',
      sale_mobile: '+972541234567',
      sale_name: 'Umego Payment',
      capture_buyer: false,
      buyer_perform_validation: false,
      sale_type: 'sale',
      sale_payment_method: 'credit-card',
      layout: 'string',
      language: 'en',
    };

    // const payment_url = 'https://live.payme.io/api/'
    const payment_url = 'https://sandbox.payme.io/api/';

    axios
      .post(payment_url + 'create-seller', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res, '....>>>....');
      })
      .catch(err => {
        console.log(err, '...err..');
      });
  };

  return (
    <>
      {loading && <Loading />}
      <SafeAreaView>
        <ScreenHeader
          header={t('requestDetailScreen.header')}
          showBackButton={true}
          isHeaderBold={false}
        />

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.cardContainer}>
            <PersonDetail
              person={{
                title: taskDetail?.title,
                name: `${taskDetail?.created_by?.first_name} ${taskDetail?.created_by?.last_name}`,
                image: taskDetail?.created_by?.image?.media_file_url,
                location: taskDetail?.address,
                birthDate: taskDetail?.start_date,
                price: taskDetail?.price,
                gender: gender,
                description: taskDetail?.description,
              }}
            />

            {merchantId != null ? (
              <>
                {!listed ? (
                  <View style={styles.buttonMain}>
                    {displayApplyButton && (
                      <Button
                        text={t('requestDetailScreen.applyJob')}
                        onPress={() => {
                          handleHireRequest();
                        }}
                        color={COLORS.purpleLight}
                        variant="filled"
                        corners="curved"
                        buttonStyle={styles.buttonStyle}
                      />
                    )}
                    {messageButton && (
                      <Button
                        text={t('requestDetailScreen.chat')}
                        onPress={() => {
                          // handleHireRequest();
                          handleChat();
                        }}
                        color={COLORS.purpleLight}
                        variant="filled"
                        corners="curved"
                        buttonStyle={styles.buttonStyle}
                      />
                    )}
                    {!messageButton && !displayApplyButton && (
                      <Button
                        text={t('requestDetailScreen.cancel')}
                        onPress={() => {
                          handleRefusal();
                        }}
                        color={COLORS.error}
                        variant="filled"
                        corners="curved"
                        buttonStyle={styles.buttonStyle}
                      />
                    )}
                  </View>
                ) : (
                  // {/* // Disabling work availablity Start */}
                  <>
                    <View style={styles.desMain}>
                      <View style={styles.iconMain}>
                        <Icon
                          name={ICONS.timer}
                          size={26}
                          color={COLORS.white}
                        />
                      </View>
                      <View style={styles.textMain}>
                        <Text style={styles.valuesText}>
                          {t('taskRequestScreen')}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.buttonMain}>
                      <Button
                        text={t('requestDetailScreen.cancel')}
                        onPress={handleCancleHireRequest}
                        color={COLORS.error}
                        variant="filled"
                        corners="curved"
                        buttonStyle={styles.buttonStyle}
                      />
                    </View>
                  </>
                )}
              </>
            ) : (
              <>
                {merchantId == null && (
                  <Button
                    text={t('requestDetailScreen.cancel')}
                    onPress={handleCancleHireRequest}
                    color={COLORS.error}
                    variant="filled"
                    corners="curved"
                    buttonStyle={styles.buttonStyle}
                  />
                )}
              </>
            )}
          </View>
          <View style={styles.rewardTextMain}>
            <Text style={styles.rewardText}>
              {t('requestDetailScreen.rewardBeforeFee')}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RequestDetailScreen;

const styles = StyleSheet.create({
  scroll: {
    height: getHeightStr(100),
    paddingBottom: getWidthStr(10),
    paddingHorizontal: 13,
    paddingTop: 20,
  },
  cardContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: COLORS.white,
  },
  buttonMain: {
    paddingVertical: 5,
  },
  buttonStyle: {
    paddingVertical: 15,
  },
  rewardTextMain: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  rewardText: {
    color: COLORS.error,
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
  },
  desMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  textMain: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  iconMain: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.purpleLight,
  },
  valuesText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    color: COLORS.black,
    textAlign: 'left',
  },
});
