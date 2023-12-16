import React from 'react';

import {
  Box,
  ButtonIcon,
  ButtonText,
  EditIcon,
  HStack,
  Heading,
  Spinner,
  TrashIcon,
  VStack,
  useToast,
  Button,
  Text,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import { useAnimal, useToggle } from '../../../hooks';
import DeleteDialog from './DeleteDialog';

type AnimalDetailProps = NativeStackScreenProps<
  AnimalStackParamList,
  'AnimalDetail'
>;

const AnimalDetail: React.FC<AnimalDetailProps> = ({ navigation, route }) => {
  const toast = useToast();
  const deleteModal = useToggle();
  const { getAnimal, deleteAnimal } = useAnimal();
  const queryClient = useQueryClient();

  const fetchAnimal = useQuery(
    ['animals', route.params.animalId],
    () => getAnimal(route.params.animalId),
    {
      onError: () => {
        toast.show({
          render: () => (
            <AlertToast status={'error'} title={'Erro ao carregar o animal'} />
          ),
        });
        navigation.goBack();
      },
    }
  );

  const deleteAnimalRequest = useMutation(
    () => deleteAnimal(route.params.animalId),
    {
      onSuccess: () => {
        toast.show({
          render: () => (
            <AlertToast
              status={'success'}
              title={'Animal deletado com sucesso'}
            />
          ),
        });
        queryClient.invalidateQueries('animals');
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
      {fetchAnimal.isLoading ? (
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
          <Heading
            underline
            mx="$4"
            mt={'$4'}
            textTransform="capitalize"
            size="md"
          >
            {fetchAnimal.data.name}
          </Heading>
          <HStack px="$4" pb="$4">
            <VStack width={'$1/2'}>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Número:{' '}
                </Text>
                <Text fontSize="$xs">{fetchAnimal.data.number}</Text>
              </HStack>

              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Raça:{' '}
                </Text>
                <Text fontSize="$xs">{fetchAnimal.data.breed}</Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Peso:{' '}
                </Text>
                <Text fontSize="$xs">{fetchAnimal.data.weight}</Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Tipo:{' '}
                </Text>
                <Text fontSize="$xs">{fetchAnimal.data.type}</Text>
              </HStack>
            </VStack>
            <VStack width={'$1/2'}>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Data de entrada:{' '}
                </Text>
                <Text fontSize="$xs">
                  {new Date(fetchAnimal.data.entryDate).toLocaleDateString(
                    'pt-BR'
                  )}
                </Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Stataus:{' '}
                </Text>
                <Text textTransform="capitalize" fontSize="$xs">
                  {fetchAnimal.data.status}
                </Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Lote:{' '}
                </Text>
                <Text fontSize="$xs">{fetchAnimal.data.batchs.name}</Text>
              </HStack>
              <HStack mt="$1.5">
                <Text fontWeight="$semibold" fontSize="$xs">
                  Categoria:{' '}
                </Text>
                <Text fontSize="$xs">{fetchAnimal.data.category}</Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      )}
      <Box>
        <Button
          size="lg"
          onPress={() =>
            navigation.navigate('AnimalEdit', {
              animal: fetchAnimal.data,
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
          onDelete={deleteAnimalRequest}
        />
      </Box>
    </VStack>
  );
};

export default AnimalDetail;
