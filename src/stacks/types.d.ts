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
  AuthStack?: { screen: keyof PublicStackParamList };
};
