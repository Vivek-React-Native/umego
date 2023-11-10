import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import Drawer from '../../Components/Drawer/Drawer';
import Line from '../../Components/Line/Line';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../Constants/colors';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {
  addSelectedServiceProvider,
  getPaymentHistory,
  getTaskHistory,
} from '../../Redux/actions/taskAction';
import {useTranslation} from 'react-i18next';
import DeleteModel from '../../Components/DeleteModel/DeleteModel';
import Loading from '../../Components/Loading/Loading';
import {API_BASE_URL} from '../../Constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../Components/Card/Card';
import {getHeightStr} from '../../Helpers/widthHeightHelpers';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'MyRequestMainScreen'
  >;
  route: RouteProp<AppStackParamList, 'MyRequestMainScreen'>;
};

const MyRequestMainScreen = ({navigation, route}: Props) => {
  const [requestDeleteModal, setRequestDeleteModal] = useState(false);
  const [requestToDelete, updateRequestToDelete] = useState(null);
  const [taskId, setTaskId] = useState(0);
  const [TASK, setTASK] = useState([]);
  const {t} = useTranslation();
  const {isFetchingTask, taskHistory, paymentHistory, success, error} =
    useAppSelector(state => state.global);

  const [waittingData, setWaittingData] = useState(null);
  const [interestedApplication, setInterestedApplication] = useState(null);
  const [coordinatedData, setCoordinatedData] = useState(null);

  const [lang, setLang] = useState<any>('');

  // console.log('payment history -> ',JSON.stringify(paymentHistory, null, 2))
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTaskHistory());
    dispatch(getPaymentHistory());
  }, [success, error]);

  useEffect(() => {
    FilterByTaskStatus();
  }, [taskHistory]);

  const Keys = [
    'pending for applicants',
    'pending coordinate',
    'cordinated a meeting',
  ];

  const TitleNames = [
    t('pendingforapplicants'),
    t('pendingcoordinate'),
    t('cordinatedameeting'),
  ];

  const FilterByTaskStatus = async () => {
    if (taskHistory?.length > 0) {
      const PendingApps = taskHistory.filter(v => v?.task_status === Keys[0]);
      const Pendingcoords = taskHistory.filter(v => v?.task_status === Keys[1]);
      const CoordinateMeets = taskHistory.filter(
        v => v?.task_status === Keys[2],
      );
      const update = [
        {
          title: Keys[0],
          data: PendingApps,
        },
        {
          title: Keys[1],
          data: Pendingcoords,
        },
        {
          title: Keys[2],
          data: CoordinateMeets,
        },
      ];
      setTASK(update);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
  };
  const getAllTakToken = async () => {
    const endPoint = API_BASE_URL + `/task/get-all-task-by-token/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .get(endPoint, {headers})
      .then(res => {
        // console.log(res?.data?.data, ",,,,.My Req...,,,");

        let toDoDummy = [];
        let taskToCordinateDummy = [];
        let dummyInterestedApplication = [];

        res?.data?.data.map(i => {
          if (
            i?.task_status == 'pending for cordinate' ||
            i?.task_status == 'pending coordinate' ||
            i?.task_status == 'pending for applicants'
          ) {
            if (i?.applied_user.length != 0) {
              dummyInterestedApplication.push(i);
            } else {
              taskToCordinateDummy.push(i);
            }
          }
          if (
            i?.task_status == 'pending for payment' ||
            i?.task_status == 'cordinated a meeting'
          ) {
            toDoDummy.push(i);
          }
        });
        setWaittingData(taskToCordinateDummy);
        setInterestedApplication(dummyInterestedApplication);
        setCoordinatedData(toDoDummy);
        // setCoordinateList(taskToCordinateDummy)
      })
      .catch(err => {
        console.log(err.response, 'message error req');
      });
  };

  const onDeleteTap = async () => {
    setRequestDeleteModal(false);
    const endPoint = API_BASE_URL + `/task/delete-task/${taskId}/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .delete(endPoint, {headers})
      .then(res => {
        dispatch(getTaskHistory());
        getAllTakToken();
      })
      .catch(err => {
        console.log(err.response, 'message error city');
      });
  };

  const RenderMyTask = ({item}: any) => {
    console.log('Item -> ', JSON.stringify(item, null, 2));
    return (
      <View style={styles.box3}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 15,
            alignItems: 'center',
          }}>
          <Text style={styles.boxText}>{item?.title ?? ''}</Text>
          <TouchableOpacity
            onPress={() => {
              updateRequestToDelete({...item});
              setRequestDeleteModal(true);
              //navigation.navigate('PaymentForServiceScreen');
              setTaskId(item?.id);
            }}>
            <Image source={require('../../Assets/Images/delete.png')} />
          </TouchableOpacity>
        </View>
        <Line style={styles.line} />
        <View style={[styles.flexing]}>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <Image source={require('../../Assets/Images/location.png')} />
            <Text style={{fontFamily: 'Assistant-Medium'}}>
              {item?.address ?? ''}
            </Text>
          </View>
          <View style={styles.flex}>
            <Image source={require('../../Assets/Images/money.png')} />
            <Text style={{fontFamily: 'Assistant-Medium'}}>{`₪ ${
              item?.price ?? ''
            }`}</Text>
          </View>
        </View>
        <View style={[styles.flexing, {marginTop: 0}]}>
          <Image source={require('../../Assets/Images/calendar.png')} />
          <Text style={{fontFamily: 'Assistant-Medium', fontSize: 14}}>{`${
            item?.start_date ?? ''
          } ${item?.start_time?.substr(0, 5) ?? ''} - ${item?.end_date ?? ''} ${
            item?.end_time?.substr(0, 5) ?? ''
          }`}</Text>
        </View>
        {item?.task_status === Keys[1] && (
          <Button
            text={`${t('myRequest.list_vendor_bnt')}`}
            onPress={() => {
              addSelectedServiceProvider({...item});
              navigation.navigate('SPInterestedInYourRequestScreen', {
                taskId: item.id,
                card: item,
              });
            }}
            color={COLORS.purpleLight}
            variant="filled"
            corners="curved"
            buttonStyle={styles.renderItemButton}
            textStyle={{fontSize: 14}}
          />
        )}

        {/* <Button
          text={`${t('myRequest.removetask')}`}
          onPress={() => {}}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          buttonStyle={{ ...styles.renderItemButton, marginTop: 0, backgroundColor: COLORS.error, borderWidth: 0 }}
          textStyle={{ fontSize: 14 }}
        /> */}
      </View>
    );
  };

  const renderUpperLayer = task => {
    return (
      <View>
        <Text style={[styles.title, {marginLeft: 10}]}>{task?.title}</Text>
        <Line style={styles.line} />
      </View>
    );
  };

  const renderCardBody = task => {
    let englishgender = '';
    if (lang == 'he') {
      if (task?.created_by?.gender == 'Male') {
        englishgender = 'זכר';
      } else if (task?.created_by?.gender == 'Female') {
        englishgender = 'נקבה';
      } else if (task?.created_by?.gender == 'Other') {
        englishgender = 'אחר';
      } else if (task?.created_by?.gender == 'Prefers not to specify') {
        englishgender = 'מעדיפ/ה לא לציין';
      } else {
        englishgender = task?.created_by?.gender;
      }
    } else {
      if (lang == 'en') {
        if (task?.created_by?.gender == 'גבר') {
          englishgender = 'Male';
        } else if (task?.created_by?.gender == 'אישה') {
          englishgender = 'Female';
        } else {
          englishgender = task?.created_by?.gender;
        }
      }
    }

    return (
      <View style={[styles.cardBody]}>
        <View style={styles.imgAndText} />
        <View style={styles.rightSection}>
          <View style={[styles.infoBox, {marginTop: 20, flex: 1}]}>
            <View style={[styles.imgAndText2]}>
              <Text style={styles.gender}>
                {t('gender')}:{englishgender}
              </Text>
            </View>
            <View style={[styles.imgAndText2]}>
              <>
                <Image
                  style={{marginHorizontal: 5}}
                  resizeMode={'contain'}
                  source={require('../../Assets/Images/location.png')}
                />
                <Text
                  style={{
                    color: COLORS.text,
                    fontFamily: 'Assistant-Medium',
                    flex: 1,
                  }}>
                  {task?.address}
                </Text>
              </>
              <>
                <View
                  style={[
                    styles.imgAndText,
                    {justifyContent: 'flex-start', flex: 1},
                    // { width: "30%", alignItems: "center" },
                  ]}>
                  <Text
                    numberOfLines={1}
                    style={{fontFamily: 'Assistant-Medium'}}>
                    ₪ {task?.price + '   '}
                  </Text>
                  <Image
                    style={{transform: [{scale: 1.1}]}}
                    source={require('../../Assets/Images/money.png')}
                  />
                </View>
              </>
            </View>
            <View style={[styles.imgAndText2]}>
              <Image
                style={{marginHorizontal: 5}}
                resizeMode={'contain'}
                source={require('../../Assets/Images/calendar.png')}
              />
              <View>
                <Text style={styles.valuesText}>
                  {/* {task?.start_time ?? "" + task?.start_date ?? ""} */}
                  {`${task?.start_time ?? ''}${' '} ${task?.start_date ?? ''}`}
                </Text>
              </View>
            </View>

            {/* <View style={styles.imgAndText2}>
              <Text>דירוג:{'5'}</Text>
            </View>
            <View style={styles.imgAndText2}>

            </View> */}
          </View>
          {/* {card.image ? (
            <Image
              source={{
                uri: card.image,
              }}
              style={styles.image}
            />
          ) : ( */}
          <Image
            source={{uri: task?.created_by?.image?.media_file_url}}
            style={styles.image}
          />
        </View>
      </View>
    );
  };

  const renderButtonRow = i => {
    return (
      <View style={styles.buttonRow}>
        <Button
          onPress={() =>
            navigation.navigate('PaymentForServiceScreen', {
              info: i,
            })
          }
          text={t('sendingPayment')}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          size="medium"
          buttonStyle={styles.btnstyle}
        />
        <Button
          onPress={() =>
            navigation.navigate('ReportingAbsenceScreen', {
              detail: i,
            })
          }
          text={t('malfunctionoccurred')}
          color={COLORS.purpleLight}
          variant="outlined"
          corners="curved"
          size="medium"
          buttonStyle={styles.btnstyle}
        />
      </View>
    );
  };

  return (
    <>
      {isFetchingTask && <Loading />}
      <Drawer style={{top: '5%'}} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.imageText}>{t('drawer.myRequests')}</Text>
          </View>
          <View style={styles.headings}>
            <Button
              size="xlarge"
              text={t('homeScreen.createRequest')}
              onPress={() => navigation.navigate('CreateRequestScreen')}
              color={COLORS.purpleLight}
              variant="filled"
              corners="curved"
            />
          </View>
          <ScrollView>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
              }}>
              {TASK?.length > 0 &&
                TASK.map(
                  (MItem, MIndex) =>
                    MItem?.data?.length > 0 && (
                      <View style={styles.RenderMainItem} key={MIndex}>
                        <Text style={styles.RenderMainTitle}>
                          {TitleNames?.[MIndex]}
                        </Text>

                        {MItem?.data?.map((SItem, SIndex) =>
                          MItem?.title === Keys[2] ? (
                            <Card
                              key={SIndex}
                              card={{
                                title: SItem.title,
                                name:
                                  SItem?.created_by?.first_name +
                                  ' ' +
                                  SItem?.created_by?.last_name,
                                image: SItem?.created_by?.image?.media_file_url,
                                location: SItem?.address,
                                birthDate: SItem?.start_date,
                                price: SItem?.price,
                                gender: SItem?.created_by.gender,
                              }}
                              activeOpacity={1}
                              cardStyle={{width: '100%'}}
                              onPress={() => {}}>
                              <View style={styles.buttonView}>
                                <Button
                                  text={t('payment')}
                                  variant="filled"
                                  corners="curved"
                                  color={COLORS.purpleLight}
                                  onPress={() =>
                                    navigation.navigate(
                                      'PaymentForServiceScreen',
                                      {RouteItem: SItem},
                                    )
                                  }
                                  buttonStyle={styles.TwoButtons}
                                />
                                <Button
                                  text={t('malfunction')}
                                  corners="curved"
                                  size="medium"
                                  color={COLORS.purpleLight}
                                  onPress={() =>
                                    navigation.navigate(
                                      'ReportingAbsenceScreen',
                                      {RouteItem: SItem},
                                    )
                                  }
                                  buttonStyle={[styles.TwoButtons]}
                                />
                              </View>
                            </Card>
                          ) : (
                            <RenderMyTask key={SIndex} item={SItem} />
                          ),
                        )}
                      </View>
                    ),
                )}
            </View>
          </ScrollView>
        </View>

        <DeleteModel
          info={{
            show: requestDeleteModal,
            title: requestToDelete?.title ?? '',
            location: requestToDelete?.address ?? '',
            date: `${requestToDelete?.start_time ?? ''} ${
              requestToDelete?.start_date ?? ''
            }`,
            onDeleteTap: onDeleteTap,
            price: requestToDelete?.price ?? '',
            close: () => setRequestDeleteModal(false),
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default MyRequestMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  mid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    alignSelf: 'center',
    // backgroundColor: '#FFFFFF'
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    marginTop: '2%',
    marginBottom: '4%',
  },
  topText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'left',
  },

  topText2: {
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'flex-start',
    left: '10%',
    top: '15%',
    justifyContent: 'center',
  },
  cards: {
    // justifyContent:'flex-start',
    alignSelf: 'flex-start',
    left: '10%',
    top: '10%',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  buttons1: {
    alignSelf: 'center',
    top: '5%',
  },
  flexing: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
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
    alignItems: 'center',
    flexDirection: 'row',
    // marginRight: 2,
    marginRight: '5%',
    // flex: 0.4,
  },
  flex2: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 70,
  },
  box: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 120,
    top: '8%',
    borderRadius: 12,
    paddingLeft: 10,
  },
  box2: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 160,
    top: '10%',
    borderRadius: 12,
    paddingLeft: 10,
  },

  box3: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingTop: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 5,
  },
  boxText: {
    fontSize: 14,
    color: '#323233',
    fontWeight: 'bold',
    paddingTop: 10,
    marginLeft: 10,
    fontFamily: 'Assistant',
    color: '#323233',
  },
  headings: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 28,
    marginBottom: 10,
    marginLeft: 18,
  },
  line: {
    marginTop: 11,
  },
  button: {
    backgroundColor: '#8D7BAF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    width: 140,
  },
  title: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 17,
  },
  renderItemButton: {
    flex: 1,
    paddingVertical: 13,
    marginVertical: 10,
    alignSelf: 'center',
    width: '90%',
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
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginTop: 10,
    // height: getWidthStr(22),
  },
  // title: {
  //   alignSelf: 'flex-start',
  //   fontWeight: '700',
  //   paddingHorizontal: 10,
  //   paddingVertical: 0,
  //   fontSize: 14,
  //   color: COLORS.text,
  // },
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
    paddingHorizontal: 5,
  },
  imgAndText: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgAndText2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginRight: -10,
  },
  rightSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '65%',
  },
  btnstyle: {
    paddingVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
  },
  // line: {
  //   marginVertical: 10,
  //   width: '95%',
  //   alignSelf: 'center',
  //   borderColor: COLORS.system,
  // },
  gender: {
    color: COLORS.subText,
  },
  image: {
    marginHorizontal: 10,
    borderRadius: 10,
    height: 90,
    width: 70,
  },
  valuesText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 5,
    color: COLORS.text,
    textAlign: 'left',
    fontFamily: 'Assistant-Medium',
  },
  humanImage: {
    marginTop: getHeightStr(30),
    width: 320,
    height: 210,
    zIndex: 100,
  },
  message: {
    marginTop: getHeightStr(20),
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.subText,
  },
  RenderMainItem: {
    marginBottom: 30,
  },
  RenderMainTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 5,
    textTransform: 'capitalize',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  TwoButtons: {
    flex: 1,
    marginHorizontal: 10,
  },
});
