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

  const createEnclosure = useCallback(
    async (data: EnclosureFormValues) => {
      const response = await request<Enclosure>({
        method: 'post',
        url: endpoints.enclosure.create,
        data: {
          farmId: 2,
          ...data,
        },
      });

      return response.data;
    },
    [request]
  );

  const updateEnclosure = useCallback(
    async (id: number, data: EnclosureFormValues) => {
      const response = await request<Enclosure>({
        method: 'patch',
        url: endpoints.enclosure.update.replace(':id', id.toString()),
        data,
      });

      return response.data;
    },
    [request]
  );

  const deleteEnclosure = useCallback(
    async (id: number) => {
      const response = await request<Enclosure>({
        method: 'delete',
        url: endpoints.enclosure.update.replace(':id', id.toString()),
      });

      return response.data;
    },
    [request]
  );

  return {
    listEnclosure,
    getEnclosure,
    updateEnclosure,
    createEnclosure,
    deleteEnclosure,
  };
};
