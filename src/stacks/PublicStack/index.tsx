import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { config } from '../../config/gluestack-ui.config';
import ForgotPassword from '../../screens/ForgotPassword';
import Login from '../../screens/Login';
import Register from '../../screens/Register';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicStack = () => {
  const colors = config.tokens.colors;
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.primary500,
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Cadastro',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary500,
          },
          headerTintColor: colors.textLight50,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Esqueci minha senha',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
