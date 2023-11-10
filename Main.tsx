import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from './src/Redux/store/store';
import AppStack from './src/Stacks/AppStack';
import AuthStack from './src/Stacks/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authenticateUser} from './src/Redux/reducer/reducer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from './src/Constants/colors';

type Props = {};
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: '#000',
  },
  contentStyle: {
    backgroundColor: COLORS.background,
  },
};
const Main = (props: Props) => {
  const {isAuthenticated, token} = useAppSelector(state => state.global);
  // const [initialRoute, setInitialRoute] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    AsyncStorage.getItem('auth_token').then(auth_token => {
      // if (isAuthenticated) {
      //   setInitialRoute("AppStack");
      // } else {
      //   setInitialRoute("AuthStack");
      // }
      if (auth_token) dispatch(authenticateUser(auth_token));
    });
  }, []);

  return (
    <NavigationContainer>
      {/* {initialRoute !== "" && (
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={screenOptions}
        >
          <Stack.Screen name="AppStack" component={AppStack} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Navigator>
      )} */}
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Main;
