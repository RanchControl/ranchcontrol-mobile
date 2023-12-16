import { useCallback } from 'react';

import moment from 'moment';

import { endpoints, useApi } from '../../contexts/Api';
import { useAuth } from '../../contexts/Auth';

export const useAnimal = () => {
  const { request } = useApi();
  const { appConfig } = useAuth();

  const generateAnimalObject = useCallback((values: AnimalFormValues) => {
    return {
      ...values,
      bornDate: moment(values.bornDate, 'DD/MM/YYYY').toDate(),
      entryDate: moment(values.entryDate, 'DD/MM/YYYY').toDate(),
      weaningDate: moment(values.weaningDate, 'DD/MM/YYYY').toDate(),
      fitnessDate: moment(values.fitnessDate, 'DD/MM/YYYY').toDate(),
      number: Number(values.number),
      bornWheight: Number(values.bornWheight),
      entryWheight: Number(values.entryWheight),
      weight: Number(values.weight),
    };
  }, []);

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
        url: endpoints.animal.detail.replace(':id', id.toString()),
        params: {
          farm: appConfig?.farm.id,
        },
      });

      return response.data;
    },
    [request]
  );

  const createAnimal = useCallback(
    async (data: AnimalFormValues) => {
      const response = await request<Animal>({
        method: 'post',
        url: endpoints.animal.create,
        params: {
          farm: appConfig?.farm.id,
        },
        data: generateAnimalObject(data),
      });

      return response.data;
    },
    [request]
  );

  const updateAnimal = useCallback(
    async (id: number, data: AnimalFormValues) => {
      const response = await request<Animal>({
        method: 'patch',
        url: endpoints.animal.update.replace(':id', id.toString()),
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
        url: endpoints.animal.update.replace(':id', id.toString()),
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
