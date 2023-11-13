import React from 'react';

import { Box, Text } from '@gluestack-ui/themed';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type HomeProps = BottomTabScreenProps<PrivateStackParamList, 'Dashboard'>;

const Home: React.FC<HomeProps> = () => {
  return (
    <Box
      bgColor={'$background'}
      width="100%"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Text>RanchControl</Text>
    </Box>
  );
};

export default Home;
