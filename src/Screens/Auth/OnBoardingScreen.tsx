import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AuthStackParamList} from '../../Constants/AuthStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {onBoardingDummy} from '../../Constants/dummyData';
import Person, {PersonModel} from '../../Components/Person/Person';
import Label from '../../Components/Label/Label';
import Card from '../../Components/Card/Card';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import Drawer from '../../Components/Drawer/Drawer';
import Button from '../../Components/Button/Button';
import {COLORS} from '../../Constants/colors';
import {useAppDispatch} from '../../Redux/store/store';
import {useTranslation} from 'react-i18next';
import PersonOnBoarding from '../../Components/PersonOnBoarding/PersonOnBoarding';
import {API_BASE_URL} from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {formatDate} from '../../Helpers/FormatDate';
type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OnBoardingScreen'>;
  route: RouteProp<AuthStackParamList, 'OnBoardingScreen'>;
};

const OnBoardingScreen = ({navigation, route}: Props) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [lang, setLang] = useState<any>('');
  const [allTask, setAllTask] = useState<any>([]);
  const getUserId = async () => {
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
  };
  useEffect(() => {
    getUserId();
  }, []);
  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = async () => {
    const endPoint = API_BASE_URL + `/task/get-open-task-list-without-token/`;
    axios
      .get(endPoint)
      .then(res => {
        setAllTask(res?.data?.data);
      })
      .catch(err => {
        console.log(err.response, 'message error');
      });
  };

  const renderItem = ({item}) => {
    let englishgender = '';
    if (lang == 'he') {
      if (item?.created_by?.gender == 'Male') {
        englishgender = 'זכר';
      } else if (item?.created_by?.gender == 'Female') {
        englishgender = 'נקבה';
      } else if (item?.created_by?.gender == 'Other') {
        englishgender = 'אחר';
      } else {
        englishgender = 'מעדיפ/ה לא לציין';
      }
    } else {
      englishgender = item?.created_by?.gender;
    }
    console.log('Render Items :::', englishgender);
    return (
      <Card
        onPress={() => navigation.navigate('SignInScreen')}
        card={{
          // name: `${item?.created_by.first_name}`,
          name: item?.created_by?.first_name,
          title: item?.title,
          image: item?.created_by?.image?.media_file_url,
          location: item?.address,
          birthDate: formatDate(item?.start_date, 'MM/DD/YY'),
          price: `${item?.price}`,
          gender: englishgender,
          // gender: item?.created_by?.gender,
        }}
        cardStyle={{}}
      />
    );
  };

  return (
    <SafeAreaView>
      <Drawer />
      <View style={styles.header}>
        <Image
          style={{height: 45, width: 120}}
          source={require('../../Assets/Images/app-logo.png')}
        />
        {/* <Text style={[styles.imageText, { marginTop: 10 }]}>
          {t('onBoardingScreen.yourTimeChanges')}
        </Text> */}
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subHeader}>
          <Text>{t('onBoardingScreen.stuckWithCore')}</Text>
          <Button
            text={t('onBoardingScreen.createRequest')}
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}
            color={COLORS.purpleLight}
            variant="filled"
            corners="curved"
          />
        </View>
        <View style={styles.containerStyle}>
          {onBoardingDummy.map((person: PersonModel, index: number) => (
            <PersonOnBoarding
              person={person}
              key={index}
              onPress={() => navigation.navigate('SignInScreen')}
            />
          ))}
        </View>
        <View style={styles.cardHeader}>
          <Label
            text={t('onBoardingScreen.toAllTasks')}
            textColor={COLORS.light}
            backgroundColor={COLORS.lightPurple}
            fontSize={14}
          />
          <Text style={styles.cardsHeaderText}>
            {t('onBoardingScreen.aroundMe')}
          </Text>
        </View>

        <View style={{flex: 1, marginBottom: 10}}>
          <FlatList
            data={allTask}
            contentContainerStyle={{marginBottom: 10}}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{marginBottom: 40}}
          />
        </View>

        {/* <Card
          card={{
            name: 'דנה',
            title: 'לויטל בלכ תאצוה', // couldnt translate this
            image: require('../../Assets/Images/person.png'),
            location: 'בלפור, תל אביב',
            birthDate: '5/12/21',
            price: '70',
            gender: 'מגדר: מעדיפ/ה לא לציין',
          }}
          onPress={() => navigation.navigate('SignInScreen')}
        />
        <Card
          card={{
            name: 'דנה',
            title: 'לויטל בלכ תאצוה', // couldnt translate this
            image: require('../../Assets/Images/person.png'),
            location: 'בלפור, תל אביב',
            birthDate: '5/12/21',
            price: '₪70',
            gender: 'מגדר: מעדיפ/ה לא לציין',
          }}
          onPress={() => navigation.navigate('SignInScreen')}
          cardStyle={{
            marginBottom: 50,
          }}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  imageText: {
    color: 'black',
    alignSelf: 'flex-end',
    fontSize: 12,
    marginTop: -13,
  },
  subHeader: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.light,
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
    paddingBottom: getWidthStr(10),
    alignItems: 'center',
  },
});
