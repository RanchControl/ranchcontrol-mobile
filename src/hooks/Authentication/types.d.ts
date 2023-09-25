interface ImageAsset {
  pk: number;
  image_high_url: string;
  image_medium_url: string;
  image_low_url: string;
  height: number;
  width: number;
  larger_side: number;
}

interface IPhone {
  country_code: string;
  area_code: string;
  number: string;
}

interface IUserInfo {
  id: number;
  username: string;
  name: string;
  email: string;
  cpf: string;
  cnpj: string;
  phone: IPhone;
  avatar: ImageAsset;
  birthdate: string;
  status: EStatus;
  organization: number;
  email_verified: boolean;
  rejection_reason: string;
  registration_self: ImageAsset;
  role: EUserType;
  digital_id: [{ id: number; owner: number; file_url: string }];
}

interface UserEditFormValues {
  name: string;
  phone: string;
  birthdate: string;
  username: string;
}

type UserEditRequest = ModifyType<
  UserEditFormValues,
  {
    phone: IPhone | null;
  }
>;

interface UpdatePasswordFormValues {
  password: string;
  confirm_password: string;
}

interface LoginResponse {
  tokens: ITokens;
  user: IUserInfo;
}

interface RefreshTokenResponse {
  tokens: Omit<ITokens, 'refresh'>;
  user: IUserInfo;
}

interface RegisterBasicInfoFormValues {
  name: string;
  phone: string;
  birthdate: string;
  email: string;
  confirmationData: boolean;
  username?: string;
}

interface SignUpFormValues extends RegisterBasicInfoFormValues {
  username: string;
  password: string;
  confirm_password: string;
}
