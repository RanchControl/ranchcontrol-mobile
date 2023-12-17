import React, { useMemo, useRef } from 'react';

import { useToast } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import BaseForm from '../../../components/BaseForm';
import { useAnimal } from '../../../hooks';
import AnimalInfo from '../Form/AnimalInfo';

type AnimalCreateProps = NativeStackScreenProps<
  AnimalStackParamList,
  'AnimalCreate'
>;

const AnimalCreate: React.FC<AnimalCreateProps> = ({ navigation }) => {
  const animalInfoStepRef = useRef<IFormStepRef>(null);

  const { createAnimal } = useAnimal();
  const toast = useToast();
  const queryClient = useQueryClient();

  const animalRequest = useMutation(
    async (values: AnimalFormValues) => createAnimal(values),
    {
      onSuccess: () => {
        toast.show({
          placement: 'top',
          render: () => (
            <AlertToast status={'success'} title={'Animal cadastrado'} />
          ),
        });
        queryClient.invalidateQueries('animals');
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
        ref: animalInfoStepRef,
        component: AnimalInfo,
      },
    ];

    return data;
  }, []);

  return (
    <BaseForm steps={steps} createRequest={animalRequest} title="Cadastro" />
  );
};

export default AnimalCreate;
