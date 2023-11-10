import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../Constants/AppStackParamList';
import { RouteProp } from '@react-navigation/native';
import { getWidthStr } from '../../Helpers/widthHeightHelpers';
import Drawer from '../../Components/Drawer/Drawer';
import { COLORS } from '../../Constants/colors';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import { getOpenTaskList } from '../../Redux/actions/taskAction';

import Loading from '../../Components/Loading/Loading';
import AnimatedSelectList from '../../Components/SelectList/AnimatedSelectList';
import Card from '../../Components/Card/Card';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'JobProposalMainScreen'
  >;
  route: RouteProp<AppStackParamList, 'JobProposalMainScreen'>;
};

const JobProposalMainScreen = ({ navigation, route }: Props) => {
  console.log("Route Data",route.params?.categoryFilter?.id)
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<any>({
    id: -1,
    name: '',
  });

  const [selectedCity, setSelectedCity] = useState({
    id: -1,
    name: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(-1);
  const {
    isFetchingTask,
    taskList,
    isFetchingCategories,
    isFetchingSubCategories,
    subCategories,
    // categories,
    token,
  } = useAppSelector(state => state.global);
  const [refreshing, setrefreshing] = useState(false);
  const [taskListState, setTaskListState] = useState(taskList);
  const [allCity, setAllCity] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [dataSource, setDataSource] = useState({
    type: 'category',
    data: [],
  });

  useEffect(() => {
    dispatch(getOpenTaskList());
    // dispatch(getCategories());
    getCategories();
  }, [dispatch]);
  useEffect(() => {
    if (taskList) {
      // setTaskListState(taskList);
      if (taskList.length < 0) {
        navigation.navigate('JobProposalNoResultScreen');
      }
    }
  }, [taskList]);
const getCategories = async() => {
    setrefreshing(true)
    const lng = await AsyncStorage.getItem("lng");
    try{
      const response = await fetch(API_BASE_URL + '/task/get-categories/',{
        method:"GET",
        headers:{
          Authorization: 'Bearer ' + token,
        "lang": lng == "en" ? "en" : "ar"
        }
      })
      const res = await response.json();
      console.log("RESPONSE CATEGORY ::>>>",res?.data)
      setCategories(res?.data)
    }catch(e){
      console.log("Error",e)
    }
    setrefreshing(false)
  }
  useEffect(() => {
    if (categories) {
      setDataSource({
        type: 'category',
        data: categories,
      });
    }
    if (route.params) {
      const filetered = taskList.filter(
        item => item.category?.id === route.params.categoryFilter.id,
      );
      setTaskListState(filetered);
      setSelectedCategory({
        id: route.params.categoryFilter.id,
        name: route.params.categoryFilter.name,
      });
    }
  }, [categories]);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedCategory.id > 0) {
      // dispatch(getSubCategories(selectedCategory.id));
      getSubCategories()
    }
  }, [selectedCategory]);
  const getSubCategories=async()=> {
    const lng = await AsyncStorage.getItem("lng");
    try{
      const response = await fetch(`https://api.umegoirl.com/api/task/get-sub-categories/${selectedCategory.id}`,{
        method:"GET",
        headers: {
          Authorization: 'Bearer ' + token,
          "lang": lng == "en" ? "en" : "ar"
        },
      })
      // const res = await response.json();
    }catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
    getCountry()
  }, []);

  const getCountry = async () => {
    const endPoint = API_BASE_URL + `/city/get-all-cities/`
    const authToken = await AsyncStorage.getItem('auth_token')
    const lng = await AsyncStorage.getItem("lng");
    const headers = {
      "Authorization": `Bearer ${authToken}`,
      "lang": lng == "en" ? "en" : "ar"
    }

    axios.get(endPoint, { headers })
      .then((res) => {
        setAllCity(res?.data?.data)
      })
      .catch((err) => {
      });
  }

  const onRefresh = () => {
    setrefreshing(true);
    dispatch(getOpenTaskList());
    getCategories()
    // dispatch(getCategories());
    setrefreshing(false);
  };
  const handleAnimation = () => {
    if (!isOpen) {
      setIsOpen(true);
      Animated.timing(opacity, {
        useNativeDriver: true,
        duration: 300,
        easing: Easing.ease,
        toValue: 1,
      }).start();
      Animated.timing(scale, {
        useNativeDriver: true,
        duration: 500,
        easing: Easing.ease,
        toValue: 1,
      }).start();
    } else {
      Animated.timing(opacity, {
        useNativeDriver: true,
        duration: 500,
        easing: Easing.ease,
        toValue: 0,
      }).start();
      Animated.timing(scale, {
        useNativeDriver: true,
        duration: 300,
        easing: Easing.ease,
        toValue: 0,
      }).start();
      setTimeout(() => {
        setIsOpen(false);
      }, 750);
    }
  };

  const handleSelection = (selectedItem: any) => {
    if (dataSource.type === 'category') {
      setSelectedSubCategory('');
      const filetered = taskList.filter(
        item => item.category?.id === selectedItem.id,
      );
      setTaskListState(filetered);
      setSelectedCategory({ id: selectedItem.id, name: selectedItem.name });
    }
    if (dataSource.type === 'subCategory') {
      const filetered = taskList.filter(
        item => item.sub_category?.id === selectedItem.id,
      );
      setTaskListState(filetered);
      setSelectedSubCategory({ id: selectedItem.id, name: selectedItem.name });
    }
    if (dataSource.type === 'city') {
      const filetered = taskList.filter(
        item => item.city === selectedItem.name,
      );
      setTaskListState(filetered);
      setSelectedCity({ id: selectedItem.id, name: selectedItem.name });
    }
    handleAnimation();
  };

  const handleCardPress = (task: any) => {
    navigation.navigate('RequestDetailScreen', {
      taskID: task.id,
      task: task,
    });
  };

  return (
    <>
      {refreshing && <Loading />}
      <AnimatedSelectList
        dataSource={dataSource.data}
        onSelect={value => {
          handleSelection(value);
        }}
        displayValue="name"
        isOpen={isOpen}
        setIsOpen={value => setIsOpen(value)}
      />
      {!isOpen ?
        <Drawer style={{ marginTop: '5%' }} />
        :
        <View style={{ height: 40 }} />
      }
      <SafeAreaView>
        <ScreenHeader header={t('aroundMe')} />
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.boxes}>
            <TouchableOpacity
              style={styles.box1A}
              onPress={() => {
                setDataSource({
                  type: 'city',
                  data: allCity,
                });
                handleAnimation();
              }}>
              <Text numberOfLines={1} style={styles.text1}>
                {selectedCity.name ? selectedCity.name : t('all')}
              </Text>
              <Image
                style={styles.arrows}
                source={require('../../Assets/Images/arrowDown.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box1C}
              onPress={() => {
                setDataSource({
                  type: 'category',
                  data: categories,
                });
                handleAnimation();
              }}>
              {isFetchingCategories ? (
                <ActivityIndicator color={'black'} />
              ) : (
                <Text numberOfLines={1} style={styles.text1}>
                  {selectedCategory.name ? selectedCategory.name : t('all')}
                </Text>
              )}
              <Image
                style={styles.arrows1}
                source={require('../../Assets/Images/arrowDown.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box1B}
              onPress={() => {
                if (subCategories.length > 0) {
                  setDataSource({
                    type: 'subCategory',
                    data: subCategories,
                  });
                  handleAnimation();
                }
              }}>
              {isFetchingSubCategories ? (
                <ActivityIndicator color={'black'} />
              ) : (
                <Text numberOfLines={1} style={styles.text1}>
                  {selectedSubCategory.name
                    ? selectedSubCategory.name
                    : t('all')}
                </Text>
              )}
              <Image
                style={styles.arrows}
                source={require('../../Assets/Images/arrowDown.png')}
              />
            </TouchableOpacity>
          </View>
          {taskListState?.length > 0 &&
            taskListState.map((task, index): any => {
              return(
              <Card
                key={index}
                onPress={() => handleCardPress(task)}
                card={{
                  title: task.title,
                  name: `${task.created_by?.first_name} ${task.created_by?.last_name}`,
                  image: task.created_by?.image?.media_file_url,
                  location: task.address,
                  birthDate: task.start_date,
                  price: task.price,
                  gender: task.created_by?.gender,
                }}
              />
            )})}
        </ScrollView>
      </SafeAreaView>
      {taskListState?.length < 1 && (
        <Image
          style={styles.noData}
          source={require('../../Assets/Images/no_data.png')}
        />
      )}
    </>
  );
};

export default JobProposalMainScreen;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    height: '10%',
  },
  imageText: {
    color: COLORS.light,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  humanImage: {},
  card: {},
  mid: {
    alignSelf: 'center',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
    width: 94,
    borderColor: 'rgba(240, 240, 240, 1)',
  },
  box1A: {
    display: 'flex',
    flexDirection: 'row',
    width: 94,
    justifyContent: 'space-between',

    borderBottomColor: COLORS.light,
    borderBottomWidth: 1,
  },
  box1B: {
    borderBottomColor: COLORS.light,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    width: 94,
    justifyContent: 'space-between',
    borderColor: 'rgba(240, 240, 240, 1)',
  },

  box1C: {
    borderBottomColor: COLORS.light,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    width: 94,
    justifyContent: 'space-between',
    // marginLeft: 30,
    borderColor: 'rgba(240, 240, 240, 1)',
    // borderWidth: 1,
  },
  arrows: {},
  arrows1: {},
  text1: {
    fontWeight: '400',
    textAlign: 'right',
    fontFamily: 'Assistant-Medium',
  },
  subHeader: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
    color: '#000',
  },
  boxes: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  scroll: {
    paddingBottom: getWidthStr(40),
    alignItems: 'center',
    marginTop: 15,
  },
  animated: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100000,
  },
  listitem: {
    backgroundColor: COLORS.lightPurple,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  liststyle: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
    width: '80%',
    marginVertical: '15%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  closeIcon: {
    backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    bottom: '10%',
    left: '15%',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  noresult: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
  },
  noData: {
    position: 'absolute',
    alignSelf: 'center',
    width: getWidthStr(50),
    height: undefined,
    aspectRatio: 1,
    bottom: '10%',
  },
});
