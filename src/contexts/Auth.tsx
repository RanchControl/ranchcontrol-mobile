import React, { createContext, useContext, useState, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { useApi } from './Api';

interface AuthContextValues {
  isLoading: boolean;
  userInfo?: IUserInfo;
  authorized: boolean;
  stopLoading: () => void;
  saveUserData: (userInfo: IUserInfo) => Promise<void>;
  deleteUserData: () => Promise<void>;
  saveTokens: (token: Tokens) => Promise<void>;
  deleteTokens: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>();

  const { cleanInterceptors, addInterceptors } = useApi();

  const saveUserData = useCallback(async (newUserInfo: IUserInfo) => {
    setUserInfo(newUserInfo);
  }, []);

  const deleteUserData = useCallback(async () => {
    setUserInfo(undefined);
  }, []);

  const deleteTokens = useCallback(async () => {
    await AsyncStorage.removeItem('tokens');
    cleanInterceptors();
  }, [cleanInterceptors]);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await deleteTokens();
    await deleteUserData();

    return navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  }, [deleteTokens, deleteUserData, navigation]);

  const saveTokens = useCallback(
    async (tokens: Tokens) => {
      await AsyncStorage.setItem('tokens', JSON.stringify(tokens));
      addInterceptors(tokens, handleLogout);
    },
    [addInterceptors, handleLogout]
  );

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo: userInfo,
        authorized: !!userInfo,
        stopLoading,
        saveUserData,
        deleteUserData,
        saveTokens,
        deleteTokens,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
