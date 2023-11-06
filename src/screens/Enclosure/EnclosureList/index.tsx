import React from 'react';

import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  Fab,
  FabIcon,
  HStack,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  MenuIcon,
  SearchIcon,
  Spinner,
  useToast,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';

import AlertToast from '../../../components/AlertToast';
import { useEnclosure } from '../../../hooks';
import CardEnclosure from '../CardEnclosure';

type EnclosureListProps = NativeStackScreenProps<
  EnclosureStackParamList,
  'EnclosureList'
>;

const EnclosureList: React.FC<EnclosureListProps> = ({ navigation }) => {
  const { listEnclosure } = useEnclosure();
  const toast = useToast();

  const fetchEnclosure = useQuery(['enclosure'], listEnclosure, {
    onError: () => {
      toast.show({
        render: () => (
          <AlertToast status={'error'} title={'Erro ao carregar os recintos'} />
        ),
      });
    },
  });

  const renderEmptyList = () => {
    if (fetchEnclosure.isLoading) {
      return <Spinner size="small" />;
    }
    return null;
  };

  return (
    <Box bgColor={'$background'} width="100%" flex={1} p={'$5'}>
      <FlatList
        data={fetchEnclosure.data}
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
              Lista de recintos
            </Heading>
            <HStack width={'$full'} justifyContent="space-between" my={'$3'}>
              <Input variant="outline" width={'$3/4'}>
                <InputSlot pl="$3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder="Busque o recinto" />
              </Input>
              <Button size="lg" p="$3.5" bg="rgba(40, 84, 41, 0.10);">
                <ButtonIcon as={MenuIcon} color="$primary500" size="xl" />
              </Button>
            </HStack>
          </>
        )}
        renderItem={({ item }) => (
          <CardEnclosure
            enclosure={item}
            onPress={() =>
              navigation.navigate('EnclosureDetail', { enclosureId: item.id })
            }
          />
        )}
        ListEmptyComponent={renderEmptyList}
        style={{ width: '100%' }}
      />
      <Fab
        onPress={() => navigation.navigate('EnclosureCreate')}
        placement="bottom right"
      >
        <FabIcon as={AddIcon} />
      </Fab>
    </Box>
  );
};

export default EnclosureList;
