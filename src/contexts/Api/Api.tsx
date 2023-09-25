import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useToast } from 'native-base';

interface RequestConfig extends AxiosRequestConfig {
  method: Method;
  url: string;
}

interface ApiContextValues {
  request: <Type>(config: RequestConfig) => Promise<AxiosResponse<Type>>;
  requestBrasilApi: <Type>(
    config: RequestConfig
  ) => Promise<AxiosResponse<Type>>;
  addInterceptors: (tokens: Tokens, onUnauthorized: () => any) => void;
  cleanInterceptors: () => void;
  invalidVersion?: {
    message: string;
    organization: OutdatedPayload;
  };
}

interface Interceptors {
  request: number;
  response: number;
}

interface ApiProviderProps {
  children: React.ReactNode;
}

type OnUnauthorizedFunction = () => Promise<void> | void;

interface OutdatedPayload {
  android_url: string;
  ios_url: string;
  message: string;
}

const ApiContext = createContext<ApiContextValues>({} as ApiContextValues);

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [interceptors, setInterceptors] = useState<Interceptors>();
  const [invalidVersion, setInvalidVersion] = useState<{
    message: string;
    organization: OutdatedPayload;
  }>();

  const toast = useToast();

  const apiInstance = useMemo(
    () =>
      axios.create({
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        timeout: 30000,
        headers: {
          'Accept-language': 'pt-BR',
        },
      }),
    []
  );

  const brasilApiInstance = useMemo(
    () =>
      axios.create({
        baseURL: process.env.BRASIL_API_URL,
      }),
    []
  );

  const setAuthorizationHeader = useCallback(
    (tokens: Tokens) => {
      return apiInstance?.interceptors.request.use((config) => {
        if (tokens && config.headers) {
          config.headers.authorization = `Bearer ${tokens.access_token}`;
        }

        return config;
      });
    },
    [apiInstance?.interceptors.request]
  );

  const handleUnauthorized = useCallback(
    (onUnauthorized: OnUnauthorizedFunction) => {
      return apiInstance?.interceptors.response.use(
        (config) => config,
        async (responseError) => {
          if (responseError?.response?.status === 401) {
            toast.show({
              title: 'Sua sessão expirou. Por favor, logue novamente.',
              variant: 'error',
            });
            await onUnauthorized();
          }
          return Promise.reject(responseError);
        }
      );
    },
    [apiInstance?.interceptors.response]
  );

  const addInterceptors = useCallback(
    (tokens: Tokens, onUnauthorized: OnUnauthorizedFunction) => {
      const newRequestInterceptor = setAuthorizationHeader(tokens);
      const newResponseInterceptor = handleUnauthorized(onUnauthorized);
      setInterceptors({
        request: newRequestInterceptor,
        response: newResponseInterceptor,
      });
    },
    [setAuthorizationHeader, handleUnauthorized]
  );

  const cleanInterceptors = useCallback(() => {
    if (interceptors !== undefined) {
      apiInstance?.interceptors.request.eject(interceptors.request);
      apiInstance?.interceptors.response.eject(interceptors.response);
    }
  }, [
    apiInstance?.interceptors.request,
    apiInstance?.interceptors.response,
    interceptors,
  ]);

  const handleNotAcceptable = useCallback(() => {
    apiInstance?.interceptors.response.use(
      (config) => config,
      async (responseError) => {
        if (responseError?.response?.status === 406) {
          setInvalidVersion(responseError?.response?.data);
        }
        return Promise.reject(responseError);
      }
    );
  }, [apiInstance?.interceptors.response]);

  useEffect(() => {
    handleNotAcceptable();
  }, [handleNotAcceptable]);

  return (
    <ApiContext.Provider
      value={{
        request: apiInstance.request,
        addInterceptors,
        cleanInterceptors,
        invalidVersion,
        requestBrasilApi: brasilApiInstance.request,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
