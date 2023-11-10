import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import Drawer from '../../Components/Drawer/Drawer';
import NoResult from '../../Components/NoResult/NoResult';
import {COLORS} from '../../Constants/colors';
import NewCard from '../../Components/Card/NewCard';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {getAllMyTask} from '../../Redux/actions/taskAction';
import Card from '../../Components/Card/Card';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import axios from 'axios';
import {API_BASE_URL} from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'MyJobTaskScheduleMainScreen'
  >;
  route: RouteProp<AppStackParamList, 'MyJobTaskScheduleMainScreen'>;
};

const MyJobTaskScheduleMainScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const {allTaskList} = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [switchScreen, setSwitchScreen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [coordinateList, setCoordinateList] = useState<any>([]);
  const [paddingList, setPaddingList] = useState<any>([]);
  const [toDoData, setToDoData] = useState<any>([]);
  const didMount = React.useRef(false);
  const [lang, setLang] = useState<any>('');
  const isFocused = useIsFocused();
  const filter = () => {
    //set array empty on every update
    setCoordinateList([]);
    setPaddingList([]);
    allTaskList.length > 0 &&
      allTaskList.map((task: any) => {
        // if (task.task_status === 'cordinated a meeting') {
        // setCoordinateList(oldArray => [...oldArray, task]);
        // } else if (task.task_status !== 'cordinated a meeting') {
        setPaddingList(oldArray => [...oldArray, task]);
        // }
      });
  };
  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
  };
  const getData = async () => {
    await dispatch(getAllMyTask());
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  useEffect(() => {
    console.log('UseEffect Call');
    getAllTakToken();
  }, [isFocused]);

  // 1. pending for applicants
  // 2. pending for payment
  // 3. pending for cordinate = (navigate on schedule a meeting screen ) (Figma)
  // 4. pending coordinate  =  (navigate on schedule a meeting screen ) (Figma)
  // 5. cordinated a meeting = not clickable (clear)

  const getAllTakToken = async value => {
    console.log('API FUnction Call');
    if (value !== 'refresh') {
      setLoader(true);
    }
    const endPoint = API_BASE_URL + `/task/get-my-applied-task-list/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .get(endPoint, {headers})
      .then(res => {
        // console.log(res?.data?.data, ",,,,....,,,");

        let toDoDummy = [];
        let taskToCordinateDummy = [];

        // console.log();

        res?.data?.data.map(i => {
          if (
            i?.task?.task_status == 'pending coordinate' ||
            i?.task?.task_status == 'pending for cordinate' ||
            i?.task?.task_status == 'pending for applicants'
          ) {
            taskToCordinateDummy.push(i);
          }
          if (
            i?.task?.task_status == 'pending for payment' ||
            i?.task?.task_status == 'cordinated a meeting'
          ) {
            toDoDummy.push(i);
          }
        });
        // console.log("taskToCordinateDummy ::: ", taskToCordinateDummy);
        setLoader(false);
        setToDoData(toDoDummy);
        setCoordinateList(taskToCordinateDummy);
      })
      .catch(err => {
        console.log(err.response, 'message error req');
        setLoader(false);
        // setToDoData(toDoData);
        // setCoordinateList(coordinateList);
      });
  };

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (allTaskList) {
      filter();
    }
  }, [allTaskList]);

  const onRefresh = () => {
    setRefreshing(true);
    // getData();
    getAllTakToken('refresh');
    setRefreshing(false);
  };
  const _EmptyListMessage = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <NoResult message={switchScreen ? t('noTask') : t('noTask')} />
      </View>
    );
  };

  const _renderItem = ({item}) => {
    let englishgender = '';
    if (lang == 'he') {
      if (item?.task?.created_by.gender == 'Male') {
        englishgender = 'זכר';
      } else if (item?.task?.created_by.gender == 'Female') {
        englishgender = 'נקבה';
      } else if (item?.task?.created_by.gender == 'Other') {
        englishgender = 'אחר';
      } else if (item?.task?.created_by.gender == 'Prefers not to specify') {
        englishgender = 'מעדיפ/ה לא לציין';
      } else {
        englishgender = item?.task?.created_by.gender;
      }
    } else {
      if (lang == 'en') {
        if (item?.task?.created_by.gender == 'גבר') {
          englishgender = 'Male';
        } else if (item?.task?.created_by.gender == 'אישה') {
          englishgender = 'Female';
        } else {
          englishgender = item?.task?.created_by.gender;
        }
      }
    }
    return (
      <TouchableOpacity key={item.id} style={{width: '100%', marginTop: 15}}>
        <Card
          card={{
            title: item?.task?.title,
            name:
              item?.task?.created_by?.first_name +
              ' ' +
              item?.task?.created_by?.last_name,
            image: item?.task?.created_by?.image?.media_file_url,
            location: item?.task?.address,
            birthDate: item?.task?.start_date,
            price: item?.task?.price,
            gender: englishgender,
            status: item?.task?.task_status,
          }}
          onPress={() =>
            item?.task?.task_status == 'cordinated a meeting'
              ? navigation.navigate('RequestDetailScreen', {
                  taskID: item.id,
                  task: item?.task,
                })
              : navigation.navigate('ScheduleMeetingScreen', {
                  task: item?.task,
                })
          }
        />
      </TouchableOpacity>
    );
  };

  const _renderItem2 = ({item}) => {
    let englishgender = '';
    if (lang == 'he') {
      if (item?.task?.created_by.gender == 'Male') {
        englishgender = 'זכר';
      } else if (item?.task?.created_by.gender == 'Female') {
        englishgender = 'נקבה';
      } else if (item?.task?.created_by.gender == 'Other') {
        englishgender = 'אחר';
      } else if (item?.task?.created_by.gender == 'Prefers not to specify') {
        englishgender = 'מעדיפ/ה לא לציין';
      } else {
        englishgender = item?.task?.created_by.gender;
      }
    } else {
      if (lang == 'en') {
        if (item?.task?.created_by.gender == 'גבר') {
          englishgender = 'Male';
        } else if (item?.task?.created_by.gender == 'אישה') {
          englishgender = 'Female';
        } else {
          englishgender = item?.task?.created_by.gender;
        }
      }
    }
    return (
      <TouchableOpacity key={item.id} style={{width: '100%', marginTop: 15}}>
        <Card
          card={{
            title: item?.task?.title,
            name:
              item?.task?.created_by?.first_name +
              ' ' +
              item?.task?.created_by?.last_name,
            image: item?.task?.created_by?.image?.media_file_url,
            location: item?.task?.address,
            birthDate: item?.task?.start_date,
            price: item?.task?.price,
            gender: englishgender,
            status: item?.task?.task_status,
          }}
          // onPress={() => navigation.navigate('RequestDetailScreen', {
          //   taskID: item.id,
          //   task: item?.task,
          // })}
          onPress={() =>
            item?.task?.task_status == 'pending for cordinate' ||
            item?.task?.task_status == 'pending coordinate'
              ? navigation.navigate('ScheduleMeetingScreen', {
                  task: item?.task,
                })
              : navigation.navigate('RequestDetailScreen', {
                  taskID: item.id,
                  task: item?.task,
                })
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Drawer style={{top: '6%'}} />
      <SafeAreaView>
        <ScreenHeader header={t('myTasks')} />
        {loader ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              backgroundColor: 'transparent',
            }}>
            <ActivityIndicator color={'black'} size={'large'} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.switch}>
              <View style={[styles.btn]}>
                <TouchableOpacity
                  disabled={!switchScreen}
                  onPress={() => {
                    setSwitchScreen(false);
                  }}>
                  <Text
                    style={[
                      switchScreen ? styles.btnDisable : styles.btnActive,
                    ]}>
                    {t('tasksToCoordinate')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.btn]}>
                <TouchableOpacity
                  disabled={switchScreen}
                  onPress={() => {
                    setSwitchScreen(true);
                  }}>
                  <Text
                    style={[
                      switchScreen ? styles.btnActive : styles.btnDisable,
                    ]}>
                    {t('toDos')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                styles.lineContainer,
                switchScreen
                  ? {flexDirection: 'row-reverse'}
                  : {flexDirection: 'row'},
              ]}>
              <View style={styles.lineActive}></View>
            </View>
            {switchScreen ? (
              <FlatList
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={toDoData}
                disableVirtualization={false}
                renderItem={_renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={_EmptyListMessage}
              />
            ) : (
              <FlatList
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={coordinateList}
                disableVirtualization={false}
                renderItem={_renderItem2}
                keyExtractor={item => item.id}
                ListEmptyComponent={_EmptyListMessage}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default MyJobTaskScheduleMainScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  switch: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 27,
    marginTop: 10,
  },
  btn: {
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.purpleLight,
    fontFamily: 'Assistant-Medium',
  },
  btnDisable: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.text,
    fontFamily: 'Assistant-Medium',
  },
  lineContainer: {
    width: '100%',
    height: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.light2,
  },
  lineActive: {
    width: '50%',
    backgroundColor: COLORS.purpleLight,
    height: 3,
    alignSelf: 'center',
    borderRadius: 8,
  },

  header: {
    alignSelf: 'center',
  },

  imageText: {
    color: '#8D7BAF',
    alignSelf: 'flex-end',
    fontSize: 18,
    fontFamily: 'Assistant-Medium',
    fontWeight: '400',
  },

  scroll: {
    flexGrow: 1,
    marginTop: 10,
    paddingBottom: getWidthStr(40),
  },
});

// 1st tab => task/get-my-applied-task-list/
// 2nd tab => task/get-all-task-by-token/
