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
  Dashboard: undefined;
  Profile: undefined;
  AdminConfig: undefined;
  Animal: undefined;
  EnclosureStack?: { screen: keyof PublicStackParamList };
  AuthStack?: { screen: keyof PublicStackParamList };
};

type EnclosureStackParamList = {
  EnclosureList: undefined;
  EnclosureDetail: { enclosureId: number };
  EnclosureEdit: { enclosure: Enclosure };
  EnclosureCreate: undefined;
  EnclosureStack?: { screen: keyof EnclosureStackParamList };
};
