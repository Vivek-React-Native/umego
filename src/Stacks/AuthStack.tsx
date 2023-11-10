import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreen from '../Screens/Auth/OnBoardingScreen';
import React from 'react';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import SignInScreen from '../Screens/Auth/SignInScreen';
import CodeVerificationScreen from '../Screens/Auth/CodeVerificationScreen';
import BankInfoScreen from '../Screens/Auth/BankInfoScreen';
import CreditCardInfoScreen from '../Screens/Auth/CreditCardInfoScreen';
import {COLORS} from '../Constants/colors';
import WelcomeScreen from '../Screens/Auth/WelcomeScreen';

const Auth = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: '#000',
  },
  contentStyle: {
    backgroundColor: COLORS.background,
  },
};

const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={screenOptions}>
      <Auth.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Auth.Screen name="SignUpScreen" component={SignUpScreen} />
      <Auth.Screen name="SignInScreen" component={SignInScreen} />
      <Auth.Screen
        name="CodeVerificationScreen"
        component={CodeVerificationScreen}
      />
      <Auth.Screen name="BankInfoScreen" component={BankInfoScreen} />
      <Auth.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Auth.Screen
        name="CreditCardInfoScreen"
        component={CreditCardInfoScreen}
      />
    </Auth.Navigator>
  );
};

export default AuthStack;
