import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import Person, {PersonModel} from '../../Components/Person/Person';
import Label from '../../Components/Label/Label';
import Card from '../../Components/Card/Card';
import Drawer from '../../Components/Drawer/Drawer';
import {COLORS} from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {
  getCategories,
  getOpenTaskList_Sefa,
  getProfileInfo,
} from '../../Redux/actions/otherActions';
import {formatDate} from '../../Helpers/FormatDate';
import {API_BASE_URL} from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'HomeScreen'>;
  route: RouteProp<AppStackParamList, 'HomeScreen'>;
};

const HomeScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const {
    isAuthenticated,
    isFetching,
    token,
    user,
    isLoading,
    profileInfo,
    isSendingMessage,
    isFetchingUser,
    message,
    error,
    isFetchingTask,
    isFetchingChat,
    task,
    taskList,
    allTaskList,
    appliedTaskList,
    taskHistory,
    conversationList,
    isFetchingCategories,
    isFetchingSubCategories,
    categories,
    subCategories,
    success,
    chatList,
    appliedUsers,
    paymentHistory,
  } = useAppSelector(state => state.global);
  // console.log(
  //   'Information -> ',
  //   JSON.stringify(
  //     {
  //       isAuthenticated,
  //       isFetching,
  //       token,
  //       user,
  //       isLoading,
  //       profileInfo,
  //       isSendingMessage,
  //       isFetchingUser,
  //       message,
  //       error,
  //       isFetchingTask,
  //       isFetchingChat,
  //       task,
  //       taskList,
  //       allTaskList,
  //       appliedTaskList,
  //       taskHistory,
  //       conversationList,
  //       isFetchingCategories,
  //       isFetchingSubCategories,
  //       categories,
  //       subCategories,
  //       success,
  //       chatList,
  //       appliedUsers,
  //       paymentHistory,
  //     },
  //     null,
  //     2,
  //   ),
  // );
  const dispatch = useAppDispatch();
  const [myTaksList, setMyTaksList] = useState<any>([]);
  const [refreshing, setrefreshing] = useState(false);
  // const [categories, setCategories] = useState<any>([]);
  const [lang, setLang] = useState<any>('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfileInfo());
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setrefreshing(true);
    dispatch(getOpenTaskList_Sefa());
    // getCategories()
    dispatch(getCategories());
    setrefreshing(false);
  }, []);
  const handleCardPress = (task: any) => {
    navigation.navigate('RequestDetailScreen', {
      taskID: task?.id,
      task: task,
    });
  };
  // const getCategories = async() => {
  //   setrefreshing(true)
  //   const lng = await AsyncStorage.getItem("lng");
  //   try{
  //     const response = await fetch(API_BASE_URL + '/task/get-categories/',{
  //       method:"GET",
  //       headers:{
  //         Authorization: 'Bearer ' + token,
  //       "lang": lng == "en" ? "en" : "ar"
  //       }
  //     })
  //     const res = await response.json();
  //     setCategories(res?.data)
  //   }catch(e){
  //     console.log("Error",e)
  //   }
  //   setrefreshing(false)
  // }
  useEffect(() => {
    getMyProfile();
    getAllTakToken();
    getUserId();
  }, []);

  const getUserId = async () => {
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
  };

  const getMyProfile = async () => {
    setrefreshing(true);
    const endPoint = API_BASE_URL + `/user/get-user-details-by-token/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .get(endPoint, {headers})
      .then(res => {
        AsyncStorage.setItem('userId', res?.data?.data?.id.toString());
      })
      .catch(err => {
        console.log(err.response, 'message error req');
      });
    setrefreshing(false);
  };
  const getAllTakToken = async () => {
    setrefreshing(true);
    // const endPoint = API_BASE_URL + `/task/get-my-applied-task-list/`
    const endPoint = API_BASE_URL + `/task/get-open-task-list/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .get(endPoint, {headers})
      .then(res => {
        setMyTaksList(res?.data?.data);
      })
      .catch(err => {
        console.log(err.response, 'message error req');
      });
    setrefreshing(false);
  };

  const renderItem = ({item}) => (
    <Card
      onPress={() => handleCardPress(item)}
      card={{
        name: `${item?.created_by?.first_name}`,
        title: item?.title,
        image: item?.created_by?.image?.media_file_url,
        location: item?.address,
        birthDate: formatDate(item?.start_date, 'MM/DD/YY, hh:mm'),
        price: `${item?.price}`,
        gender: item?.created_by.gender,
      }}
      cardStyle={styles.cardStyle}
    />
  );

  // console.log('myTaksList -> ', JSON.stringify(myTaksList, null, 2));

  return (
    <>
      {refreshing && (
        <View style={styles.isLoading}>
          <ActivityIndicator size={50} color="white" />
        </View>
      )}
      {/* {refreshing && <Loading />} */}
      <Drawer style={{marginTop: '5%'}} />
      <SafeAreaView>
        <View style={styles.scroll}>
          <View style={styles.header}>
            <Image
              style={{height: 45, width: 120}}
              source={require('../../Assets/Images/app-logo.png')}
            />
            {/* <Text style={[styles.imageText, { marginTop: 10 }]}>
              {t('homeScreen.yourTimeChanges')}
            </Text> */}
          </View>
          <View style={styles.subHeader}>
            <View style={styles.name}>
              {lang !== 'en' ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Assistant-Medium'}}>
                    {profileInfo?.first_name}
                  </Text>
                  <Text style={{fontFamily: 'Assistant-Medium'}}>
                    {' '}
                    {t('hello')}
                  </Text>
                  <Text style={{fontFamily: 'Assistant-Medium'}}>{','}</Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Assistant-Medium'}}>
                    {profileInfo?.first_name}
                  </Text>
                  <Text style={{fontFamily: 'Assistant-Medium'}}>
                    {' '}
                    {t('hello')}
                  </Text>
                  <Text style={{fontFamily: 'Assistant-Medium'}}>{','} </Text>
                </View>
                // <Text style={{ fontFamily: "Assistant-Medium" }}>
                //   {/* {lang == "en" */}
                //   {profileInfo?.first_name} {t("hello")}{","}
                //   {/* : `${profileInfo?.first_name}${t("hello")}${","}${" "}`} */}
                // </Text>
              )}

              <Text style={{fontFamily: 'Assistant-Medium'}}>
                {t('homeScreen.stuckWithCore')}
              </Text>
            </View>
            <Button
              text={t('homeScreen.createRequest')}
              onPress={() => navigation.navigate('CreateRequestScreen')}
              color={COLORS.purpleLight}
              variant="filled"
              corners="curved"
              buttonStyle={{paddingVertical: 12}}
            />
          </View>
          <View style={styles.containerStyle}>
            {categories
              .slice(0, 8)
              .map((person: PersonModel, index: number) => (
                <Person
                  person={person}
                  key={index}
                  onPress={() =>
                    navigation.navigate('JobProposalMainScreen', {
                      categoryFilter: person,
                    })
                  }
                />
              ))}
          </View>
          <View style={styles.cardHeader}>
            <Label
              text={t('homeScreen.toAllTasks')}
              textColor={COLORS.light}
              backgroundColor={COLORS.lightPurple}
              fontSize={14}
              onPress={() => navigation.navigate('JobProposalMainScreen')}
            />
            <Text style={styles.cardsHeaderText}>
              {t('homeScreen.aroundMe')}
            </Text>
          </View>
          <View style={{flex: 1, marginBottom: 10}}>
            <FlatList
              data={myTaksList}
              contentContainerStyle={{marginBottom: 10}}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{marginBottom: 40}}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
  },
  imageText: {
    color: 'black',
    alignSelf: 'flex-end',
    fontSize: 12,
    marginTop: -8,
    marginRight: -2,
  },
  subHeader: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#8D7BAF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    width: 140,
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
    marginLeft: 5,
    fontFamily: 'Assistant-Medium',
  },
  cardStyle: {},
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
    height: '100%',
    // paddingBottom: getWidthStr(10),
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
  name: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
