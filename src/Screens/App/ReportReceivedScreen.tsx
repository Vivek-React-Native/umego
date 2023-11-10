import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'ReportReceivedScreen'
  >;
  route: RouteProp<AppStackParamList, 'ReportReceivedScreen'>;
};

const ReportReceived = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const description = route?.params?.description;
  console.log({description});
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{t('reportReceivedScreen.title')}</Text>
        <Text style={styles.subTitle}>
          {description || t('reportReceivedScreen.description')}
        </Text>
        <Button
          onPress={() => {
            navigation.navigate('MyRequestMainScreen');
          }}
          text={t('reportReceivedScreen.approvalButtonText')}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          buttonStyle={styles.approveButtonStyle}
          size="large"
        />
        <Button
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          text={t('reportReceivedScreen.cancelButtonText')}
          color={COLORS.purpleLight}
          variant="outlined"
          corners="curved"
          buttonStyle={styles.cancelButtonStyle}
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

export default ReportReceived;

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
  title: {
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 39.6,
    color: COLORS.purpleLight,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 19.6,
    color: COLORS.text,
    textAlign: 'center',
    width: 260,
    paddingVertical: 10,
  },
  approveButtonStyle: {
    marginHorizontal: 15,
    //   minHeight: 40, minWidth: 304,
    marginVertical: 10,
    paddingVertical: 10,
  },
  approveButtonTextStyle: {fontSize: 14, fontWeight: '400', lineHeight: 16.8},
  cancelButtonStyle: {
    paddingVertical: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
