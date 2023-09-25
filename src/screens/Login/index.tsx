import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import {
  Button,
  Center,
  Container,
  FormControl,
  Image,
  Input,
  VStack,
  WarningOutlineIcon,
  useToast,
} from 'native-base';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { useAuth } from '../../contexts/Auth';
import { useAuthentication } from '../../hooks';
import { Errors } from '../../utils';

type LoginProps = NativeStackScreenProps<PublicStackParamList, 'Login'>;

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const toast = useToast();
  const { performLogin } = useAuthentication();
  const { saveUserData, saveTokens } = useAuth();

  const loginRequest = useMutation(
    async ({ username, password }: LoginForm) =>
      performLogin(username, password),
    {
      onSuccess: async (data) => {
        await saveTokens(data.token);
        await saveUserData(data.user);
        navigation.reset({
          index: 0,
          routes: [{ name: 'PrivateStack' }],
        });
      },
      onError: () => {
        toast.show({
          title: 'Erro ao realizar login',
          variant: 'error',
          duration: 3000,
        });
      },
    }
  );

  const formik = useFormik<LoginForm>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(Errors.required),
      password: yup.string().required(Errors.required),
    }),
    onSubmit: (values) => loginRequest.mutate(values),
  });

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
          <FormControl
            isRequired
            isInvalid={!!formik.touched && !!formik.errors.username}
          >
            <FormControl.Label>Username</FormControl.Label>
            <Input
              value={formik.values.username}
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              placeholder="Usuário"
              autoCorrect={false}
              autoCapitalize="none"
            />
            {formik.touched.username && formik.errors.username && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {formik.errors.username}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!formik.touched.password && !!formik.errors.password}
          >
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              type="password"
            />
            {formik.touched.password && formik.errors.password && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {formik.errors.password}
              </FormControl.ErrorMessage>
            )}
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
            isLoading={loginRequest.isLoading}
            mt="2"
            onPress={() => formik.handleSubmit()}
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
