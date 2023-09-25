import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';

import { useAuth } from '../../contexts/Auth';
import { useAuthentication } from '../../hooks';
import { Container, LoadingLottie } from './styles';

export const SplashScreen: React.FC = () => {
  const { refreshToken } = useAuthentication();
  const {
    saveUserData,
    deleteUserData,
    saveTokens,
    deleteTokens,
    stopLoading,
  } = useAuth();

  const requestRefreshToken = useMutation(
    ({ token }: { token: string }) => refreshToken(token),
    {
      onSuccess: async (data, context) => {
        await saveTokens({
          refresh_token: context.token,
          access_token: data.token.access,
        });
        await saveUserData(data.user);
      },
      onError: async () => {
        await deleteUserData();
        await deleteTokens();
      },
      onSettled: () => {
        stopLoading();
      },
    }
  );

  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    const parsedTokens: Tokens = JSON.parse(token || '{}');

    await requestRefreshToken.mutateAsync({
      token: parsedTokens.refresh_token,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <LoadingLottie
        source={require('../../assets/animations/loading.json')}
        autoPlay
        loop
      />
    </Container>
  );
};
