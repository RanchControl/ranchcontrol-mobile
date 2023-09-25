import React from 'react';

import {
  Button,
  Center,
  CheckIcon,
  Container,
  FormControl,
  Input,
  Select,
  VStack,
  WarningOutlineIcon,
} from 'native-base';

const Register: React.FC = () => {
  return (
    <Center flex={1} bg={'background'}>
      <Container width={'full'}>
        <VStack w={'full'} space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Input keyboardType="email-address" />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Nome completo</FormControl.Label>
            <Input type="text" />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Telefone</FormControl.Label>
            <Input keyboardType="number-pad" />
          </FormControl>

          <FormControl maxW="300" isRequired isInvalid>
            <FormControl.Label>Cargo</FormControl.Label>
            <Select
              accessibilityLabel="Escolha seu cargo"
              placeholder="Escolha seu cargo"
              _selectedItem={{
                bg: 'primary.600',
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
            >
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>

          <Button mt="2">ENTRAR</Button>
        </VStack>
      </Container>
    </Center>
  );
};

export default Register;
