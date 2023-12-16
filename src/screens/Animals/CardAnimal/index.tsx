import React from 'react';

import { Box, HStack, Heading, VStack, Text } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

interface CardAnimalProps {
  animal?: Animal;
  onPress?: () => void;
}

const CardAnimal: React.FC<CardAnimalProps> = ({ animal, onPress }) => {
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
        <Heading
          underline
          mx="$4"
          mt={'$4'}
          textTransform="capitalize"
          size="md"
        >
          {animal.name}
        </Heading>
        <HStack px="$4" pb="$4">
          <VStack width={'$1/2'}>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Número:{' '}
              </Text>
              <Text fontSize="$xs">{animal.number}</Text>
            </HStack>

            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Raça:{' '}
              </Text>
              <Text fontSize="$xs">{animal.breed}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Peso:{' '}
              </Text>
              <Text fontSize="$xs">{animal.weight}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Tipo:{' '}
              </Text>
              <Text fontSize="$xs">{animal.type}</Text>
            </HStack>
          </VStack>
          <VStack width={'$1/2'}>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Data de entrada:{' '}
              </Text>
              <Text fontSize="$xs">
                {new Date(animal.entryDate).toLocaleDateString('pt-BR')}
              </Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Stataus:{' '}
              </Text>
              <Text textTransform="capitalize" fontSize="$xs">
                {animal.status}
              </Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Lote:{' '}
              </Text>
              <Text fontSize="$xs">{animal.batchs.name}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Categoria:{' '}
              </Text>
              <Text fontSize="$xs">{animal.category}</Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default CardAnimal;
