import React from 'react';

import { Box, HStack, Heading, Text, VStack } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';

interface CardBatchProps {
  batch: Batch;
  onPress?: () => void;
}

const CardBatch: React.FC<CardBatchProps> = ({ batch, onPress }) => {
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
          {batch.name}
        </Heading>
        <HStack px="$4" pb="$4">
          <VStack width={'$1/2'}>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Situação:{' '}
              </Text>
              <Text textTransform="capitalize" fontSize="$xs">
                {batch.situation}
              </Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Recinto:{' '}
              </Text>
              <Text fontSize="$xs">{batch.enclosureId}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Raça:{' '}
              </Text>
              <Text fontSize="$xs">{batch.breed}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Nº do brinco:{' '}
              </Text>
              <Text fontSize="$xs">{batch.earringStartNumber}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Observação:{' '}
              </Text>
              <Text isTruncated fontSize="$xs">
                {batch.observation +
                  'asdasdassssssssssssssssssssssssssssssssssssssssssssda'}
              </Text>
            </HStack>
          </VStack>
          <VStack width={'$1/2'}>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Idade:{' '}
              </Text>
              <Text textTransform="capitalize" fontSize="$xs">
                {batch.age}
              </Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Quantitade:{' '}
              </Text>
              <Text fontSize="$xs">{batch.animalQuantity}</Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Nascimento:{' '}
              </Text>
              <Text fontSize="$xs">
                {new Date(batch.bornDate).toLocaleDateString('pt-BR')}
              </Text>
            </HStack>
            <HStack mt="$1.5">
              <Text fontWeight="$semibold" fontSize="$xs">
                Média de peso:{' '}
              </Text>
              <Text fontSize="$xs">{batch.weightAverage}</Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default CardBatch;
