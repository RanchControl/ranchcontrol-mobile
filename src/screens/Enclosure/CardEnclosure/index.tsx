import React from 'react';

import { Box, HStack, Heading, Text, VStack } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

interface CardAnimalProps {
  enclosure: Enclosure;
  onPress?: () => void;
}

const CardEnclosure: React.FC<CardAnimalProps> = ({ enclosure, onPress }) => {
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
            {enclosure.name}
          </Heading>
          <HStack mt="$1.5">
            <Text fontWeight="$semibold" fontSize="$xs">
              Tipo:{' '}
            </Text>
            <Text textTransform="capitalize" fontSize="$xs">
              {enclosure.type}
            </Text>
          </HStack>
          <HStack mt="$1.5">
            <Text fontWeight="$semibold" fontSize="$xs">
              Fazenda:{' '}
            </Text>
            <Text fontSize="$xs">{enclosure.farmId}</Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default CardEnclosure;
