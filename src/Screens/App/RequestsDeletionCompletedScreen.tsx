import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {COLORS} from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import { useTranslation } from 'react-i18next';
type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'RequestsDeletionCompletedScreen'
  >;
  route: RouteProp<AppStackParamList, 'RequestsDeletionCompletedScreen'>;
};

const RequestsDeletionCompletedScreen = ({ navigation, route }: Props) => {
// const RequestsDeletionCompletedScreen = () => {
    const { t } = useTranslation();    
    return (
        <SafeAreaView style={{ flex: 1 }} >

            <View style={styles.mainContainer}>
                <Text style={styles.title} >הבקשה נמחקה בהצלחה!</Text>
                <Button
                    onPress={() => { 
                        navigation.navigate('JobProposalMainScreen')
                    }}
                    text={t('reportReceivedScreen.approvalButtonText')}
                    color={COLORS.purpleLight}
                    variant="filled"
                    corners="curved"
                    buttonStyle={styles.approveButtonStyle}
                    size="xlarge"
                />
                <Button
                    onPress={() => { 
                        navigation.navigate('HomeScreen')
                    }}
                    text={t('reportReceivedScreen.cancelButtonText')}
                    color={COLORS.purpleLight}
                    variant="outlined"
                    corners="curved"
                    buttonStyle={styles.cancelButtonStyle}
                    size="xlarge"
                />
                
            </View>
        </SafeAreaView>
    );
};

export default RequestsDeletionCompletedScreen;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 39.6,
    color: COLORS.purpleLight,
    textAlign: 'center',
    width: '90%',
  },
  approveButtonStyle: {
    marginHorizontal: 15,
    //   minHeight: 40, minWidth: 304,
    marginVertical: 10,
  },
  cancelButtonStyle: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
