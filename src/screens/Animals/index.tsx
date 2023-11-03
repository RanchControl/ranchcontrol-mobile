import React from 'react';

import {
  Box,
  Button,
  ButtonIcon,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  MenuIcon,
  SearchIcon,
} from '@gluestack-ui/themed';

import CardAnimal from './CardAnimal';

const Animals: React.FC = () => {
  return (
    <Box bgColor={'$background'} width="100%" flex={1} p={'$5'}>
      <HStack width={'$full'} justifyContent="space-between">
        <Input variant="outline" width={'$3/4'}>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Busque o animal" />
        </Input>
        <Button size="lg" p="$3.5" bg="$primary100">
          <ButtonIcon as={MenuIcon} color="$primary500" size="xl" />
        </Button>
      </HStack>
      <CardAnimal />
    </Box>
  );
};

export default Animals;
