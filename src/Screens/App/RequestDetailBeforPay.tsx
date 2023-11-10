import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { getWidthStr, getHeightStr } from '../../Helpers/widthHeightHelpers';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import PersonDetail from '../../Components/PersonDetail/PersonDetail';
import Button from '../../Components/Button/Button';
import { COLORS } from '../../Constants/colors';
import { ICONS } from '../../Constants/IconsList';
import RequestDeleteModal from '../../Components/RequestDeleteModal/RequestDeleteModal';
import { AppStackParamList } from '../../Constants/AppStackParamList';
import { useAppDispatch, useAppSelector } from '../../Redux/store/store';
import {
    getAppliedUserByTaskID,
    cancelHireRequest,
    hireRequest,
} from '../../Redux/actions/taskAction';
import { getProfileInfo } from '../../Redux/actions/otherActions';

import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import { API_BASE_URL } from '../../Constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

//   type Props = {
//     navigation: NativeStackNavigationProp<
//       AppStackParamList,
//       'RequestDetailScreen'
//     >;
//     route: RouteProp<AppStackParamList, 'RequestDetailScreen'>;
//   };

const RequestDetailBeforPay = ({ navigation, route }: Props) => {
    const { profileInfo, isFetchingTask, appliedTaskList, isLoading, error } = useAppSelector(state => state.global);

    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [loading, setloading] = useState(false);
    const para = route.params;

    // useEffect(() => {
    //     checkDummyFun()
    // }, []);

    // const checkDummyFun = () => {
    //     let url = "https://umego.payme.io/system/onboarding/62f37748f9803f003f59ff5a/630629741de790003fe818ae/step-three"
    //     let allUrl = url.split('/')
    //     console.log(allUrl[7], ".....");
    // }

    return (
        <>
            {loading && <Loading />}
            <SafeAreaView>
                <ScreenHeader
                    header={'על PAYME'}
                    showBackButton={true}
                    isHeaderBold={false}
                />

                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.cardContainer}>
                        <Image
                            style={{ transform: [{ scale: 1.1 }] }}
                            source={require('../../Assets/Images/paymeLogo.png')}
                        />
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 20 }}>
                            <View style={{ height: 12, width: 12, backgroundColor: COLORS.purpleLight, borderRadius: 90 }} />
                            <Text style={styles.detailText}>פתיחת חשבון אונליין ותחילת סליקה באופן מיידי</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <View style={{ height: 12, width: 12, backgroundColor: COLORS.purpleLight, borderRadius: 90 }} />
                            <Text style={styles.detailText}>ממשק אחוד לניהול הסליקה וכלל השירותים</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <View style={{ height: 12, width: 12, backgroundColor: COLORS.purpleLight, borderRadius: 90 }} />
                            <Text style={styles.detailText}>הרמה הגבוהה ביותר של אבטחת מידע בתעשייה </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <View style={{ height: 12, width: 12, backgroundColor: COLORS.purpleLight, borderRadius: 90 }} />
                            <Text style={styles.detailText}>אין צורך בחיבור לגורמים נוספים - ONE STOP SHOP</Text>
                        </View>

                        <Button
                            text={'הרשמה כלקוח פרטי'}
                            onPress={() => navigation.navigate('PaymentWebview', {
                                url: "https://umego.payme.io/system/onboarding/6282189391dc6d004bae27a6",
                                para: para
                            })}
                            color={COLORS.purpleLight}
                            variant="filled"
                            corners="curved"
                            buttonStyle={[styles.buttonStyle, { marginVertical: 10, marginTop: 30 }]}
                        />
                        <Button
                            text={'הרשמה כעוסק מורשה/פטור/חברה בעמ'}
                            onPress={() => navigation.navigate('PaymentWebview', {
                                url: "https://umego.payme.io/onboarding/6200e19ef664e0004ad2cc3c", // development
                                // url: "https://umego.payme.io/system/onboarding/62f37748f9803f003f59ff5a", //production
                                para: para
                            })}
                            color={COLORS.purpleLight}
                            variant="filled"
                            corners="curved"
                            buttonStyle={styles.buttonStyle}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default RequestDetailBeforPay;

const styles = StyleSheet.create({
    scroll: {
        height: getHeightStr(100),
        paddingBottom: getWidthStr(10),
        paddingHorizontal: 13,
        paddingTop: 20,
    },
    cardContainer: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: COLORS.white,
    },
    buttonMain: {
        paddingVertical: 5,
    },
    buttonStyle: {
        paddingVertical: 15,
    },
    rewardTextMain: {
        paddingVertical: 8,
        alignItems: 'center',
    },
    rewardText: {
        color: COLORS.error,
        fontWeight: '400',
        fontSize: 15,
        textAlign: 'center',
    },
    desMain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginBottom: 20,
    },
    textMain: {
        flex: 1,
        flexWrap: 'nowrap',
    },
    iconMain: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.purpleLight,
    },
    valuesText: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 10,
        color: COLORS.black,
        textAlign: 'left',
    },
    detailText: {
        color: '#323233',
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 10
        // textAlign: 'center',
    },
});