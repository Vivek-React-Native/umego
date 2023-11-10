import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {COLORS} from '../../Constants/colors';
import Line from '../../Components/Line/Line';
import ChatItem from '../../Components/Chat/ChatItem';
import Input from '../../Components/Input/Input';
import Feather from 'react-native-vector-icons/Feather';
import {getHeight, getHeightStr} from '../../Helpers/widthHeightHelpers';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {
  chatConversationList,
  sendMessage,
} from '../../Redux/actions/chatActions';
import Loading from '../../Components/Loading/Loading';
import {API_BASE_URL} from '../../Constants/api';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import {getAbsolutePath} from '../../Helpers/getAbsolutePath';
import Modal from 'react-native-modal';
import Button from '../../Components/Button/Button';
import {useTranslation} from 'react-i18next';
import MeetingPopup from '../../Components/MeetingPopup/Meetingpopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'ChatOpenConversationScreen'
  >;
  route: RouteProp<AppStackParamList, 'ChatOpenConversationScreen'>;
};

const ChatOpenConversationScreen = ({navigation, route}: Props) => {
  const [visible, setVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  const [imgUrl, setImgUrl] = React.useState<string>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageId, setImageId] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lang, setLang] = useState('');
  const [data, setData] = useState<any>();
  const [currentUserId, setCurrentUserId] = useState<any>('');
  const [allChatList, setAllChatList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const isFocused = useIsFocused();
  const {isFetchingTask, success} = useAppSelector(state => state.global);
  const {isFetchingChat, conversationList, profileInfo, isSendingMessage} =
    useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

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
      setLoadingImage(true);
      axios({
        method: 'post',
        url: `${API_BASE_URL}/upload/media/`,
        data: imageData,
      })
        .then(function (response) {
          setImageId(response?.data?.data[0]?.id);
          setLoadingImage(false);
          handleMessageWithImage(response?.data?.data[0]?.id);
        })
        .then(error => {
          console.log('error riased', error);
        });
      setLoadingImage(false);
    });
  };

  const handleMessageWithImage = id => {
    dispatch(
      sendMessage({
        recipient: allChatList[0].receipent_details.id,
        content: messageValue,
        message_media: [{media: id}],
      }),
    );
    getChatList();
    setMessageValue('');
  };

  useEffect(() => {
    if (imgUrl || loadingImage) {
      dispatch(
        sendMessage({
          recipient: allChatList[0].receipent_details.id,
          content: imgUrl,
        }),
      );
    }
  }, [loadingImage]);

  useEffect(() => {
    // dispatch(
    //   chatConversationList({
    //     length: 1000,
    //     start: 0
    //     // id: route?.params.talkingWith.id,
    //   }),
    // );
    getChatList();
  }, [isFocused]);

  const getChatList = async () => {
    setLoading(true);
    const endPoint =
      API_BASE_URL +
      `/message/conversation-pagination-list/${route?.params?.talkingWith?.id}/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const body = {
      length: 1000,
      start: 0,
    };
    axios
      .post(endPoint, body, {headers})
      .then(res => {
        setLoading(false);
        setAllChatList(res?.data?.data);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response, 'message error chat');
      });
  };

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
    setCurrentUserId(userId);
  };

  const handleMessage = () => {
    if (messageValue !== '') {
      dispatch(
        sendMessage({
          recipient: allChatList[0].receipent_details.id,
          content: messageValue,
        }),
      );
      // dispatch(
      //   chatConversationList({
      //     length: 1000,
      //     start: 0,
      //     id: route?.params.talkingWith.id,
      //   }),
      // );
      getChatList();
      setMessageValue('');
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <SafeAreaView />
          <View style={styles.header}>
            <View style={styles.headerRightSection}>
              <TouchableOpacity
                style={styles.image}
                onPress={navigation.goBack}>
                <Image source={require('../../Assets/Images/arrow.png')} />
              </TouchableOpacity>
              <View style={styles.user}>
                {allChatList.length > 0 &&
                route?.params.talkingWith?.last_msg?.receipent_details.image
                  .media_file_url ? (
                  <Image
                    style={styles.profileFace}
                    source={{
                      uri: route?.params.talkingWith.last_msg?.receipent_details
                        .image.media_file_url,
                    }}
                  />
                ) : (
                  <Image
                    style={{height: 30, width: 30}}
                    source={require('../../Assets/Images/no_image.png')}
                  />
                )}
                <View style={styles.userInfo}>
                  <Text style={styles.imageText}>
                    {
                      route?.params?.talkingWith?.last_msg?.receipent_details
                        ?.first_name
                    }
                  </Text>
                  {/* <Text style={styles.text2}>
                    {allChatList[0]?.task?.title}
                  </Text> */}
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserReportScreen', {
                  para: allChatList[0].receipent_details.id,
                })
              }
              style={styles.imageError}>
              <Image
                style={styles.errorImage}
                source={require('../../Assets/Images/error.png')}
              />
              <Text style={styles.imageText2}>{t('chatScreen.report')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subHeader}>
            <Line style={styles.line} />
            <Text style={styles.textLine}>
              {moment(allChatList[0]?.created_at).format('DD/MM/YY')}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              {width: '96%'},
              Platform.OS === 'android' && {marginBottom: 75},
            ]}>
            {allChatList.length > 0 &&
              allChatList.map((item, index): any => (
                <ChatItem
                  key={index}
                  chatItem={{
                    message: item.content,
                    from: profileInfo.id === item.send_by.id ? 'them' : 'me',
                    image: item?.message_media,
                  }}
                />
              ))}
          </ScrollView>
          {/* {isPressed ? ( */}

          {route?.params?.talkingWith?.last_msg?.task != '' &&
            currentUserId ==
              route?.params?.talkingWith?.last_msg?.task?.created_by?.id && (
              <>
                {route?.params.talkingWith.last_msg?.task?.task_status ==
                  'pending for applicants' && (
                  <TouchableOpacity
                    style={styles.chatImage}
                    onPress={() => {
                      setData({
                        card: route?.params.talkingWith.last_msg?.task,
                        taskId: route?.params.talkingWith.last_msg?.task?.id,
                      }),
                        setIsOpenModal(true);
                    }}>
                    <Image
                      source={require('../../Assets/Images/chatColored.png')}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          {/* ) : (
          <TouchableOpacity
            style={styles.chatImage}
            onPress={() => setIsPressed(true)}>
            <Image source={require('../../Assets/Images/chat.png')} />
          </TouchableOpacity>
        )
        } */}

          {Platform.OS === 'android' ? (
            <View style={styles.bottomAndroid}>
              <View style={styles.bottomRightSection}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={onImageLibraryPress}>
                  <Feather
                    name="camera"
                    color={COLORS.purpleMekabel}
                    size={25}
                  />
                </TouchableOpacity>
                <Input
                  placeholder={t('chatScreen.message')}
                  defaultValue={messageValue}
                  inputValue={messageValue}
                  onTextChanged={value => {
                    setMessageValue(value);
                  }}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                style={styles.cameraImage2}
                onPress={() => handleMessage()}>
                <Image
                  style={styles.cameraImage2}
                  source={
                    lang == 'en'
                      ? require('../../Assets/Images/chatEnglishArrow.png')
                      : require('../../Assets/Images/chatLeftArrow.png')
                  }
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.bottomIOS}>
              <View style={styles.bottomRightSection}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={onImageLibraryPress}>
                  <Feather
                    name="camera"
                    color={COLORS.purpleMekabel}
                    size={25}
                  />
                </TouchableOpacity>
                <Input
                  placeholder={t('chatScreen.message')}
                  defaultValue={messageValue}
                  inputValue={messageValue}
                  onTextChanged={value => {
                    setMessageValue(value);
                  }}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                style={styles.cameraImage2}
                onPress={() => handleMessage()}>
                <Image
                  source={
                    lang == 'en'
                      ? require('../../Assets/Images/chatEnglishArrow.png')
                      : require('../../Assets/Images/chatLeftArrow.png')
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          <SafeAreaView />
        </KeyboardAvoidingView>
      )}
      {isOpenModal && (
        <MeetingPopup
          data={data}
          visible={isOpenModal}
          navigation={navigation}
          onClose={() => {
            setIsOpenModal(false);
          }}
        />
      )}
    </>
  );
};

export default ChatOpenConversationScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    width: '100%',
    backgroundColor: '#EEE',
    flexDirection: 'row',
    paddingVertical: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'baseline',
  },
  subHeader: {
    borderColor: 'E5E5E5',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  cameraImage: {
    transform: [{scale: 1.5}],
  },
  cameraImage2: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
    zIndex: 99999,
  },
  line: {
    backgroundColor: COLORS.light2,
    borderWidth: 0.5,
  },
  chatImage: {
    alignSelf: 'flex-end',
    position: 'absolute',
    // top: getHeight(500),
    bottom: 125,
    zIndex: 10000,
  },
  imageText: {
    color: '#8D7BAF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Assistant-Medium',
  },
  errorImage: {
    alignSelf: 'center',
    transform: [{scale: 1.1}],
  },
  textLine: {
    color: COLORS.secondaryText,
    position: 'absolute',
    backgroundColor: COLORS.background,
    padding: 1,
    fontWeight: '600',
    fontFamily: 'Assistant-Medium',
  },
  imageText2: {
    color: COLORS.text,
    marginLeft: 10,
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Assistant-Medium',
  },
  imageError: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    marginRight: 15,
    borderRadius: 4,
    paddingHorizontal: 7,
  },
  text2: {
    textAlign: 'left',
    fontFamily: 'Assistant-Medium',
  },
  image: {
    marginHorizontal: 10,
  },
  imageFace: {
    // transform: [{ scale: 1.5 }],
    borderRadius: 2,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  profileFace: {
    transform: [{scale: 1.5}],
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    height: undefined,
    width: 20,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    textAlign: 'left',
    fontFamily: 'Assistant-Medium',
  },
  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 5,
  },
  input: {
    width: '85%',
    alignSelf: 'flex-start',
  },
  bottomRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 5,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 7,
    borderRadius: 50,
    marginRight: 10,
    marginTop: 10,
  },
  bottomIOS: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.disable,
    width: '100%',
  },
  bottomAndroid: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.disable,
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    // height: '100%',
    // width: '105%',
    borderRadius: 10,
    alignSelf: 'center',
  },

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
  icon2: {
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
