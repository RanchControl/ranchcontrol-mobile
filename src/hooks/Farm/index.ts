import { useCallback } from 'react';

import { endpoints, useApi } from '../../contexts/Api';
import { useAuth } from '../../contexts/Auth';

export const useFarm = () => {
  const { request } = useApi();
  const { userInfo } = useAuth();

  const listFarm = useCallback(async () => {
    const response = await request<Farm[]>({
      method: 'get',
      url: endpoints.farm.list,
    });

    return response.data;
  }, [request]);

  const createFarm = useCallback(
    async (data: FarmFormValues) => {
      data = {
        ...data,
        cnpj: data.cnpj.replace(/\D/g, ''),
      };
      const response = await request<Farm>({
        method: 'post',
        url: endpoints.farm.create,
        data: {
          ...data,
          user: userInfo?.id,
        },
      });

      return response.data;
    },
    [request]
  );

  return {
    listFarm,
    createFarm,
  };
};
