import React from 'react';

import {
  Box,
  HStack,
  Heading,
  VStack,
  Text,
  Button,
  ButtonText,
  ButtonIcon,
  EditIcon,
  TrashIcon,
  useToast,
  Spinner,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import { useEnclosure } from '../../../hooks';

type EnclosureDetailProps = NativeStackScreenProps<
  EnclosureStackParamList,
  'EnclosureDetail'
>;

const EnclosureDetail: React.FC<EnclosureDetailProps> = ({
  navigation,
  route,
}) => {
  const toast = useToast();
  const { getEnclosure } = useEnclosure();

  const fetchEnclosure = useQuery(
    ['enclosure', route.params.enclosureId],
    () => getEnclosure(route.params.enclosureId),
    {
      onError: () => {
        toast.show({
          render: () => (
            <AlertToast status={'error'} title={'Erro ao carregar o recinto'} />
          ),
        });
        navigation.goBack();
      },
    }
  );

  return (
    <VStack
      bgColor={'$background'}
      width="100%"
      flex={1}
      p={'$5'}
      justifyContent="space-between"
    >
      {fetchEnclosure.isLoading ? (
        <Spinner />
      ) : (
        <Box
          borderColor="$borderDark100"
          bg="$light50"
          borderRadius="$lg"
          borderWidth="$1"
          my="$5"
          width={'100%'}
        >
          <VStack px="$6" pt="$4" pb="$6">
            <Heading size="md">Detalhe do recinto</Heading>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$sm">
                Nome:{' '}
              </Text>
              <Text fontSize="$xs" textTransform="capitalize">
                {fetchEnclosure.data.name}
              </Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$sm">
                Tipo:{' '}
              </Text>
              <Text fontSize="$xs">{fetchEnclosure.data.type}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$sm">
                Fazenda:{' '}
              </Text>
              <Text fontSize="$xs">{fetchEnclosure.data.farmId}</Text>
            </HStack>
          </VStack>
        </Box>
      )}
      <Box>
        <Button size="lg" bg="$primary400">
          <ButtonIcon mr={'$2'} as={EditIcon} />
          <ButtonText>Editar</ButtonText>
        </Button>
        <Button size="lg" action="negative" variant="outline" mt={'$2'}>
          <ButtonIcon mr={'$2'} as={TrashIcon} />
          <ButtonText>Deletar</ButtonText>
        </Button>
      </Box>
    </VStack>
  );
};

export default EnclosureDetail;
