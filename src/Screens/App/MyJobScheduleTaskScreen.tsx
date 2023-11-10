import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {getHeightStr, getWidthStr} from '../../Helpers/widthHeightHelpers';
import Drawer from '../../Components/Drawer/Drawer';
import Card from '../../Components/Card/Card';
import {useTranslation} from 'react-i18next';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {COLORS} from '../../Constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'MyJobScheduleTaskSceen'
  >;
  route: RouteProp<AppStackParamList, 'MyJobScheduleTaskSceen'>;
};

const MyJobScheduleTaskSceen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState<'todos' | 'coordinate'>('todos');
  const todosData = [];
  //   TODO
  //   IT IS NOT SCROLLING AT THE MOMENT, NEEDS REFACTORING WHILE DOING
  //   API INTEGRATION
  const coordinateData = [
    {
      name: 'דנה',
      title: 'לויטל בלכ תאצוה', // couldnt translate this
      image: require('../../Assets/Images/person.png'),
      location: 'בלפור, תל אביב',
      birthDate: '5/12/21',
      price: '₪70',
      gender: 'מגדר: מעדיפ/ה לא לציין',
    },
    {
      name: 'דנה',
      title: 'לויטל בלכ תאצוה', // couldnt translate this
      image: require('../../Assets/Images/person.png'),
      location: 'בלפור, תל אביב',
      birthDate: '5/12/21',
      price: '₪70',
      gender: 'מגדר: מעדיפ/ה לא לציין',
    },
    {
      name: 'דנה',
      title: 'לויטל בלכ תאצוה', // couldnt translate this
      image: require('../../Assets/Images/person.png'),
      location: 'בלפור, תל אביב',
      birthDate: '5/12/21',
      price: '₪70',
      gender: 'מגדר: מעדיפ/ה לא לציין',
    },
    {
      name: 'דנה',
      title: 'לויטל בלכ תאצוה', // couldnt translate this
      image: require('../../Assets/Images/person.png'),
      location: 'בלפור, תל אביב',
      birthDate: '5/12/21',
      price: '₪70',
      gender: 'מגדר: מעדיפ/ה לא לציין',
    },
    {
      name: 'דנה',
      title: 'לויטל בלכ תאצוה', // couldnt translate this
      image: require('../../Assets/Images/person.png'),
      location: 'בלפור, תל אביב',
      birthDate: '5/12/21',
      price: '₪70',
      gender: 'מגדר: מעדיפ/ה לא לציין',
    },
  ];
  const noData = useMemo(
    () => (
      <View style={styles.noDataImage}>
        <Text style={styles.noDataText}>{t('noTaskToShow')}</Text>
        <Image source={require('../../Assets/Images/human.png')} />
      </View>
    ),
    [],
  );
  return (
    <>
      <Drawer />
      <SafeAreaView style={styles.container}>
        <ScreenHeader header={t('myTasks')} />
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setSelected('todos')}
            style={[
              styles.tab,
              {borderBottomWidth: selected === 'todos' ? 3 : 0},
            ]}>
            <Text
              style={{
                fontWeight: selected === 'todos' ? 'bold' : 'normal',
                color: selected === 'todos' ? COLORS.purpleLight : COLORS.text,
                fontFamily: 'Assistant-Medium',
              }}>
              {t('toDos')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected('coordinate')}
            style={[
              styles.tab,
              {borderBottomWidth: selected === 'coordinate' ? 3 : 0},
            ]}>
            <Text
              style={{
                fontWeight: selected === 'coordinate' ? 'bold' : 'normal',
                color:
                  selected === 'coordinate' ? COLORS.purpleLight : COLORS.text,
              }}>
              {t('tasksToCoordinate')}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollview}>
          {selected === 'todos' ? (
            todosData.length < 1 ? (
              noData
            ) : (
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
              />
            )
          ) : coordinateData.length < 1 ? (
            noData
          ) : (
            coordinateData.map((item, index) => (
              <Card key={index} card={item} cardStyle={styles.card} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MyJobScheduleTaskSceen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  tabs: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  tab: {
    width: '45%',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: COLORS.purpleLight,
  },
  noDataImage: {
    alignSelf: 'center',
    marginTop: getHeightStr(85),
  },
  noDataText: {
    alignSelf: 'center',
    bottom: 50,
    color: COLORS.text,
  },
  scrollview: {
    height: '100%',
  },
  card: {
    marginTop: 20,
    height: getWidthStr(30),
  },
});
