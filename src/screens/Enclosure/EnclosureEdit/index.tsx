import React, { useMemo, useRef } from 'react';

import { useToast } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import BaseForm from '../../../components/BaseForm';
import { useEnclosure } from '../../../hooks';
import EnclosureInfo from '../Form/EnclosureInfo';

type EnclosureEditProps = NativeStackScreenProps<
  EnclosureStackParamList,
  'EnclosureEdit'
>;

const EnclosureEdit: React.FC<EnclosureEditProps> = ({ navigation, route }) => {
  const enclosureInfoStepRef = useRef<IFormStepRef>(null);

  const { updateEnclosure } = useEnclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  const enclosureRequest = useMutation(
    async (values: EnclosureFormValues) =>
      updateEnclosure(route.params.enclosure.id, values),
    {
      onSuccess: () => {
        toast.show({
          placement: 'top',
          render: () => (
            <AlertToast
              status={'success'}
              title={'Recinto atualizado com sucesso!'}
            />
          ),
        });
        queryClient.invalidateQueries('enclosures');
        navigation.navigate('EnclosureList');
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
    <BaseForm
      steps={steps}
      createRequest={enclosureRequest}
      title="Edição"
      initialValues={route.params.enclosure}
    />
  );
};

export default EnclosureEdit;
