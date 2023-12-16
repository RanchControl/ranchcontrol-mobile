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
  AnimalStack: undefined;
  EnclosureStack?: { screen: keyof EnclosureStackParamList };
  BatchStack?: { screen: keyof BatchStackParamList };
  AuthStack?: { screen: keyof PublicStackParamList };
};

type EnclosureStackParamList = {
  EnclosureList: undefined;
  EnclosureDetail: { enclosureId: number };
  EnclosureEdit: { enclosure: Enclosure };
  EnclosureCreate: undefined;
  EnclosureStack?: { screen: keyof EnclosureStackParamList };
};

type BatchStackParamList = {
  BatchList: undefined;
  BatchDetail: { batchId: number };
  BatchEdit: { batch: Batch };
  BatchCreate: undefined;
  BatchStack?: { screen: keyof BatchStackParamList };
};

type AnimalStackParamList = {
  AnimalList: undefined;
  AnimalDetail: { animalId: number };
  AnimalEdit: { animal: Animal };
  AnimalCreate: undefined;
  AnimalStack?: { screen: keyof AnimalStackParamList };
};
