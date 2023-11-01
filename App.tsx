import React from 'react';

import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';

import { config } from './src/config/gluestack-ui.config';
import { ApiProvider } from './src/contexts/Api';
import { AuthProvider } from './src/contexts/Auth';
import { RootStack } from './src/stacks/RootStack';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <ApiProvider>
              <AuthProvider>
                <StatusBar barStyle="dark-content" />
                <RootStack />
              </AuthProvider>
            </ApiProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
