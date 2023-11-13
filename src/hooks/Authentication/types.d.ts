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
  fullName: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
  updateAt: string;
  deletedAt: null;
}

interface UserEditFormValues {
  name: string;
  phone: string;
  birthdate: string;
  username: string;
}

interface IAdminConfig {
  farm: Farm;
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
  token: ITokens;
  user: IUserInfo;
}

interface RefreshTokenResponse {
  token: Omit<ITokens, 'refresh'>;
  user: IUserInfo;
}

interface SignUpFormValues {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: string;
}
