import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../Constants/AppStackParamList';
import { RouteProp } from '@react-navigation/native';
import { COLORS } from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import Header from '../../Components/ScreenHeader/ScreenHeader';
import Input from '../../Components/Input/Input';
import { useTranslation } from 'react-i18next';
import { getWidth } from '../../Helpers/widthHeightHelpers';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import { reportUser } from '../../Redux/actions/userActions'
import { getProfileInfo } from '../../Redux/actions/otherActions'


type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'UserReportScreen'>;
  route: RouteProp<AppStackParamList, 'UserReportScreen'>;
};
const UserReportScreen = ({ navigation, route }: Props) => {

  // const UserReportScreen = () => {
  const {
    error,
  } = useAppSelector(state => state.global);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [resone, setResone] = React.useState<string>('')
  const [send, setSend] = React.useState<boolean>(false)
  const [hasError, setHasError] = React.useState(false);
  const para = route.params

  const handle = () => {
    if (!para) {
      navigation.navigate('HomeScreen');
    }
    setSend(true)
    let data = {
      user: para,
      reason: resone
    }
    dispatch(reportUser(data))
    if (!error) {
      navigation.navigate('UserReportReceivedScreen');
    }
    else {
      setHasError(true)
    }
    setSend(false)
  }

  return (
    <SafeAreaView>
      <Header
        header={t("userReport.header")}
        showBackButton={true}
        isHeaderBold={true}
      />
      <View style={styles.container}>

        <View style={[styles.box, { marginTop: 70 }]}>
          <Text style={styles.boxText}>{t('userReport.boxTitle')}</Text>


          {/* custom input  */}
          <TextInput
            multiline
            style={[styles.boxDown, { borderColor: hasError ? COLORS.error : '#F0F0F0' }]}
            onChangeText={(value) => {
              setResone(value)
            }}
            value={resone}
            autoCorrect={false}
            autoComplete={"off"}
          />

          {hasError && (
            <Text style={styles.error}>{t('allfieldsrequired')}</Text>
          )}

          <View style={styles.button}>
            <Button
              size="xlarge"
              buttonStyle={{ height: 47, width: 300 }}
              text={t('userReport.button')}
              disabled={send}
              onPress={() => {
                handle()
              }}
              color={COLORS.purpleLight}
              variant="filled"
              corners="curved"
            />

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserReportScreen;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  subHeader: {
    marginTop: 51,
    textAlign: 'center',
    fontSize: getWidth(18),
    fontWeight: '700',
    color: COLORS.light,
    fontFamily: 'Assistant',
    fontStyle: 'normal',
  },
  header: {
    marginTop: 51,
  },
  forwardIcon: {
    marginTop: -18,
    marginLeft: 15,
  },
  box: {
    backgroundColor: COLORS.white,
    shadowColor: 'rgba(0, 0, 0, 0.30)',
    borderRadius: 10,
    height: 290,
    width: '100%',
    borderWidth: 1,
    marginTop: 21,
    borderColor: COLORS.disable,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  boxText: {
    fontSize: getWidth(12),
    padding: 5,
    fontWeight: '400',
    color: COLORS.text,
    marginLeft: 14,
    marginTop: 18,
    textAlign: 'left',
  },
  boxDown: {
    marginTop: 10,
    borderWidth: 1,
    width: "90%",
    height: 120,
    marginLeft: 14,
    borderRadius: 5,
    padding: 5
  },
  error: {
    color: COLORS.error,
    fontSize: getWidth(12),
    marginTop: 10,
    marginLeft: 14,

  },
  button: {
    borderRadius: 8,
    marginLeft: 15,
    marginTop: 26,
    height: 47,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
