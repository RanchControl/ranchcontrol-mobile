import React from 'react';

import { Box, Text } from '@gluestack-ui/themed';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type HomeProps = BottomTabScreenProps<PrivateStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = () => {
  return (
    <Box
      bgColor={'background'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Text>Tema verde e amarelo</Text>
    </Box>
  );
};

export default Home;
