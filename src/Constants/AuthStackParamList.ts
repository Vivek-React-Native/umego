export type AuthStackParamList = {
  OnBoardingScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  CodeVerificationScreen: {
    shouldNavigateTo?: keyof AuthStackParamList;
    phone_no?: string | undefined;
    country_code?: string | undefined;
  };
  BankInfoScreen: undefined;
  CreditCardInfoScreen: undefined;
  WelcomeScreen: undefined;
};
