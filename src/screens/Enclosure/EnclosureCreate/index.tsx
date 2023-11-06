import React, { useMemo, useRef } from 'react';

import { useToast } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import BaseForm from '../../../components/BaseForm';
import EnclosureInfo from '../Form/EnclosureInfo';

type EnclosureCreateProps = NativeStackScreenProps<
  EnclosureStackParamList,
  'EnclosureCreate'
>;

const EnclosureCreate: React.FC<EnclosureCreateProps> = ({ navigation }) => {
  const enclosureInfoStepRef = useRef<IFormStepRef>(null);

  const toast = useToast();

  const enclosureRequest = useMutation(
    async () => console.log('request feito'),
    {
      onSuccess: () => {
        toast.show({
          placement: 'top',
          render: () => (
            <AlertToast status={'success'} title={'Recinto cadastrado'} />
          ),
        });
        navigation.goBack();
      },
    }
  );

  const steps: Array<IStep> = useMemo(() => {
    const data: Array<IStep> = [
      {
        title: 'Cadastro de recinto',
        ref: enclosureInfoStepRef,
        component: EnclosureInfo,
      },
    ];

    return data;
  }, []);

  return (
    <BaseForm steps={steps} createRequest={enclosureRequest} title="Cadastro" />
  );
};

export default EnclosureCreate;
