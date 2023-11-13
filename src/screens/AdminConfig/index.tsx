import React from 'react';

import { Center, Spinner, useToast } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';

import AlertToast from '../../components/AlertToast';
import { useAuth } from '../../contexts/Auth';
import { useFarm } from '../../hooks';
import CardFarm from './CardFarm';

type AdminConfigProps = NativeStackScreenProps<
  PrivateStackParamList,
  'AdminConfig'
>;

const AdminConfig: React.FC<AdminConfigProps> = ({ navigation }) => {
  const { setAppConfig } = useAuth();
  const { listFarm } = useFarm();
  const toast = useToast();

  const fetchFarms = useQuery(['farms'], listFarm, {
    onError: () => {
      toast.show({
        render: () => (
          <AlertToast status={'error'} title={'Erro ao carregar as fazendas'} />
        ),
      });
    },
  });

  const renderEmptyList = () => {
    if (fetchFarms.isLoading) {
      return <Spinner size="small" />;
    }
    return null;
  };

  return (
    <Center flex={1} backgroundColor="$background" pt={'$5'} px={'$5'}>
      <FlatList
        data={fetchFarms.data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardFarm
            farm={item}
            onPress={() => {
              setAppConfig({ farm: item });
              navigation.navigate('Dashboard');
            }}
          />
        )}
        ListEmptyComponent={renderEmptyList}
        style={{ width: '100%' }}
      />
    </Center>
  );
};

export default AdminConfig;
