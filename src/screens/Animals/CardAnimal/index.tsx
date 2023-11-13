import React from 'react';

import { Box, HStack, Heading, VStack, Text } from '@gluestack-ui/themed';
import { cnpj } from 'cpf-cnpj-validator';
import { TouchableOpacity } from 'react-native';

interface CardAnimalProps {
  farm?: Farm;
  onPress?: () => void;
}

const CardAnimal: React.FC<CardAnimalProps> = ({ farm, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderColor="$borderDark100"
        bg="$light50"
        borderRadius="$lg"
        borderWidth="$1"
        my="$2"
        width={'100%'}
      >
        <VStack px="$6" pt="$4" pb="$6">
          <Heading textTransform="capitalize" size="sm">
            farm.name
          </Heading>
          <HStack mt="$1.5">
            <Text fontWeight="$semibold" fontSize="$xs">
              CNPJ:{' '}
            </Text>
            {/* <Text fontSize="$xs">{cnpj.format(farm.cnpj)}</Text> */}
          </HStack>
          <HStack mt="$1.5">
            <Text fontWeight="$semibold" fontSize="$xs">
              Data de criação:{' '}
            </Text>
            <Text fontSize="$xs">
              {/* {new Date(farm.createdAt).toLocaleDateString('pt-BR')} */}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default CardAnimal;
