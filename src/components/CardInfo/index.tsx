import React from 'react';

import { Box, VStack, Text, Heading } from '@gluestack-ui/themed';

const CardInfo: React.FC = () => {
  return (
    <Box
      borderColor="$borderLight200"
      borderRadius="$lg"
      borderWidth="$1"
      my="$4"
      overflow="hidden"
      sx={{
        '@base': {
          mx: '$5',
        },
        _dark: {
          bg: '$backgroundDark900',
          borderColor: '$borderDark800',
        },
      }}
    >
      <Box></Box>
      <VStack px="$6" pt="$4" pb="$6">
        <Text fontSize="$sm" my="$1.5">
          August 16, 2023
        </Text>
        <Heading size="sm">Fresh Orange</Heading>
        <Text my="$1.5" fontSize="$xs">
          Oranges are a great source of vitamin C, which is essential for a
          healthy immune system. Oranges are a great source of vitamin C, which
          is important for maintaining a healthy immune system.
        </Text>
        <Text my="$1.5" fontSize="$xs" isTruncated>
          Vitamin C also helps with the absorption of iron and the production of
          collagen, which supports healthy skin, teeth, and bones.
        </Text>
      </VStack>
    </Box>
  );
};

export default CardInfo;
