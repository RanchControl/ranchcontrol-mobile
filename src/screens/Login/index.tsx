import React from 'react';

import {
  AlertCircleIcon,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Image,
  Input,
  InputField,
  KeyboardAvoidingView,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import AlertToast from '../../components/AlertToast';
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
        toast.show({
          render: () => {
            return (
              <AlertToast
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
              <AlertToast title="Erro ao realizar o login!" status="error" />
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
        <Center flex={1} bg={'$background'} p={'$4'}>
          <VStack w={'$full'} space={'md'} mt="$5">
            <Center>
              <Image
                source={require('../../assets/images/logo-no-background.png')}
                alt='Image of a logo with the name "Ranch Control"'
                sx={{
                  width: 200,
                  height: 220,
                }}
                role="img"
              />
            </Center>
            <FormControl
              isRequired
              isInvalid={!!formik.touched && !!formik.errors.username}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Username</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  value={formik.values.username}
                  onChangeText={formik.handleChange('username')}
                  onBlur={formik.handleBlur('username')}
                  placeholder="Usuário"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </Input>
              {formik.touched.username && formik.errors.username && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.username}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!formik.touched.password && !!formik.errors.password}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  placeholder="*****"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </Input>
              {formik.touched.password && formik.errors.password && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.password}
                  </FormControlErrorText>
                </FormControlError>
              )}
              <Button alignSelf="flex-end" mt="$1" variant={'link'}>
                <ButtonText
                  fontSize={'$xs'}
                  fontWeight="$medium"
                  color="$secondary500"
                >
                  Esqueceu sua senha?
                </ButtonText>
              </Button>
            </FormControl>
            <Button
              isDisabled={loginRequest.isLoading}
              mt="$2"
              onPress={() => formik.handleSubmit()}
            >
              {loginRequest.isLoading && <ButtonSpinner mr="$1" />}
              <ButtonText>ENTRAR</ButtonText>
            </Button>
            <Button
              variant="outline"
              onPress={() => navigation.navigate('Register')}
            >
              <ButtonText>Cadastre-se</ButtonText>
            </Button>
          </VStack>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
