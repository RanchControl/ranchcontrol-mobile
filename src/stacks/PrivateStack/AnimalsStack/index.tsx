import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { config } from '../../../config/gluestack-ui.config';
import AnimalCreate from '../../../screens/Animals/AnimalCreate';
import AnimalDetail from '../../../screens/Animals/AnimalDetail';
import AnimalList from '../../../screens/Animals/AnimalList';

const Stack = createNativeStackNavigator<AnimalStackParamList>();

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
      <Stack.Screen
        name="AnimalCreate"
        component={AnimalCreate}
        options={{
          title: 'Criar animal',
        }}
      />
      <Stack.Screen
        name="AnimalDetail"
        component={AnimalDetail}
        options={{
          title: 'Detalhes do animal',
        }}
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
