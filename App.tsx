import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components/native';

import { ApiProvider } from './src/contexts/Api';
import { AuthProvider } from './src/contexts/Auth';
import { RootStack } from './src/stacks/RootStack';
import { theme } from './src/themes/theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              <StatusBar style="dark" />
              <ApiProvider>
                <AuthProvider>
                  <RootStack />
                </AuthProvider>
              </ApiProvider>
            </QueryClientProvider>
          </NavigationContainer>
        </ThemeProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
