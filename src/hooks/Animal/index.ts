import { useCallback } from 'react';

import { endpoints, useApi } from '../../contexts/Api';
import { useAuth } from '../../contexts/Auth';

export const useAnimal = () => {
  const { request } = useApi();
  const { appConfig } = useAuth();

  const listAnimals = useCallback(async () => {
    const response = await request<Animal[]>({
      method: 'get',
      url: endpoints.animal.list,
      params: {
        farm: appConfig?.farm.id,
      },
    });

    return response.data;
  }, [request]);

  const getAnimal = useCallback(
    async (id: number) => {
      const response = await request<Animal>({
        method: 'get',
        url: endpoints.enclosure.detail.replace(':id', id.toString()),
      });

      return response.data;
    },
    [request]
  );

  const createAnimal = useCallback(
    async (data: AnimalFormValues) => {
      const response = await request<Animal>({
        method: 'post',
        url: endpoints.enclosure.create,
        data: {
          farmId: appConfig?.farm.id,
          ...data,
        },
      });

      return response.data;
    },
    [request]
  );

  const updateAnimal = useCallback(
    async (id: number, data: AnimalFormValues) => {
      const response = await request<Animal>({
        method: 'patch',
        url: endpoints.enclosure.update.replace(':id', id.toString()),
        data,
      });

      return response.data;
    },
    [request]
  );

  const deleteAnimal = useCallback(
    async (id: number) => {
      const response = await request<Animal>({
        method: 'delete',
        url: endpoints.enclosure.update.replace(':id', id.toString()),
      });

      return response.data;
    },
    [request]
  );

  return {
    listAnimals,
    getAnimal,
    updateAnimal,
    createAnimal,
    deleteAnimal,
  };
};
