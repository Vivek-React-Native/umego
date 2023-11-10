import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import PaymentForServiceCard from '../../Components/PaymentForServiceCard/PaymentForServiceCard';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_BASE_URL} from '../../Constants/api';
import {useAppSelector} from '../../Redux/store/store';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'PaymentForServiceScreen'
  >;
  route: RouteProp<AppStackParamList, 'PaymentForServiceScreen'>;
};

const PaymentForServiceScreen = ({navigation, route}: Props) => {
  const RouteItem = route?.params?.RouteItem;
  const {t} = useTranslation();
  const {profileInfo} = useAppSelector(state => state.global);
  const [IsDisable, setIsDisable] = useState(RouteItem?.is_paid || false);
  // console.log('profileInfo -> ', JSON.stringify(profileInfo, null, 2));
  console.log('RouteItem -> ', JSON.stringify(RouteItem?.is_paid, null, 2));

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
    } catch (e) {
      console.log('Error -> ', JSON.stringify(e, null, 2));
    }
  };

  const onPaymentPress = async Amount => {
    setIsDisable(true);
    console.log(
      'data -> ',
      JSON.stringify(
        {
          user: profileInfo?.id,
          task: RouteItem?.id,
          tip: Amount,
        },
        null,
        2,
      ),
    );
    try {
      const UserToken = await AsyncStorage.getItem('auth_token');
      const response = await axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
        data: {
          user: profileInfo?.id,
          task: RouteItem?.id,
          tip: Amount,
        },
        url: API_BASE_URL + '/task/send-payment/',
      });
      console.log(
        'Payment response -> ',
        JSON.stringify(response.data, null, 2),
      );
      if (response?.data?.code === 200) {
        navigation.navigate('RequestCreatedScreen');
      }
    } catch (e) {
      setIsDisable(false);
      alert('Please try again.');
      console.log('Error from payment -> ', JSON.stringify(e, null, 2));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenHeader
        header={t('paymentForServiceScreen.header')}
        showBackButton
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <PaymentForServiceCard
          card={{
            name: RouteItem?.created_by?.first_name,
            title: RouteItem?.title, // couldnt translate this
            image: RouteItem?.created_by?.image?.media_file_url,
            location: RouteItem?.address,
            birthDate: '5/12/21',
            price: '₪' + RouteItem?.price,
            gender: 'הוצאת כלב לטיול',
            problem: 'טיפ',
          }} //this obj will be populated with api so no translation needed currently i guess
          isDisable={IsDisable}
          onPaymentPress={onPaymentPress}
        />
        <Text style={styles.bottomText}>
          {t('paymentForServiceScreen.description')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentForServiceScreen;

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
  bottomText: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 13.2,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: 'left',
  },
});
