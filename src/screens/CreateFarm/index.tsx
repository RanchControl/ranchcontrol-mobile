import React, { useMemo, useRef } from 'react';

import { useToast } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import AlertToast from '../../components/AlertToast';
import BaseForm from '../../components/BaseForm';
import { useFarm } from '../../hooks';
import FarmInfo from './FarmInfo';

type CreateFarmProps = NativeStackScreenProps<
  PrivateStackParamList,
  'CreateFarm'
>;

const CreateFarm: React.FC<CreateFarmProps> = ({ navigation }) => {
  const farmInfoStepRef = useRef<IFormStepRef>(null);

  const { createFarm } = useFarm();
  const toast = useToast();
  const queryClient = useQueryClient();

  const farmRequest = useMutation(
    async (values: FarmFormValues) => createFarm(values),
    {
      onSuccess: () => {
        toast.show({
          placement: 'top',
          render: () => (
            <AlertToast status={'success'} title={'Fazenda cadastrado'} />
          ),
        });
        queryClient.invalidateQueries('farms');
        navigation.navigate('AdminConfig');
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
        title: 'Cadastro de fazenda',
        ref: farmInfoStepRef,
        component: FarmInfo,
      },
    ];

    return data;
  }, []);

  return (
    <BaseForm steps={steps} createRequest={farmRequest} title="Cadastro" />
  );
};

export default CreateFarm;
