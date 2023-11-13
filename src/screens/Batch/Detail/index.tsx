import React from 'react';

import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  EditIcon,
  HStack,
  Heading,
  Spinner,
  Text,
  TrashIcon,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import { useBatch, useToggle } from '../../../hooks';
import DeleteDialog from './DeleteDialog';

type BatchDetailProps = NativeStackScreenProps<
  BatchStackParamList,
  'BatchDetail'
>;

const BatchDetail: React.FC<BatchDetailProps> = ({ navigation, route }) => {
  const toast = useToast();
  const deleteModal = useToggle();
  const { getBatch, deleteBatch } = useBatch();
  const queryClient = useQueryClient();

  const fetchBatch = useQuery(
    ['batchs', route.params.batchId],
    () => getBatch(route.params.batchId),
    {
      onError: () => {
        toast.show({
          render: () => (
            <AlertToast status={'error'} title={'Erro ao carregar o lote'} />
          ),
        });
        navigation.goBack();
      },
    }
  );

  const deleteBatchRequest = useMutation(
    () => deleteBatch(route.params.batchId),
    {
      onSuccess: () => {
        toast.show({
          render: () => (
            <AlertToast
              status={'success'}
              title={'Lote deletado com sucesso'}
            />
          ),
        });
        queryClient.invalidateQueries('batchs');
        navigation.goBack();
      },
      onError: () => {
        toast.show({
          render: () => (
            <AlertToast status={'error'} title={'Erro ao carregar o lote'} />
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
      {fetchBatch.isLoading ? (
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
          <Heading mx="$4" mt={'$4'} textTransform="capitalize" size="md">
            {fetchBatch.data.name}
          </Heading>
          <HStack px="$4" pb="$4">
            <VStack width={'$1/2'}>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Situação:{' '}
                </Text>
                <Text textTransform="capitalize" fontSize="$xs">
                  {fetchBatch.data.situation}
                </Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Recinto:{' '}
                </Text>
                <Text fontSize="$xs">{fetchBatch.data.enclosureId}</Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Raça:{' '}
                </Text>
                <Text fontSize="$xs">{fetchBatch.data.breed}</Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Nº do brinco:{' '}
                </Text>
                <Text fontSize="$xs">{fetchBatch.data.earringStartNumber}</Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Observação:{' '}
                </Text>
                <Text isTruncated fontSize="$xs">
                  {fetchBatch.data.observation +
                    'asdasdassssssssssssssssssssssssssssssssssssssssssssda'}
                </Text>
              </HStack>
            </VStack>
            <VStack width={'$1/2'}>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Idade:{' '}
                </Text>
                <Text textTransform="capitalize" fontSize="$xs">
                  {fetchBatch.data.age}
                </Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Quantitade:{' '}
                </Text>
                <Text fontSize="$xs">{fetchBatch.data.animalQuantity}</Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Nascimento:{' '}
                </Text>
                <Text fontSize="$xs">
                  {new Date(fetchBatch.data.bornDate).toLocaleDateString(
                    'pt-BR'
                  )}
                </Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Média de peso:{' '}
                </Text>
                <Text fontSize="$xs">{fetchBatch.data.wheightAverage}</Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      )}
      <Box>
        <Button
          size="lg"
          onPress={() =>
            navigation.navigate('BatchEdit', {
              batch: fetchBatch.data,
            })
          }
        >
          <ButtonIcon mr={'$2'} as={EditIcon} />
          <ButtonText>Editar</ButtonText>
        </Button>
        <Button
          onPress={deleteModal.onToggle}
          size="lg"
          action="negative"
          variant="outline"
          mt={'$2'}
        >
          <ButtonIcon mr={'$2'} as={TrashIcon} />
          <ButtonText>Deletar</ButtonText>
        </Button>
        <DeleteDialog
          isOpen={deleteModal.isOpen}
          onToggle={deleteModal.onToggle}
          title={'Deletar lote'}
          description={'Tem certeza que deseja deletar este lote?'}
          onDelete={deleteBatchRequest}
        />
      </Box>
    </VStack>
  );
};

export default BatchDetail;
