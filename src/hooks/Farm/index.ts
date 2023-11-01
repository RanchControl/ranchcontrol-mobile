import { useCallback } from 'react';

import { endpoints, useApi } from '../../contexts/Api';

export const useFarm = () => {
  const { request } = useApi();

  const listFarm = useCallback(async () => {
    const response = await request<Farm[]>({
      method: 'get',
      url: endpoints.farm.list,
    });

    return response.data;
  }, [request]);

  return {
    listFarm,
  };
};
