import { useCallback } from 'react';

import moment from 'moment';

import { endpoints, useApi } from '../../contexts/Api';
import { useAuth } from '../../contexts/Auth';

export const useBatch = () => {
  const { request } = useApi();
  const { appConfig } = useAuth();

  const generateBatchObject = useCallback((batch: BatchFormValues) => {
    console.log(batch.bornDate);
    return {
      ...batch,
      age: Number(batch.age),
      animalQuantity: Number(batch.animalQuantity),
      earringStartNumber: Number(batch.earringStartNumber),
      wheightAverage: Number(batch.wheightAverage),
      enclosure: Number(batch.enclosure),
      bornDate: moment(batch.bornDate, 'DD/MM/YYYY').toDate(),
    };
  }, []);

  const listBatch = useCallback(async () => {
    const response = await request<Batch[]>({
      method: 'get',
      url: endpoints.batch.list,
      params: {
        farm: appConfig?.farm.id,
      },
    });

    return response.data;
  }, [request]);

  const getBatch = useCallback(
    async (id: number) => {
      const response = await request<Batch>({
        method: 'get',
        url: endpoints.batch.detail.replace(':id', id.toString()),
      });

      return response.data;
    },
    [request]
  );

  const createBatch = useCallback(
    async (data: BatchFormValues) => {
      const response = await request<Batch>({
        method: 'post',
        url: endpoints.batch.create,
        data: {
          ...generateBatchObject(data),
        },
      });

      return response.data;
    },
    [request]
  );

  const updateBatch = useCallback(
    async (id: number, data: BatchFormValues) => {
      const response = await request<Batch>({
        method: 'patch',
        url: endpoints.batch.update.replace(':id', id.toString()),
        data,
      });

      return response.data;
    },
    [request]
  );

  const deleteBatch = useCallback(
    async (id: number) => {
      const response = await request<Batch>({
        method: 'delete',
        url: endpoints.batch.update.replace(':id', id.toString()),
      });

      return response.data;
    },
    [request]
  );

  return {
    listBatch,
    getBatch,
    updateBatch,
    createBatch,
    deleteBatch,
  };
};
