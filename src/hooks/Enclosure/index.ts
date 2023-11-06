import { useCallback } from 'react';

import { endpoints, useApi } from '../../contexts/Api';

export const useEnclosure = () => {
  const { request } = useApi();

  const listEnclosure = useCallback(async () => {
    const response = await request<Enclosure[]>({
      method: 'get',
      url: endpoints.enclosure.list,
    });

    return response.data;
  }, [request]);

  const getEnclosure = useCallback(
    async (id: number) => {
      const response = await request<Enclosure>({
        method: 'get',
        url: endpoints.enclosure.detail.replace(':id', id.toString()),
      });

      return response.data;
    },
    [request]
  );

  return {
    listEnclosure,
    getEnclosure,
  };
};
