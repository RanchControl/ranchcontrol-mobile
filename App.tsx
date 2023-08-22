import React from 'react';

import { GluestackUIProvider, Text, Box, config } from '@gluestack-ui/themed';

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <Box width="100%" justifyContent="center" alignItems="center" flex={1}>
        <Text>Ranch control!</Text>
      </Box>
    </GluestackUIProvider>
  );
}
