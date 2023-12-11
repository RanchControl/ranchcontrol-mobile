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
import { useBatch } from '../../../hooks';
import CardBatch from '../CardBatch';

type BatchListProps = NativeStackScreenProps<BatchStackParamList, 'BatchList'>;

const BatchList: React.FC<BatchListProps> = ({ navigation }) => {
  const { listBatch } = useBatch();
  const toast = useToast();

  const fetchBatch = useQuery(['batchs'], listBatch, {
    onError: () => {
      toast.show({
        placement: 'top',
        render: () => (
          <AlertToast status={'error'} title={'Erro ao carregar os lotes'} />
        ),
      });
    },
  });

  const renderEmptyList = () => {
    if (fetchBatch.isLoading) {
      return <Spinner size="small" />;
    }
    return null;
  };

  return (
    <Box bgColor={'$background'} width="100%" flex={1} p={'$5'}>
      <FlatList
        data={fetchBatch.data}
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
              Lista de lotes
            </Heading>
            <HStack width={'$full'} justifyContent="space-between" my={'$3'}>
              <Input variant="outline" width={'$3/4'}>
                <InputSlot pl="$3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder="Busque o lote" />
              </Input>
              <Button size="lg" p="$3.5" bg="rgba(40, 84, 41, 0.10);">
                <ButtonIcon as={MenuIcon} color="$primary500" size="xl" />
              </Button>
            </HStack>
          </>
        )}
        renderItem={({ item }) => (
          <CardBatch
            batch={item}
            onPress={() =>
              navigation.navigate('BatchDetail', { batchId: item.id })
            }
          />
        )}
        ListEmptyComponent={renderEmptyList}
        style={{ width: '100%' }}
      />
      <Fab
        onPress={() => navigation.navigate('BatchCreate')}
        placement="bottom right"
      >
        <FabIcon as={AddIcon} />
      </Fab>
    </Box>
  );
};

export default BatchList;
