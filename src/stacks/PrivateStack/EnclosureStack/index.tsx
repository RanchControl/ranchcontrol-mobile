import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { config } from '../../../config/gluestack-ui.config';
import Enclosure from '../../../screens/Enclosure';
import EnclosureDetail from '../../../screens/Enclosure/EnclosureDetail';

const Stack = createNativeStackNavigator<EnclosureStackParamList>();

export const EnclosureStack = () => {
  const colors = config.tokens.colors;
  return (
    <Stack.Navigator
      initialRouteName="EnclosureList"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary400,
        },
        headerTintColor: colors.textDark0,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="EnclosureList"
        component={Enclosure}
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
    </Stack.Navigator>
  );
};
