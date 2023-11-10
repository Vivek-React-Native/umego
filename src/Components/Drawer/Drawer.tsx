import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
  I18nManager,
} from 'react-native';
import {getHeight, getHeightStr} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';
import MenuItem from './MenuItem';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../Constants/RootStackParamList';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logout} from '../../Redux/reducer/reducer';
import {getProfileInfo} from '../../Redux/actions/otherActions';
import i18n from '../../i18n';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  style?: StyleProp<ViewStyle>;
};
const dimensions = Dimensions;
const width = dimensions.get('screen').width;

const Drawer: React.FC<Props> = React.memo(({style}: Props) => {
  const [lang, setLang] = useState('');
  const [currentLang, setCurrentLang] = useState('');
  const {t} = useTranslation();
  const menuFromRight = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const {isAuthenticated, profileInfo} = useAppSelector(state => state.global);
  const navigation = useNavigation<RootStackParamList>();
  const handleMenuOpen = useCallback(() => {
    Animated.timing(menuFromRight, {
      useNativeDriver: true,
      toValue: -width,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
    }).start();
  }, []);
  const handleMenuOpenLeft = useCallback(() => {
    Animated.timing(menuFromRight, {
      useNativeDriver: true,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
    }).start();
  }, []);
  const handleMenuClose = useCallback(async () => {
    Animated.timing(menuFromRight, {
      useNativeDriver: true,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
    }).start();
  }, []);

  // Left side

  // const handleMenuOpenLeft = useCallback(() => {
  //   Animated.timing(menuFromRight, {
  //     useNativeDriver: true,
  //     toValue: width,
  //     easing: Easing.inOut(Easing.ease),
  //     duration: 300,
  //   }).start();
  // }, []);

  // const handleMenuCloseLeft = useCallback(async () => {
  //   Animated.timing(menuFromRight, {
  //     useNativeDriver: true,
  //     toValue: 0,
  //     easing: Easing.inOut(Easing.ease),
  //     duration: 300,
  //   }).start();
  // }, []);

  useEffect(() => {
    if (!profileInfo && isAuthenticated) dispatch(getProfileInfo());
  }, []);

  useEffect(() => {
    direction();
    getLanguage();
  }, []);

  const getLanguage = async () => {
    const lng = await AsyncStorage.getItem('lng');
    setCurrentLang(lng);
  };

  const direction = async () => {
    const lng = await AsyncStorage.getItem('lng');
    setLang(lng);
  };

  const handleChatButton = async () => {
    await handleMenuClose();
    isAuthenticated
      ? navigation.navigate('ChatScreen')
      : navigation.navigate('SignInScreen');
  };
  const handleMyTasksButton = async () => {
    await handleMenuClose();
    isAuthenticated
      ? navigation.navigate('MyJobTaskScheduleMainScreen')
      : navigation.navigate('SignInScreen');
  };
  const handleMyRequestsButton = async () => {
    await handleMenuClose();
    isAuthenticated
      ? navigation.navigate('MyRequestMainScreen')
      : navigation.navigate('SignInScreen');
  };
  const handleAroundMeButton = async () => {
    await handleMenuClose();
    isAuthenticated
      ? navigation.navigate('JobProposalMainScreen')
      : navigation.navigate('SignInScreen');
  };

  const handleHomeButton = async () => {
    await handleMenuClose();
    navigation.navigate('HomeScreen');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const changeLanguage = async lng => {
    i18n.changeLanguage(lng);
    await AsyncStorage.setItem('lng', lng);
    if (lng == 'en') {
      I18nManager.forceRTL(false);
    }
    if (lng != 'en' || lng == null) {
      I18nManager.forceRTL(true);
    }
    RNRestart.Restart();
  };

  return (
    <>
      <TouchableOpacity
        onPress={lang == 'en' ? handleMenuOpenLeft : handleMenuOpen}
        style={[styles.openButton, style]}>
        <Image
          style={{transform: [{scale: 0.8}]}}
          source={require('../../Assets/Images/Menu.png')}
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.drawerMenu,
          lang == 'en' ? {left: -width} : {right: width},
          {
            transform: [{translateX: menuFromRight}],
          },
        ]}>
        <View style={styles.menu}>
          <View style={styles.menuHeader}>
            <TouchableOpacity
              onPress={handleMenuClose}
              style={styles.closeButton}>
              <Image source={require('../../Assets/Images/CloseX.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarImage}
              onPress={async () => {
                await handleMenuClose();
                isAuthenticated && navigation.navigate('MyProfileScreen');
              }}>
              {isAuthenticated && profileInfo?.image?.media_file_url ? (
                <Image
                  source={{uri: profileInfo?.image?.media_file_url}}
                  style={styles.personImageStyle}
                />
              ) : (
                <Image
                  source={require('../../Assets/Images/profileImage.png')}
                  style={{
                    height: 80,
                    width: 100,
                    resizeMode: 'cover',
                  }}
                />
              )}
            </TouchableOpacity>
            {isAuthenticated ? (
              <Text style={styles.email}>
                {profileInfo?.first_name + ' ' + profileInfo?.last_name}
              </Text>
            ) : (
              <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('SignInScreen')}>
                {t('signInScreen.login')}
              </Text>
            )}
          </View>

          {isAuthenticated && (
            <MenuItem text={t('home')} onPress={handleHomeButton} />
          )}
          <MenuItem text={t('drawer.myTasks')} onPress={handleMyTasksButton} />
          <MenuItem
            text={t('drawer.myRequests')}
            onPress={handleMyRequestsButton}
          />
          <MenuItem
            text={t('drawer.aroundMe')}
            onPress={handleAroundMeButton}
          />
          <MenuItem text={t('drawer.chat')} onPress={handleChatButton} />

          {currentLang == 'he' && (
            <MenuItem
              // text={t('drawer.english')}
              text={'English'}
              onPress={() => changeLanguage('en')}
            />
          )}
          {currentLang == 'en' && (
            <MenuItem
              // text={t('drawer.english')}
              text={'עברית'}
              onPress={() => changeLanguage('he')}
            />
          )}
          {isAuthenticated && (
            <TouchableOpacity
              style={[
                styles.logout,
                {flexDirection: 'row', alignItems: 'center'},
              ]}
              onPress={handleLogout}>
              <Text style={{marginHorizontal: 5}}>{t('logout')}</Text>
              <Ionicons name="exit-outline" size={25} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  drawerMenu: {
    position: 'absolute',
    // left: -width,
    // right: -width,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: -2,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    width: '100%',
    height: '105%',
    alignItems: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    left: 10,
    top: getHeightStr(70),
  },
  menu: {
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    width: '70%',
    elevation: 15,
    height: '100%',
  },
  menuHeader: {
    backgroundColor: COLORS.lightPurple,
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: '25%',
  },
  sidebarImage: {
    transform: [{scale: 1.2}],
  },
  menuItem: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
  },
  menuText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: 'Assistant-Medium',
  },
  openButton: {
    left: 25,
    top: 30,
    zIndex: 10,
  },
  logout: {
    position: 'absolute',
    left: '7%',
    bottom: '10%',
  },
  personImageStyle: {
    height: 70,
    resizeMode: 'cover',
    borderRadius: 10,
    aspectRatio: 1,
  },
  email: {
    position: 'absolute',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: COLORS.purpleMekabel,
    bottom: '50%',
    fontFamily: 'Assistant-Medium',
  },
  loginText: {
    position: 'absolute',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: COLORS.purpleMekabel,
    bottom: '50%',
    fontFamily: 'Assistant-Medium',
  },
});
