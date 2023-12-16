import React, { useMemo, useRef } from 'react';

import { useToast } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import BaseForm from '../../../components/BaseForm';
import { useBatch } from '../../../hooks';
import BatchInfo from '../Form/BatchInfo';

type BatchCreateProps = NativeStackScreenProps<
  BatchStackParamList,
  'BatchCreate'
>;

const BatchCreate: React.FC<BatchCreateProps> = ({ navigation }) => {
  const batchInfoStepRef = useRef<IFormStepRef>(null);

  const { createBatch } = useBatch();
  const toast = useToast();
  const queryClient = useQueryClient();

  const batchRequest = useMutation(
    async (values: BatchFormValues) => createBatch(values),
    {
      onSuccess: () => {
        toast.show({
          placement: 'top',
          render: () => (
            <AlertToast status={'success'} title={'Lote cadastrado'} />
          ),
        });
        queryClient.invalidateQueries('batchs');
        navigation.goBack();
      },
      onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
        toast.show({
          placement: 'top',
          render: () => (
            <AlertToast status={'error'} title={error.response.data.message} />
          ),
        });
      },
    }
  );

  const steps: Array<IStep> = useMemo(() => {
    const data: Array<IStep> = [
      {
        title: 'Cadastro de lote',
        ref: batchInfoStepRef,
        component: BatchInfo,
      },
    ];

    return data;
  }, []);

  return (
    <BaseForm steps={steps} createRequest={batchRequest} title="Cadastro" />
  );
};

export default BatchCreate;
