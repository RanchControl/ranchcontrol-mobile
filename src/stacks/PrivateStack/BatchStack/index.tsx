import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { config } from '../../../config/gluestack-ui.config';
import BatchDetail from '../../../screens/Batch/Detail';
import BatchList from '../../../screens/Batch/List';

const Stack = createNativeStackNavigator<BatchStackParamList>();

export const BatchStack = () => {
  const colors = config.tokens.colors;
  return (
    <Stack.Navigator
      initialRouteName="BatchList"
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
        name="BatchList"
        component={BatchList}
        options={{
          title: 'Lotes',
        }}
      />
      <Stack.Screen
        name="BatchDetail"
        component={BatchDetail}
        options={{
          title: 'Detalhes do lote',
        }}
      />
    </Stack.Navigator>
  );
};
