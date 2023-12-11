import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { config } from '../../../config/gluestack-ui.config';
import AnimalList from '../../../screens/Animals/AnimalList';

const Stack = createNativeStackNavigator<AnimalsStackParamList>();

export const AnimalStack = () => {
  const colors = config.tokens.colors;
  return (
    <Stack.Navigator
      initialRouteName="AnimalList"
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
        name="AnimalList"
        options={{
          title: 'Animais',
        }}
        component={AnimalList}
      />
      {/*       <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );
};
