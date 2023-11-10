import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../Constants/colors';
import {useTranslation} from 'react-i18next';
import Button from '../../Components/Button/Button';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {coordinateTask} from '../../Redux/actions/taskAction';
import {sendMessage} from '../../Redux/actions/chatActions';
import {API_BASE_URL} from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type Props = {
  visible: boolean;
  onClose: () => void;
  data?: any;
  navigation: any;
};
const MeetingPopup: React.FC<Props> = ({
  visible,
  onClose,
  data,
  navigation,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {profileInfo, isFetchingTask, success} = useAppSelector(
    state => state.global,
  );

  const handleCoordination = async () => {
    const endPoint = API_BASE_URL + `/task/coordinate_task/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const body = {
      task: data.taskId,
      user: profileInfo.id,
    };
    axios
      .post(endPoint, body, {headers})
      .then(res => {
        sendMessageApi();
      })
      .catch(err => {
        console.log(err.response, 'message error');
      });
  };

  const sendMessageApi = async () => {
    const endPoint = API_BASE_URL + `/message/send-message/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const body = {
      recipient: data?.item?.id,
      content: 'Hii',
      task: data?.taskId,
    };

    axios
      .post(endPoint, body, {headers})
      .then(res => {
        onClose();
        // navigation.navigate('RequestsDeletionCompletedScreen')
        navigation.navigate('ChatOpenConversationScreen', {
          talkingWith: res?.data?.data,
        });
      })
      .catch(err => {
        console.log(err.response, 'message error');
      });
  };

  // useEffect(() => {
  //   if (success) {
  //     dispatch(
  //       sendMessage({
  //         recipient: 43,
  //         content: "Hii",
  //         task: data?.taskId
  //       }),
  //     );
  //     // navigation.navigate('RequestsDeletionCompletedScreen')
  //   }
  // }, [success]);

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={visible}>
        <View style={styles.modalView}>
          <View style={styles.headerView}>
            <TouchableOpacity onPress={onClose}>
              <Image
                style={styles.crossButton}
                source={require('../../Assets/Images/CloseX.png')}
              />
            </TouchableOpacity>
            <View style={styles.headerView1}>
              <Text style={styles.headerText}>
                {t('MeetingPopup.taskCoordination')}
              </Text>
              <Text style={[styles.headerText, styles.headerText1]}>
                {data && data.card.title}
              </Text>
            </View>
          </View>
          <View style={styles.contentVieW}>
            <View style={styles.contentItems}>
              <Image
                style={styles.icon}
                source={require('../../Assets/Images/location.png')}
              />
              <Text style={styles.iconText}>{data && data.card.address}</Text>
            </View>
            <View style={[styles.contentItems, {marginVertical: 10}]}>
              <Image
                style={styles.icon}
                source={require('../../Assets/Images/calendar.png')}
              />
              {data && data.card.all_day ? (
                <Text style={styles.iconText}>
                  {data && data.card.start_date} / {data && data.card.end_date}
                </Text>
              ) : (
                <Text style={styles.iconText}>
                  {data && data.card.start_time}, {data && data.card.start_date}{' '}
                  / {data && data.card.end_time}, {data && data.card.end_date}
                </Text>
              )}
            </View>
            <View style={styles.contentItems}>
              <Image
                style={styles.icon}
                source={require('../../Assets/Images/money.png')}
              />
              <Text style={styles.iconText}>₪ {data && data.card.price}</Text>
            </View>
          </View>

          <View style={[styles.contentItems, styles.contentItems1]}>
            <Button
              text={t('MeetingPopup.taskCoordination')}
              variant="filled"
              corners="curved"
              color={COLORS.purpleLight}
              onPress={() => handleCoordination()}
              buttonStyle={styles.button}
              textStyle={styles.buttonTextStyle}
              loading={isFetchingTask}
            />
            <Button
              text={t('MeetingPopup.cancelation')}
              corners="curved"
              color={COLORS.purpleLight}
              onPress={() => onClose()}
              textStyle={styles.buttonTextStyle}
              buttonStyle={styles.button}
            />
          </View>
          {!success ? (
            <Text style={styles.cancellationCaseText}>
              {t('MeetingPopup.cancellationCase')}
            </Text>
          ) : (
            <Text style={styles.success}>{t('success')}</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonTextStyle: {
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  headerText1: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalStyle: {
    backgroundColor: COLORS.white,
    margin: 20,
  },
  contentItems1: {
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  crossButton: {
    height: 14,
    width: 14,
    margin: 2,
  },
  icon: {
    height: 20,
    width: 20,
  },
  contentVieW: {
    margin: 20,
    marginVertical: 10,
  },
  contentItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    color: COLORS.black,
    fontWeight: '400',
  },
  modalView: {
    marginTop: 150,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerView: {
    backgroundColor: COLORS.lightPurple,
    padding: 10,
    borderRadius: 20,
  },
  headerView1: {
    alignSelf: 'center',
    margin: 10,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
  },
  iconText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    marginHorizontal: 15,
    flex: 1,
  },
  cancellationCaseText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: COLORS.error,
    padding: 10,
    fontSize: 12,
  },
  success: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'green',
    padding: 10,
    fontSize: 12,
  },
});
export default MeetingPopup;
