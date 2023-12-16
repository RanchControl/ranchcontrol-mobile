import React from 'react';

import {
  Box,
  HStack,
  Input,
  InputSlot,
  InputIcon,
  SearchIcon,
  InputField,
  ButtonIcon,
  MenuIcon,
  Button,
  useToast,
  Heading,
  Spinner,
  Fab,
  FabIcon,
  AddIcon,
  Text,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import { useAnimal } from '../../../hooks';
import CardAnimal from '../CardAnimal';

type AnimalListProps = NativeStackScreenProps<
  AnimalStackParamList,
  'AnimalList'
>;

const AnimalList: React.FC<AnimalListProps> = ({ navigation }) => {
  const { listAnimals } = useAnimal();
  const toast = useToast();

  const fetchAnimals = useQuery(['animals'], listAnimals, {
    onError: () => {
      toast.show({
        placement: 'top',
        render: () => (
          <AlertToast status={'error'} title={'Erro ao carregar os animais'} />
        ),
      });
    },
  });

  const renderEmptyList = () => {
    if (fetchAnimals.isLoading) {
      return <Spinner size="small" />;
    }
    return <Text textAlign="center">Nenhum animal encontrado</Text>;
  };

  return (
    <Box bgColor={'$background'} width="100%" flex={1} p={'$5'}>
      <FlatList
        data={fetchAnimals.data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <Heading
              borderBottomColor="$secondary400"
              borderBottomWidth={'$1'}
              width={'$1/2'}
              color="$textLight600"
            >
              Lista de animais
            </Heading>
            <HStack width={'$full'} justifyContent="space-between" my={'$3'}>
              <Input variant="outline" width={'$3/4'}>
                <InputSlot pl="$3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder="Busque o animal" />
              </Input>
              <Button size="lg" p="$3.5" bg="rgba(40, 84, 41, 0.10);">
                <ButtonIcon as={MenuIcon} color="$primary500" size="xl" />
              </Button>
            </HStack>
          </>
        )}
        renderItem={({ item }) => (
          <CardAnimal
            animal={item}
            onPress={() => navigation.navigate('AnimalDetail')}
          />
        )}
        ListEmptyComponent={renderEmptyList}
        style={{ width: '100%' }}
      />
      <Fab
        onPress={() => navigation.navigate('AnimalCreate')}
        placement="bottom right"
      >
        <FabIcon as={AddIcon} />
      </Fab>
    </Box>
  );
};

export default AnimalList;
