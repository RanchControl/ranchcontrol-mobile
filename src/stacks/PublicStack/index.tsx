import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPassword from '../../screens/ForgotPassword';
import Login from '../../screens/Login';
import Register from '../../screens/Register';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Cadastro',
          headerBackTitleVisible: false,
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
