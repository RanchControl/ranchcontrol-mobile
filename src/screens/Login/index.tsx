import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Center,
  Container,
  FormControl,
  Image,
  Input,
  VStack,
  useToast,
} from 'native-base';

type LoginProps = NativeStackScreenProps<PublicStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const toast = useToast();
  return (
    <Center flex={1} bg={'background'}>
      <Container width={'full'}>
        <VStack w={'full'} space={3} mt="5">
          <Center>
            <Image
              source={require('../../assets/images/logo-no-background.png')}
              width="160"
              height="172"
              alt='Image of a logo with the name "Ranch Control"'
            />
          </Center>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Button
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'secondary.500',
              }}
              alignSelf="flex-end"
              mt="1"
              variant={'link'}
            >
              Esqueceu sua senha?
            </Button>
          </FormControl>
          <Button
            mt="2"
            onPress={() =>
              toast.show({
                title: 'Login realizado com sucesso!',
                variant: 'success',
                duration: 3000,
              })
            }
          >
            ENTRAR
          </Button>
          <Button
            variant={'ghost'}
            onPress={() => navigation.navigate('Register')}
          >
            Cadastre-se
          </Button>
        </VStack>
      </Container>
    </Center>
  );
};

export default Login;
