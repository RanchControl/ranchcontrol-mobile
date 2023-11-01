import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../../contexts/Auth';
import { SplashScreen } from '../../screens/SplashScreen';
import { PrivateStack } from '../PrivateStack';
import { PublicStack } from '../PublicStack';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  const { isLoading, authorized } = useAuth();

  return (
    <Stack.Navigator>
      {isLoading && (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      )}
      {!authorized ? (
        <>
          <Stack.Screen
            name="AuthStack"
            component={PublicStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivateStack"
            component={PrivateStack}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="PrivateStack"
            component={PrivateStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AuthStack"
            component={PublicStack}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
