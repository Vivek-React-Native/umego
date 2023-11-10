import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './Assets/Translations/en.json';
import he from './Assets/Translations/he.json';
import { NativeModules, Platform } from 'react-native';

// iOS:
const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    he: {
      translation: he,
    },
  },
  lng: locale.includes('en') ? 'he' : 'en', // Get the first device language
  fallbackLng: 'en',
  compatibilityJSON: 'v3', // By default React Native projects does not support Intl
});

export default i18n;
