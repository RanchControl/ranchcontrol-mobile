type RootStackParamList = {
  SplashScreen: undefined;
  AuthStack: undefined;
  BottomTabStack: undefined;
};

type PublicStackParamList = {
  CheckUsername: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
  PrivateStack?: { screen: keyof PrivateStackParamList };
};

type PrivateStackParamList = {
  Home: undefined;
  Profile: undefined;
  AdminConfig: undefined;
  Animal: undefined;
  AuthStack?: { screen: keyof PublicStackParamList };
};
