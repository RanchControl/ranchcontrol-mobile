import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import {
  Button,
  Center,
  Container,
  FormControl,
  Icon,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
  VStack,
  WarningOutlineIcon,
  useDisclose,
  useToast,
} from 'native-base';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import CustomToast from '../../CustomToast';
import { useAuth } from '../../contexts/Auth';
import { useAuthentication } from '../../hooks';
import { Errors } from '../../utils';

type LoginProps = NativeStackScreenProps<PublicStackParamList, 'Login'>;

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { isOpen, onToggle } = useDisclose();
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
        toast.show({
          render: () => {
            return (
              <CustomToast
                title="Login realizado com sucesso!"
                status="success"
              />
            );
          },
          placement: 'top',
        });
      },
      onError: () => {
        toast.show({
          render: () => {
            return (
              <CustomToast title="Erro ao realizar o login!" status="error" />
            );
          },
          placement: 'top',
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                isInvalid={
                  !!formik.touched.password && !!formik.errors.password
                }
              >
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  placeholder="*****"
                  autoCorrect={false}
                  autoCapitalize="none"
                  type={isOpen ? 'text' : 'password'}
                  InputRightElement={
                    <Pressable onPress={onToggle}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={isOpen ? 'visibility' : 'visibility-off'}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
