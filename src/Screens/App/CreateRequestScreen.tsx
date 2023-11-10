import {
  Switch,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../Constants/colors';
import SelectList from '../../Components/SelectList/SelectList';
import Input from '../../Components/Input/Input';
import {Cities} from '../../Constants/dummyData';
import DateTimePicker from '../../Components/DateTimePicker/DateTimePicker';
import DatePicker from 'react-native-date-picker';
import Button from '../../Components/Button/Button';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {
  getCategories,
  getSubCategories,
} from '../../Redux/actions/otherActions';
import {CreateTaskModel} from '../../Models/TaskModels';
import AnimatedSelectList from '../../Components/SelectList/AnimatedSelectList';
import SelectListTrigger from '../../Components/SelectList/SelectListTrigger';
import {clearStates} from '../../Redux/reducer/reducer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_BASE_URL} from '../../Constants/api';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'CreateRequestScreen'
  >;
  route: RouteProp<AppStackParamList, 'CreateRequestScreen'>;
};

let initialErrors = {
  category: false,
  subCategory: false,
  title: false,
  description: false,
  city: false,
  isAllday: false,
  start_time: false,
  end_time: false,
  start_date: false,
  end_date: false,
  price: false,
  address: false,
};
const initialState: CreateTaskModel = {
  category: 0,
  sub_category: 0,
  title: '',
  description: '',
  city: '',
  all_day: false,
  start_date: '',
  start_time: null,
  end_date: '',
  end_time: null,
  price: null,
  address: '',
  user: 5,
};
const CreateRequestScreen = ({navigation, route}: Props) => {
  const RouteParam = route?.params;
  const [DATE, setDATE] = useState<{
    StartDate: Date | undefined;
    StartTime: Date | undefined;
  }>({StartDate: new Date(), StartTime: new Date()});
  const {t} = useTranslation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [allCity, setAllCity] = useState([]);
  const [selectListDataSource, setSelectListDataSource] = useState([]);
  const [mode, setMode] = useState<'date' | 'time' | 'datetime'>('date');
  const [dateValueFor, setDateValueFor] = useState<
    'start_time' | 'start_date' | 'end_time' | 'end_date'
  >();
  const [start_time, setStart_time] = useState({data: null, error: false});
  const [end_time, setEnd_time] = useState({data: null, error: false});
  const [start_date, setStart_date] = useState({data: '', error: false});
  const [end_date, setEnd_date] = useState({data: '', error: false});
  const [all_day, setAll_day] = useState({data: false, error: false});
  const [category, setCategory] = useState({data: -1, error: false});
  const [city, setCity] = useState({data: '', error: false});
  const [title, setTitle] = useState({data: '', error: false});
  const [sub_category, setSub_category] = useState({data: -1, error: false});
  const [description, setDescription] = useState({data: '', error: false});
  const [price, setPrice] = useState({data: '', error: false});
  const [address, setAddress] = useState({data: '', error: false});
  const [timeOpen, setTimeOpen] = useState(false);
  const [modalvisible, setModalVisible] = useState(false);
  const [isSelectListOpen, setIsSelectListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [HasCreditCardDetails, setHasCreditCardDetails] = useState(false);
  const IsFocused = useIsFocused();
  const handleSwitchChange = (value: boolean) => {
    setAll_day({data: value, error: false});
    setIsSwitchOn(value);
  };
  const dispatch = useAppDispatch();
  const {
    isFetchingCategories,
    categories,
    subCategories,
    isFetchingSubCategories,
    isFetchingTask,
    success,
    message,
    profileInfo,
    error,
  } = useAppSelector(state => state.global);

  console.log('HasCreditCardDetails -> ', HasCreditCardDetails);
  console.log('profileInfo?.iframe_url -> ', profileInfo?.iframe_url);

  const handleSubmit = async () => {
    let isSendable = true;
    // if (!all_day.data) {
    //   if (start_time.data === null || start_time.error) {
    //     setStart_time({ ...start_time, error: true });
    //     isSendable = false;
    //   }
    //   if (end_time.data === null || end_time.error) {
    //     isSendable = false;
    //     setEnd_time({ ...end_time, error: true });
    //   }
    // }
    // if (start_date.data !== '' && (end_date.data === '' || end_date.error)) {
    //   isSendable = false;
    //   setEnd_date({...end_date, error: true});
    // }
    if (end_date.data === '' && (start_date.data === '' || start_date.error)) {
      if (!all_day.data) {
        isSendable = false;
        setStart_date({...start_date, error: true});
      }
    }
    if (category.data === -1 || category.error) {
      isSendable = false;
      setCategory({...category, error: true});
    }
    if (city.data === '' || city.error) {
      isSendable = false;
      setCity({...city, error: true});
    }
    if (title.data === '' || title.error) {
      isSendable = false;
      setTitle({...title, error: true});
    }
    if (sub_category.data === -1 || sub_category.error) {
      isSendable = false;
      setSub_category({...sub_category, error: true});
    }
    if (description.data === '' || description.error) {
      isSendable = false;
      setDescription({...description, error: true});
    }
    if (price.data === '' || price.error) {
      isSendable = false;
      setPrice({...price, error: true});
    }
    if (address.data === '' || address.error) {
      isSendable = false;
      setAddress({...address, error: true});
    }

    if (isSendable) {
      if (!HasCreditCardDetails && profileInfo?.iframe_url !== null) {
        setModalVisible(true);
      } else {
        const data = {
          start_time: start_time.data,
          end_time: end_time.data,
          start_date: start_date.data,
          end_date: end_date.data,
          all_day: all_day.data,
          category: category.data,
          city: city.data,
          title: title.data,
          sub_category: sub_category.data,
          description: description.data,
          price: price.data,
          address: address.data,
        };
        const endPoint = API_BASE_URL + `/task/create-task/`;
        const authToken = await AsyncStorage.getItem('auth_token');
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        axios
          .post(endPoint, data, {headers})
          .then(res => {
            navigation.navigate('RequestCreatedScreen');
          })
          .catch(err => {
            console.log(err.response, 'message error req');
          });
      }

      // dispatch(createTask(dataToBeSent));
    }
  };

  useEffect(() => {
    dispatch(getCategories());
    getCountry();
  }, []);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearStates());
      }, 1000);
    }
  }, [message, success]);

  useEffect(() => {
    if (IsFocused && RouteParam?.hasCreditCardDetails) {
      setHasCreditCardDetails(RouteParam?.hasCreditCardDetails);
    }
  }, [IsFocused]);

  const getCountry = async () => {
    const endPoint = API_BASE_URL + `/city/get-all-cities/`;
    const authToken = await AsyncStorage.getItem('auth_token');
    const lng = await AsyncStorage.getItem('lng');
    const headers = {
      Authorization: `Bearer ${authToken}`,
      lang: lng == 'en' ? 'en' : 'ar',
    };
    axios
      .get(endPoint, {headers})
      .then(res => {
        setAllCity(res?.data?.data);
      })
      .catch(err => {
        console.log(err.response, 'message error');
      });
  };

  const handleDateChange = value => {
    const val = moment(value).format('DD/MM/YYYY');
    setIsOpen(false);
    if (dateValueFor == 'start_date') {
      setStart_date({data: val, error: false});
      setEnd_date({data: '', error: false});
      setStart_time({data: '', error: false});
      setEnd_time({data: '', error: false});
      setDATE(p => ({...p, StartDate: value}));
    }
    if (dateValueFor == 'end_date') {
      setEnd_date({data: val, error: false});
      setEnd_time({data: '', error: false});
    }
  };
  const handleTimeChange = (value: Date) => {
    setTimeOpen(false);
    if (dateValueFor === 'start_time') {
      setStart_time({data: value.toLocaleTimeString(), error: false});
      setEnd_time({data: '', error: false});
      setDATE(p => ({...p, StartTime: value}));
    }
    if (dateValueFor === 'end_time') {
      setEnd_time(p => ({...p, data: value?.toLocaleTimeString()}));
    }
  };

  const MinimumTime = React.useMemo(() => {
    if (start_date.data === end_date.data) {
      return DATE.StartDate;
    }
    return new Date(DATE.StartTime?.setHours(0, 0, 0));
  }, [start_date, end_date, start_time, end_time]);

  return (
    <>
      <AnimatedSelectList
        dataSource={selectListDataSource}
        onSelect={value => {
          if (selectListDataSource === categories) {
            setSelectedSubCat('');
            setSelectedCategory(value.name);
            setCategory({data: value.id, error: false});
            setSub_category({data: -1, error: true});
            dispatch(getSubCategories(value.id));
          }
          if (selectListDataSource === subCategories) {
            setSub_category({data: value.id, error: false});
            setSelectedSubCat(value.name);
          }
          if (selectListDataSource === Cities) {
            setCity({data: value.name, error: false});
          }
        }}
        displayValue="name"
        isOpen={isSelectListOpen}
        setIsOpen={value => setIsSelectListOpen(value)}
      />
      <KeyboardAvoidingView
        onTouchStart={Keyboard.dismiss}
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
        <ScreenHeader
          header={t('createRequestScreen.createARequest')}
          isHeaderBold={true}
          showBackButton={true}
          style={styles.header}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={[styles.scrollView]}>
          <View style={styles.form}>
            <SelectListTrigger
              label={t('createRequestScreen.category')}
              onPress={() => {
                if (categories.length > 0) {
                  setSelectListDataSource(categories);
                  setIsSelectListOpen(true);
                }
              }}
              loading={isFetchingCategories}
              error={category.error}
              value={selectedCategory}
            />
            <SelectListTrigger
              label={t('createRequestScreen.subCategory')}
              onPress={() => {
                if (subCategories.length > 0) {
                  setSelectListDataSource(subCategories);
                  setIsSelectListOpen(true);
                }
              }}
              value={selectedSubCat}
              error={sub_category.error}
              loading={isFetchingSubCategories}
            />
            <Input
              onTextChanged={(value: string) =>
                setTitle({data: value, error: value === ''})
              }
              label={t('createRequestScreen.title')}
              style={styles.input}
              error={title.error}
              name={'title'}
            />
            {/* <Input
              onTextChanged={(value: string) =>
                setDescription({ data: value, error: value === '' })
              }
              label={t('createRequestScreen.explainRequest')}
              style={styles.input}
              error={description.error}
              multiline={true}
              inputStyle={{ borderWidth: 1, borderColor: 'black', borderBottomColor: 'red', borderBottomWidth: 1 }}
            /> */}

            <Text
              style={{
                marginHorizontal: '4%',
                fontFamily: 'Assistant-Medium',
                alignSelf: 'flex-start',
              }}>
              {t('createRequestScreen.explainRequest')}
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                marginTop: '2%',
                // paddingHorizontal: '5%',
                height: '15%',
                borderWidth: 1,
                borderColor: '#F0F0F0',
                marginHorizontal: '4%',
                marginBottom: 8,
                alignItems: 'flex-end',
              }}>
              {/* <TextInput
                style={[{ alignItems: 'flex-end', fontFamily: 'Assistant-Medium' }]}
                placeholder={'Enter Your Message'}
                multiline={true}
                onChangeText={(value: string) =>
                  setDescription({ data: value, error: value === '' })
                }
                // textAlignVertical={'top'}
                // numberOfLines={7}
                placeholderTextColor={'#7C7C80'}
              /> */}
              <Input
                onTextChanged={(value: string) => {
                  setDescription({data: value, error: value === ''});
                }}
                // label={t('createRequestScreen.address')}
                inputStyle={{borderBottomWidth: 0}}
                style={{borderBottomWidth: 0}}
                multiline={true}
                numberOfLines={7}
              />
            </View>

            <SelectList
              displayValue="city"
              dataSource={allCity}
              onSelect={(value: any) => {
                setCity({data: value, error: value === ''});
              }}
              label={t('createRequestScreen.city')}
              error={city.error}
            />
            <Input
              onTextChanged={(value: string) => {
                setAddress({data: value, error: value === ''});
              }}
              label={t('createRequestScreen.address')}
              style={styles.input}
              error={address.error}
            />

            <View style={styles.switch}>
              <Text style={styles.switchText}>
                {t('createRequestScreen.allDay')}
              </Text>
              <Switch
                onValueChange={handleSwitchChange}
                value={isSwitchOn}
                thumbColor={isSwitchOn ? COLORS.light : COLORS.subText}
                trackColor={{
                  false: COLORS.disable,
                  true: COLORS.lightPurple,
                }}
              />
            </View>
            <View style={styles.dateArea}>
              <View style={styles.dateSection}>
                <DateTimePicker
                  mode="date"
                  triggerOpening={() => {
                    setDATE(p => ({...p, StartDate: new Date()}));
                    setMode('date');
                    setIsOpen(true);
                    setDateValueFor('start_date');
                  }}
                  title={t('createRequestScreen.startDate')}
                  image={require('../../Assets/Images/calendarSmall.png')}
                  value={start_date.data}
                  error={start_date.error}
                />
                <DateTimePicker
                  mode="time"
                  triggerOpening={() => {
                    setMode('time');
                    setTimeOpen(true);
                    setDateValueFor('start_time');
                  }}
                  title={t('createRequestScreen.beginningTime')}
                  image={require('../../Assets/Images/clockSmall.png')}
                  value={start_time.data}
                  disabled={isSwitchOn}
                  error={start_time.error}
                />
              </View>
              <View style={styles.dateSection}>
                <DateTimePicker
                  mode="date"
                  triggerOpening={() => {
                    setMode('date');
                    setIsOpen(true);
                    setDateValueFor('end_date');
                  }}
                  title={t('createRequestScreen.endDate')}
                  image={require('../../Assets/Images/calendarSmall.png')}
                  value={end_date.data}
                  error={end_date.error}
                />
                <DateTimePicker
                  mode="time"
                  triggerOpening={() => {
                    setMode('time');
                    setTimeOpen(true);
                    setDateValueFor('end_time');
                  }}
                  image={require('../../Assets/Images/clockSmall.png')}
                  title={t('createRequestScreen.endTime')}
                  value={end_time.data}
                  disabled={isSwitchOn}
                  error={end_time.error}
                />
              </View>
              <Input
                onTextChanged={(value: string) => {
                  setPrice({data: value, error: value === ''});
                }}
                label={t('createRequestScreen.price')}
                style={styles.input}
                error={price.error}
                keyboardType={'numeric'}
              />
              <Button
                onPress={handleSubmit}
                text={t('createRequestScreen.requestPost')}
                size="xlarge"
                color={COLORS.purpleLight}
                variant="filled"
                corners="curved"
                buttonStyle={styles.button}
                loading={isFetchingTask}
              />
              {success && <Text style={styles.message}>{message}</Text>}
              {error && <Text style={styles.error}>{message}</Text>}
            </View>
            <View style={{height: 100}} />
          </View>
        </ScrollView>
        <DateTimePickerModal
          isVisible={isOpen}
          mode={mode}
          date={DATE.StartDate}
          minimumDate={new Date()}
          onConfirm={handleDateChange}
          onCancel={() => setIsOpen(false)}
        />
        {console.log(
          'minimum time -> ',
          moment(MinimumTime).format('DD/MM/YYYY hh:mm'),
        )}
        <DateTimePickerModal
          isVisible={timeOpen}
          mode={mode}
          date={DATE.StartDate}
          minimumDate={MinimumTime}
          onConfirm={handleTimeChange}
          onCancel={() => setTimeOpen(false)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalvisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalMain}>
            <View style={styles.modal}>
              <View style={styles.modalheader}>
                <Text style={styles.headerTitleStyle}>
                  השלמת פרטי כרטיס אשראי
                </Text>
              </View>
              <View style={styles.contentMain}>
                <Text style={[styles.valuesText, {marginVertical: 10}]}>
                  פרטי האשראי שלך לא קיימים אצלנו במערכת.
                </Text>
                <Text style={styles.valuesText}>
                  כדי שנוכל לחייב אותך על הבקשה,
                </Text>
                <Text style={styles.valuesText}>נשמח להשלמת פרטי האשראי</Text>
                <Text style={styles.valuesText}>לפני פתיחת בקשה חדשה.</Text>
                <View style={styles.buttonMain}>
                  <Button
                    // text={t('deleteModel.delete_Model')}
                    text="לדף הבית"
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('HomeScreen');
                    }}
                    color={COLORS.purpleLight}
                    textStyle={styles.buttonText}
                    variant="filled"
                    corners="curved"
                    textColor={COLORS.purpleLight}
                    buttonStyle={styles.buttonOutlineStyle}
                  />
                  <Button
                    // text={t('deleteModel.cancel_Model')}
                    text="להכנסת פרטי אשראי"
                    onPress={() => {
                      setModalVisible(false),
                        // navigation.navigate('CreditCardScreen');
                        navigation.navigate('PaymentWebview', {
                          url: profileInfo?.iframe_url,
                        });
                    }}
                    color={COLORS.purpleLight}
                    textStyle={styles.buttonText}
                    variant="filled"
                    corners="curved"
                    buttonStyle={styles.buttonStyle}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateRequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 10,
    marginTop: 15,
    elevation: 2,
    paddingBottom: 10,
    width: '92%',
    marginBottom: 10,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  scrollView: {
    bottom: 20,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  switchText: {
    marginRight: 10,
    fontFamily: 'Assistant-Medium',
  },
  dateArea: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  datePicker: {
    position: 'absolute',
    borderStyle: 'solid',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120%',
    zIndex: 500,
  },
  button: {
    marginTop: 10,
    padding: 10,
  },
  confirmButton: {
    position: 'absolute',
    top: '70%',
  },
  header: {
    marginTop: '10%',
    marginBottom: 10,
  },
  input: {
    marginVertical: 7,
  },
  message: {
    color: 'green',
    fontWeight: 'bold',
    fontStyle: 'italic',
    alignSelf: 'center',
    marginVertical: 5,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontStyle: 'italic',
    alignSelf: 'center',
    marginVertical: 5,
  },
  modalMain: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalheader: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: COLORS.lightPurple,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  headerTextStyle: {
    fontWeight: '300',
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'Assistant-Medium',
  },
  headerTitleStyle: {
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'Assistant-Medium',
  },
  contentMain: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  valuesText: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 10,
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: 'Assistant-Medium',
  },
  buttonMain: {
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '300',
    fontSize: 14,
  },
  buttonStyle: {
    width: '55%',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  buttonOutlineStyle: {
    width: '40%',
    //paddingVertical: 12,
    backgroundColor: COLORS.transparent,
  },
});
