import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { config } from '../../../config/gluestack-ui.config';
import EnclosureCreate from '../../../screens/Enclosure/EnclosureCreate';
import EnclosureDetail from '../../../screens/Enclosure/EnclosureDetail';
import EnclosureEdit from '../../../screens/Enclosure/EnclosureEdit';
import EnclosureList from '../../../screens/Enclosure/EnclosureList';

const Stack = createNativeStackNavigator<EnclosureStackParamList>();

export const EnclosureStack = () => {
  const colors = config.tokens.colors;
  return (
    <Stack.Navigator
      initialRouteName="EnclosureList"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: colors.textDark0,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="EnclosureList"
        component={EnclosureList}
        options={{
          title: 'Recintos',
        }}
      />
      <Stack.Screen
        name="EnclosureDetail"
        component={EnclosureDetail}
        options={{
          title: 'Detalhes do recinto',
        }}
      />
      <Stack.Screen
        name="EnclosureCreate"
        component={EnclosureCreate}
        options={{
          title: 'Criar recinto',
        }}
      />
      <Stack.Screen
        name="EnclosureEdit"
        component={EnclosureEdit}
        options={{
          title: 'Editar recinto',
        }}
      />
    </Stack.Navigator>
  );
};
