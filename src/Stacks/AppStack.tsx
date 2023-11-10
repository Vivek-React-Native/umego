import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/App/HomeScreen';
import MeetingScheduledScreen from '../Screens/App/MeetingScheduledScreen';
import AlreadyGottenJobScreen from '../Screens/App/AlreadyGottenJobScreen';
import ScheduleMeetingScreen from '../Screens/App/ScheduleMeetingScreen';
import React from 'react';
import UserReportReceivedScreen from '../Screens/App/UserReportReceivedScreen';
import UserReportScreen from '../Screens/App/UserReportScreen';
import RequestCreatedScreen from '../Screens/App/RequestCreatedScreen';
import ReportingAbsenceScreen from '../Screens/App/ReportingAbsenceScreen';
import ReportReceivedScreen from '../Screens/App/ReportReceivedScreen';
import PaymentForService from '../Screens/App/PaymentForServiceScreen';
import SPInterestedInYourRequestScreen from '../Screens/App/SPInterestedInYourRequestScreen';
import RequestsDeletionCompletedScreen from '../Screens/App/RequestsDeletionCompletedScreen';
import ChatScreen from '../Screens/App/ChatScreen';

import RateThankYouScreen from '../Screens/App/RateThankYouScreen';
import RateScreen from '../Screens/App/RateScreen';
import JobProposalNoResultScreen from '../Screens/App/JobProposalNoResultScreen';
import JobProposalMainScreen from '../Screens/App/JobProposalMainScreen';
import MyJobScheduleTaskSceen from '../Screens/App/MyJobScheduleTaskScreen';
import MyJobTaskScheduleMainScreen from '../Screens/App/MyJobTaskScheduleMainScreen';
import {COLORS} from '../Constants/colors';
import CreateRequestScreen from '../Screens/App/CreateRequestScreen';
import CancelTaskRequestScreen from '../Screens/App/CancelTaskRequestScreen';
import MyRequestMainScreen from '../Screens/App/MyRequestMainScreen';
import MyProfileScreen from '../Screens/App/MyProfileScreen';
import MyProfileEditScreen from '../Screens/App/MyProfileEditScreen';
import ChatOpenConversationScreen from '../Screens/App/ChatOpenConversationScreen';
import RequestDetailScreen from '../Screens/App/RequestDetailScreen';
import BankInfoScreen from '../Screens/Auth/BankInfoScreen';
import BankAccInfoScreen from '../Screens/App/BankAccInfoScreen';
import BankAccInfoEdit from '../Screens/App/BankAccInfoEdit';
import CreditCardScreen from '../Screens/App/CreditCardScreen';
import CreditCardInfoScreen from '../Screens/Auth/CreditCardInfoScreen';
import WelcomeScreen from '../Screens/App/WelcomeScreen';
import RequestDetailBeforPay from '../Screens/App/RequestDetailBeforPay';
import PaymentWebview from '../Screens/App/PaymentWebview';
const App = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: '#000',
  },
  contentStyle: {
    backgroundColor: COLORS.background,
  },
};
const AppStack = () => {
  return (
    <App.Navigator
      screenOptions={screenOptions}
      // initialRouteName="ReportingAbsenceScreen"
    >
      <App.Screen name="HomeScreen" component={HomeScreen} />
      <App.Screen
        name="ReportingAbsenceScreen"
        component={ReportingAbsenceScreen}
        // checked
      />
      <App.Screen
        name="ReportReceivedScreen"
        component={ReportReceivedScreen}
        // checked
      />
      <App.Screen
        name="PaymentForServiceScreen"
        component={PaymentForService}
        // checked
      />
      <App.Screen
        name="SPInterestedInYourRequestScreen"
        component={SPInterestedInYourRequestScreen}
        // checked
      />
      <App.Screen
        name="RequestsDeletionCompletedScreen"
        component={RequestsDeletionCompletedScreen}
        // checked
      />
      <App.Screen
        name="ChatScreen"
        component={ChatScreen}
        // checked
      />
      <App.Screen name="CreateRequestScreen" component={CreateRequestScreen} />
      <App.Screen
        name="UserReportScreen"
        component={UserReportScreen}
        // checked
      />
      <App.Screen
        name="RequestCreatedScreen"
        component={RequestCreatedScreen}
        // checked
      />
      <App.Screen
        name="RequestDetailScreen"
        component={RequestDetailScreen}
        // checked
      />
      <App.Screen
        name="RequestDetailBeforPay"
        component={RequestDetailBeforPay}
        // checked
      />
      <App.Screen
        name="PaymentWebview"
        component={PaymentWebview}
        // checked
      />
      <App.Screen
        name="UserReportReceivedScreen"
        component={UserReportReceivedScreen}
        // checked x 2
      />
      <App.Screen
        name="JobProposalNoResultScreen"
        component={JobProposalNoResultScreen}
        // checked & needs to be merged with JobProposalMainScreen
      />
      <App.Screen
        name="JobProposalMainScreen"
        component={JobProposalMainScreen}
        // checked , he didnt fix it
      />
      <App.Screen
        name="MyJobScheduleTaskSceen"
        component={MyJobScheduleTaskSceen}
        // checked , re-done by Sefa, need small refactoring
      />
      <App.Screen
        name="MyJobTaskScheduleMainScreen"
        component={MyJobTaskScheduleMainScreen}
        // checked , will be deleted, upper screen covers this
      />
      <App.Screen
        name="RateThankYouScreen"
        component={RateThankYouScreen}
        // checked , re-done by sefa
      />
      <App.Screen
        name="RateScreen"
        component={RateScreen}
        // checked , re-done by sefa & still need some updates
      />
      <App.Screen
        name="MeetingScheduledScreen"
        component={MeetingScheduledScreen}
        // checked ,
      />
      <App.Screen
        name="AlreadyGottenJobScreen"
        component={AlreadyGottenJobScreen}
        // checked ,
      />
      <App.Screen
        name="ScheduleMeetingScreen"
        component={ScheduleMeetingScreen}
        // checked , zeeshan needs to fix
      />

      <App.Screen
        name="BankInfoScreen"
        component={BankInfoScreen}
        // should be deleted, just for accessing screen was put in app stack
      />
      <App.Screen
        name="CreditCardInfoScreen"
        component={CreditCardInfoScreen}
        // should be deleted, just for accessing screen was put in app stack
      />

      <App.Screen name="BankAccInfoScreen" component={BankAccInfoScreen} />

      <App.Screen name="BankAccInfoEdit" component={BankAccInfoEdit} />

      <App.Screen name="CreditCardScreen" component={CreditCardScreen} />
      <App.Screen name="WelcomeScreen" component={WelcomeScreen} />

      <App.Screen name="MyRequestMainScreen" component={MyRequestMainScreen} />
      <App.Screen
        name="CancelTaskRequestScreen"
        component={CancelTaskRequestScreen}
      />
      <App.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <App.Screen name="MyProfileEditScreen" component={MyProfileEditScreen} />
      <App.Screen
        name="ChatOpenConversationScreen"
        component={ChatOpenConversationScreen}
      />
    </App.Navigator>
  );
};

export default AppStack;
