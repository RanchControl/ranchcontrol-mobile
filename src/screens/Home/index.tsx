import React from 'react';

import { Box, Button, Text } from 'native-base';
import { useTheme } from 'styled-components';

const Home: React.FC = () => {
  const theme = useTheme();
  console.log(theme.colors.background);
  return (
    <Box
      bgColor={'background'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Text>Tema verde e amarelo</Text>
      <Button onPress={() => {}} mt={4}>
        Clique aqui
      </Button>
      <Button onPress={() => {}} mt={4} colorScheme="secondary">
        Clique aqui
      </Button>
    </Box>
  );
};

export default Home;
