import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
    'UserReportReceivedScreen'
  >;
  route: RouteProp<AppStackParamList, 'UserReportReceivedScreen'>;
};

const UserReportReceivedScreen = ({ navigation, route }: Props) => {
    
    const {t} = useTranslation();
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.subHeader}>
                    {t('reportReceivedScreen.reportRecevied')}
                </Text>

                <Text style={styles.boxText}>
                    {t('reportReceivedScreen.factorOnBehalf')}
                </Text>

                <View style={styles.button}>
                    <Button
                        size='xlarge'
                        text={t('reportReceivedScreen.homePage')}
                        onPress={() => { 
                            navigation.navigate('HomeScreen');
                        }}
                        color={COLORS.purpleLight}
                        variant="filled"
                        corners="curved"
                    />
                </View>
            </View>

        </SafeAreaView>
    );
};

export default UserReportReceivedScreen;

const styles = StyleSheet.create({
  container: {},
  subHeader: {
    fontSize: 36,
    fontWeight: '600',
    color: '#8D7BAF',
    marginTop: 158,
    lineHeight: 39,
    textAlign: 'center',
  },
  box: {
    shadowColor: 'rgba(0,0,0,0.15)',
    borderRadius: 10,
    height: 259,
    width: 328,
    marginLeft: 15,
  },
  boxText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#323233',
    textAlign: 'center',
    marginTop: 4,
  },
  button: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 20,
  },
});
