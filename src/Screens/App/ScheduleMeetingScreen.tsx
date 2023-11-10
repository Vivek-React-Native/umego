import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../Constants/AppStackParamList';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import NewCard from '../../Components/Card/NewCard';
import Line from '../../Components/Line/Line';
import { getWidth } from '../../Helpers/widthHeightHelpers';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import { hireRequest, coordinateTask } from '../../Redux/actions/taskAction';
import { getProfileInfo } from '../../Redux/actions/otherActions';
import Card from '../../Components/Card/Card';
import { API_BASE_URL } from '../../Constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'ScheduleMeetingScreen'
  >;
  route: RouteProp<AppStackParamList, 'ScheduleMeetingScreen'>;
};

const ScheduleMeetingScreen = ({ navigation, route }: Props) => {
  const { isLoading, profileInfo, message, error } = useAppSelector(
    state => state.global,
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [taskDetail, setTaskDetail] = useState<any>(route.params.task);
  const [profile, setProfile] = useState<any>(profileInfo);
  const didMount = useRef(false);

  console.log("Params -> ",JSON.stringify(route.params, null, 2))

  useEffect(() => {
    async function getData() {
      await dispatch(getProfileInfo());
    }
    getData();
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (profileInfo) {
      setProfile(profileInfo);
    }
  }, [profileInfo]);

  // const handleRefusal = () => {
  //   dispatch(hireRequest(taskDetail.id));
  //   navigation.navigate('CancelTaskRequestScreen');
  // };

  // const handleConfirmation = async () => {
  //   let data = {
  //     user: profile.id,
  //     task: taskDetail.id,
  //   };
  //   await dispatch(hireRequest(taskDetail.id));
  //   if (message !== 'You already applied on this task') {
  //     dispatch(coordinateTask(data));
  //     navigation.navigate('MeetingScheduledScreen');
  //   } else {
  //     navigation.navigate('AlreadyGottenJobScreen');
  //   }
  // };

  console.log(taskDetail, "----taskDetail.id----");


  const handleConfirmation = async () => {
    const endPoint = API_BASE_URL + `/task/update_coordinate_task_status/${taskDetail.coordinate_id}/`
    const authToken = await AsyncStorage.getItem('auth_token')
    const headers = {
      "Authorization": `Bearer ${authToken}`,
    }
    const data = {
      coordinate_status: 2
    }
    axios.put(endPoint, data, { headers })
      .then((res) => {
        console.log(res?.data?.message, ".....res?.data?.message....");
        if (res?.data?.message == 'Coordination request accepted successfully.') {
          navigation.navigate('MeetingScheduledScreen');
        }
      })
      .catch((err) => {
        console.log(err.response, "message error city");
      });
  }

  const handleRefusal = async () => {
    const endPoint = API_BASE_URL + `/task/update_coordinate_task_status/${taskDetail.coordinate_id}/`
    const authToken = await AsyncStorage.getItem('auth_token')
    const headers = {
      "Authorization": `Bearer ${authToken}`,
    }
    const data = {
      coordinate_status: 1
    }
    axios.put(endPoint, data, { headers })
      .then((res) => {
        if (res?.data?.message == 'Coordination request rejected.') {
          navigation.navigate('AlreadyGottenJobScreen');
        }
        console.log(res?.data?.message, "===---===");
      })
      .catch((err) => {
        console.log(err.response, "message error city");
      });
  }

  return (
    <SafeAreaView>
      <ScreenHeader
        header={t('ScheduleMeeting.taskDetails')}
        isHeaderBold={false}
        showBackButton={true}
      />
      <View style={styles.form}>
        <Card
          card={{
            title: taskDetail.title,
            name: `${taskDetail.created_by.first_name} ${taskDetail.created_by.last_name}`,
            image: taskDetail.created_by.image.media_file_url,
            location: taskDetail.address,
            birthDate: taskDetail.start_date,
            price: taskDetail.price,
            gender: taskDetail.created_by.gender,
          }}
          cardStyle={{
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
          }}
        />
        <View style={styles.details}>
          <Text style={styles.headingText}>{t('ScheduleMeeting.details')}</Text>

          <View style={{ flexGrow: 1 }}>
            <Text style={[styles.detailsText]}>{taskDetail.description}</Text>
          </View>
        </View>

        <Line />

        <View style={styles.buttonView}>
          <Button
            text={t('ScheduleMeeting.confirmation')}
            variant="filled"
            corners="curved"
            color={COLORS.purpleLight}
            onPress={() => {
              handleConfirmation();
              // navigation.navigate("AlreadyGottenJobScreen")
            }}
            buttonStyle={styles.button}
          />

          <Button
            text={t('ScheduleMeeting.refusal')}
            corners="curved"
            size="medium"
            color={COLORS.purpleLight}
            onPress={handleRefusal}
            buttonStyle={[styles.button]}
          />
        </View>

        <Text style={styles.performingTaskStyles}>
          {t('ScheduleMeeting.performingTask')}
        </Text>
      </View>

      <Text style={styles.rewardShownStyles}>
        {t('ScheduleMeeting.rewardShown')}
      </Text>
    </SafeAreaView>
  );
};

export default ScheduleMeetingScreen;

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  details: {
    marginVertical: 10,
    marginHorizontal: 7,
    alignItems: 'flex-start',
  },
  headingText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  detailsText: {
    color: COLORS.text,
    fontWeight: '400',
    fontSize: getWidth(14),
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: 'left',
  },

  performingTaskStyles: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.black,
  },
  rewardShownStyles: {
    textAlign: 'center',
    marginVertical: 10,
    color: COLORS.error,
  },
  button: {
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 10,
    flex: 1,
  },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 30,
    width: '95%',
    alignSelf: 'center',
  },
});
