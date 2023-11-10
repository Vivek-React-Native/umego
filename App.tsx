import React, { useEffect, useState } from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Main from './Main';
import store from './src/Redux/store/store';
import './src/i18n';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './src/i18n';
import RNRestart from 'react-native-restart';

const App = () => {

  const [lang, setLang] = useState('');

  useEffect(() => {
    direction()
    SplashScreen.hide();
  }, []);

  const direction = async () => {
    const lng = await AsyncStorage.getItem("lng");
    if (lng == null) {
      i18n.changeLanguage('he');
    } else {
      i18n.changeLanguage(lng);
    }
    setLang(lng)
    if (lng == 'en' || lng == null) {
      I18nManager.forceRTL(false);
    }
    if (lng != 'en') {
      I18nManager.forceRTL(true);
    }
    if (lng == null) {
      await AsyncStorage.setItem("lng", 'he');
      RNRestart.Restart();
    }
  }

  return (
    <View style={[styles.appContainer, { direction: lang == 'en' ? 'ltr' :'rtl' }]}>
      <Provider store={store}>
        <Main />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
