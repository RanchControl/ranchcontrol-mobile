import React from 'react';

import { Box, VStack, Text, Heading, HStack } from '@gluestack-ui/themed';
import { cnpj } from 'cpf-cnpj-validator';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CardFarmProps {
  farm: Farm;
  onPress?: () => void;
}

const CardFarm: React.FC<CardFarmProps> = ({ farm, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderColor="$borderDark100"
        bg="$light50"
        borderRadius="$lg"
        borderWidth="$1"
        my="$2"
        width={'$full'}
      >
        <VStack px="$6" pt="$4" pb="$6">
          <Heading textTransform="capitalize" size="sm">
            {farm.name}
          </Heading>
          <HStack mt="$1.5">
            <Text fontWeight="$semibold" fontSize="$xs">
              CNPJ:{' '}
            </Text>
            <Text fontSize="$xs">{cnpj.format(farm.cnpj)}</Text>
          </HStack>
          <HStack mt="$1.5">
            <Text fontWeight="$semibold" fontSize="$xs">
              Data de criação:{' '}
            </Text>
            <Text fontSize="$xs">
              {new Date(farm.createdAt).toLocaleDateString('pt-BR')}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default CardFarm;
