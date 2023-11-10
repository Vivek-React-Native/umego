import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import ServiceProviderCard from '../../Components/ServiceProviderCard/ServiceProviderCard';
import Line from '../../Components/Line/Line';
import {COLORS} from '../../Constants/colors';
import SPInterestedRequestCard from '../../Components/SPInterestedRequestCard/SPInterestedRequestCard';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {getAppliedUserByTaskID} from '../../Redux/actions/taskAction';
import Loading from '../../Components/Loading/Loading';
import MeetingPopup from '../../Components/MeetingPopup/Meetingpopup';
import {clearStates} from '../../Redux/reducer/reducer';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import {API_BASE_URL} from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'SPInterestedInYourRequestScreen'
  >;
  route: RouteProp<AppStackParamList, 'SPInterestedInYourRequestScreen'>;
};

const SPInterestedInYourRequestScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {isFetchingTask, appliedTaskList, success, error} = useAppSelector(
    state => state.global,
  );
  const [data, setData] = useState<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [lang, setLang] = useState<any>('');
  console.log('route.params.card', JSON.stringify(route.params.card, null, 2));
  useEffect(() => {
    dispatch(getAppliedUserByTaskID(route.params.taskId));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearStates());
    }, 2000);
  }, [success, error]);
  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
  };
  // console.log("PROPS ::: ",JSON.stringify(route))
  const goToChat = async (taskId, recipientId) => {
    console.log('taskId ::', taskId);
    console.log('recipientId ::', recipientId);
    const endPoint = API_BASE_URL + `/message/send-message/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const body = {
      recipient: recipientId,
      content: 'Hii',
      task: taskId,
    };

    axios
      .post(endPoint, body, {headers})
      .then(res => {
        console.log(res?.data?.data?.id, '-------');
        navigation.navigate('ChatOpenConversationScreen', {
          talkingWith: res?.data?.data,
        });
      })
      .catch(err => {
        console.log(err.response, 'message error');
      });
  };

  return (
    <>
      {isFetchingTask && <Loading />}

      <SafeAreaView style={{flex: 1}}>
        <ScreenHeader
          header={t('spInterestedInOurRequestScreen.header')}
          showBackButton
        />

        <ServiceProviderCard
          card={{
            name: 'דנה',
            title: route.params.card.title,
            image: require('../../Assets/Images/person.png'),
            location: route.params.card.address,
            birthDate: `${route.params.card.start_time}  ${route.params.card.start_date}`,
            price: '₪ ' + route.params.card.price,
            gender: '',
            problem: 'מה קרה?',
            statement: 'הערות',
          }}
        />
        <Line style={styles.line} />
        <ScrollView contentContainerStyle={styles.scroll}>
          {appliedTaskList?.map((item: any, index) => {
            let englishgender = '';
            if (lang == 'he') {
              if (item.gender == 'Male') {
                englishgender = 'זכר';
              } else if (item.gender == 'Female') {
                englishgender = 'נקבה';
              } else if (item.gender == 'Other') {
                englishgender = 'אחר';
              } else if (item.gender == 'Prefers not to specify') {
                englishgender = 'מעדיפ/ה לא לציין';
              } else {
                englishgender = item.gender;
              }
            } else {
              if (lang == 'en') {
                if (item.gender == 'גבר') {
                  englishgender = 'Male';
                } else if (item.gender == 'אישה') {
                  englishgender = 'Female';
                } else {
                  englishgender = item.gender;
                }
              }
            }
            // console.log("Item ::",item)
            return (
              <SPInterestedRequestCard
                key={index}
                card={{
                  name: item.first_name + ' ' + item?.last_name,
                  title: route.params.card.title,
                  image: item.image.media_file_url,
                  rating: item.rating,
                  gender: englishgender,
                }}
                maxRating={[1, 2, 3, 4, 5]}
                onRatingStart={(item, key) => {
                  // let modifiedarr = spState;
                  // modifiedarr[index].rating = item;
                  // setSpState(modifiedarr);
                }}
                handleCancelButton={() => {
                  setData({
                    card: route.params.card,
                    taskId: route.params.taskId,
                    item: item.id,
                  });
                  setTimeout(() => {
                    setShowPopup(true);
                  }, 500);
                }}
                handleChatButton={() => {
                  // navigation.navigate('ChatScreen');
                  goToChat(route.params.taskId, item.id);
                }}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
      {showPopup && (
        <MeetingPopup
          data={data}
          visible={showPopup}
          navigation={navigation}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </>
  );
};

export default SPInterestedInYourRequestScreen;

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
    fontFamily: 'Assistant-VariableFont_wght',
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
    flexGrow: 1,
    paddingBottom: getWidthStr(10),
    alignItems: 'center',
  },
  line: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: COLORS.lightPurple,
  },
});
