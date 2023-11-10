import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import ReportingCard from '../../Components/ReportingCard/ReportingCard';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import Loading from '../../Components/Loading/Loading';
import {reportTask} from '../../Redux/actions/taskAction';
import axios from 'axios';
import {API_BASE_URL} from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'ReportingAbsenceScreen'
  >;
  route: RouteProp<AppStackParamList, 'ReportingAbsenceScreen'>;
};

const ReportingAbsenceScreen = ({navigation, route}: Props) => {
  const RouteItem = route?.params?.RouteItem;
  console.log('RouteItem -> ', JSON.stringify(RouteItem, null, 2));

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {isLoading, message, error, success} = useAppSelector(
    state => state.global,
  );
  const handleReporting = async (dataToBeSend: any) => {
    await dispatch(
      reportTask({
        description: dataToBeSend.description,
        reason: dataToBeSend.reason,
        task: 11,
      }),
    );
    if (success) {
      navigation.navigate('ReportReceivedScreen', {
        description: t('reportReceivedScreen.malfunction'),
      });
    }
  };

  return (
    <>
      {loading && <Loading />}
      <SafeAreaView style={{flex: 1}}>
        <ScreenHeader
          header={t('reportingAbsenceScreen.header')}
          showBackButton
        />
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.scroll}>
            <ReportingCard
              card={{
                name: RouteItem?.created_by?.first_name,
                title: RouteItem?.title, // couldnt translate this
                image: RouteItem?.created_by?.image?.media_file_url,
                location: RouteItem?.address,
                birthDate: '5/12/21',
                price: '₪' + RouteItem?.price,
                gender: RouteItem?.created_by?.gender,
                problem: 'מה קרה?',
                statement: 'הערות',
              }}
              onReportingCardPress={data => handleReporting(data)}
              // onReportingCardPress={(data) => navigation.navigate('ReportReceivedScreen')}
              // onReportingCardPress={(data) => console.log(data, "MMMMmmmmmmmMMMM")}
              handleCancelation={navigation.goBack}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ReportingAbsenceScreen;

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
    paddingBottom: getWidthStr(10),
  },
});
