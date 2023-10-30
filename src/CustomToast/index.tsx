import React from 'react';

import {
  CloseIcon,
  HStack,
  IconButton,
  VStack,
  Text,
  Alert,
} from 'native-base';

interface CustomToastProps {
  status: 'success' | 'error' | 'warning' | 'info';
  title: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ status, title }) => {
  return (
    <Alert status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {title}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'coolGray.600',
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default CustomToast;
