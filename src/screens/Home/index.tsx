import React from 'react';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Box, Button, Text } from 'native-base';

type HomeProps = BottomTabScreenProps<PrivateStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
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
      <Button
        onPress={() => navigation.navigate('Profile')}
        mt={4}
        colorScheme="secondary"
      >
        Clique aqui
      </Button>
    </Box>
  );
};

export default Home;
