export type AppStackParamList = {
  HomeScreen: undefined;
  ReportingAbsenceScreen: {
    task: any;
  };
  ReportReceivedScreen: {
    description?: string;
  };
  PaymentForServiceScreen: undefined;
  SPInterestedInYourRequestScreen: {
    taskId: number;
    card: any;
  };
  RequestsDeletionCompletedScreen: undefined;
  ChatScreen: undefined;
  OpenConversationScreen: undefined;
  RateThankYouScreen: undefined;
  RateScreen: undefined;
  RequestCreatedScreen: undefined;
  RequestDetailScreen: {
    taskID: Number;
    task: object;
  };
  UserReportScreen: {
    user_id: number;
  };
  UserReportReceivedScreen: undefined;
  MeetingScheduledScreen: undefined;
  AlreadyGottenJobScreen: undefined;
  ScheduleMeetingScreen: {
    task: object;
  };
  CancelTaskRequestScreen: undefined;
  JobProposalNoResultScreen: undefined;
  JobProposalMainScreen: {
    categoryFilter?: any;
  };
  MyJobScheduleTaskSceen: undefined;
  MyJobTaskScheduleMainScreen: undefined;
  CreateRequestScreen: undefined;
  MyRequestMainScreen: undefined;
  MyProfileScreen: undefined;
  MyProfileEditScreen: undefined;
  ChatOpenConversationScreen: {
    talkingWith: any;
  };
  BankInfoScreen: undefined;
  BankAccInfoScreen: undefined;
  BankAccInfoEdit: undefined;
  CreditCardScreen: undefined;
  WelcomeScreen: undefined;
};
