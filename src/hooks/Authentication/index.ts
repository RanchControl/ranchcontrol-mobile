import { useCallback } from 'react';

import { endpoints, useApi } from '../../contexts/Api';

export const useAuthentication = () => {
  const { request } = useApi();

  const performLogin = useCallback(
    async (email: string, password: string) => {
      const data = {
        email,
        password,
      };

      const response = await request<LoginResponse>({
        method: 'post',
        url: endpoints.auth.login,
        data,
      });

      return response.data;
    },
    [request]
  );

  const getProfile = useCallback(async () => {
    const response = await request<IUserInfo>({
      method: 'get',
      url: endpoints.auth.profile,
    });

    return response.data;
  }, [request]);

  const requestChangePassword = useCallback(
    async (email: string) => {
      const response = await request({
        method: 'post',
        url: endpoints.auth.forgotPassword,
        data: { email },
      });

      return response.data;
    },
    [request]
  );

  const refreshToken = useCallback(
    async (token: string) => {
      const response = await request<RefreshTokenResponse>({
        method: 'post',
        url: endpoints.auth.refreshToken,
        data: {
          refresh: token,
        },
      });

      return response.data;
    },
    [request]
  );

  const updatePassword = useCallback(
    async (password: string, confirm_password: string) => {
      const response = await request<IUserInfo>({
        method: 'post',
        url: endpoints.auth.updatePassword,
        data: {
          password,
          confirm_password,
        },
      });

      return response.data;
    },
    [request]
  );

  const updateEmail = useCallback(
    async (email: string, password: string) => {
      const response = await request<IUserInfo>({
        method: 'post',
        url: endpoints.auth.updateEmail,
        data: {
          email,
          password,
        },
      });

      return response.data;
    },
    [request]
  );

  const resendConfirmationEmail = useCallback(async () => {
    const response = await request<IUserInfo>({
      method: 'post',
      url: endpoints.auth.resendEmail,
    });

    return response.data;
  }, [request]);

  return {
    getProfile,
    performLogin,
    requestChangePassword,
    refreshToken,
    updatePassword,
    updateEmail,
    resendConfirmationEmail,
  };
};
