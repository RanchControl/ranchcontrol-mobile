import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import {
  Button,
  Center,
  CheckIcon,
  Container,
  FormControl,
  Image,
  Input,
  Select,
  VStack,
  WarningOutlineIcon,
  useToast,
} from 'native-base';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaskService } from 'react-native-masked-text';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import AlertToast from '../../components/AlertToast';
import { useAuthentication } from '../../hooks';
import { Enums, Errors } from '../../utils';

type RegisterProps = NativeStackScreenProps<PublicStackParamList, 'Register'>;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const toast = useToast();
  const { signUp } = useAuthentication();
  const createUserRequest = useMutation(
    (values: SignUpFormValues) => signUp(values),
    {
      onSuccess: () => {
        toast.show({
          title: 'Usuário cadastrado com sucesso',
          variant: 'solid',
          duration: 3000,
          render: () => (
            <AlertToast
              status="success"
              title="Usuário cadastrado com sucesso!"
            />
          ),
        });
        navigation.navigate('Login');
      },
      onError: () => {
        toast.show({
          duration: 3000,
          render: () => (
            <AlertToast status="error" title="Erro ao cadastrar o usuário" />
          ),
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      role: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(Errors.required),
      password: Yup.string().required(Errors.required),
      fullName: Yup.string().required(Errors.required),
      phoneNumber: Yup.string().required(Errors.required),
      role: Yup.string().required(Errors.required),
    }),
    onSubmit: (values) => {
      createUserRequest.mutateAsync(values);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Center flex={1} bg={'background'}>
          <Container width={'full'}>
            <VStack w={'full'} space={3} mt={5}>
              <Center>
                <Image
                  source={require('../../assets/images/logo-no-background.png')}
                  width="100"
                  height="112"
                  alt='Image of a logo with the name "Ranch Control"'
                />
              </Center>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.username && formik.touched.username}
              >
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  placeholder="username"
                  value={formik.values.username}
                  onChangeText={formik.handleChange('username')}
                  onBlur={formik.handleBlur('username')}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {formik.errors.username}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  placeholder="******"
                  type="password"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {formik.errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.fullName && formik.touched.fullName}
              >
                <FormControl.Label>Nome completo</FormControl.Label>
                <Input
                  value={formik.values.fullName}
                  onChangeText={formik.handleChange('fullName')}
                  onBlur={formik.handleBlur('fullName')}
                  type="text"
                  placeholder="Insira seu nome"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {formik.errors.fullName}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  !!formik.errors.phoneNumber && formik.touched.phoneNumber
                }
              >
                <FormControl.Label>Telefone</FormControl.Label>
                <Input
                  value={formik.values.phoneNumber}
                  maxLength={15}
                  onChangeText={(value) => {
                    formik.setFieldValue(
                      'phoneNumber',
                      MaskService.toMask('cel-phone', value, {
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                      })
                    );
                  }}
                  onBlur={formik.handleBlur('phoneNumber')}
                  placeholder="(84) 98888-8888"
                  keyboardType="number-pad"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {formik.errors.phoneNumber}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!formik.errors.role && formik.touched.role}
              >
                <FormControl.Label>Cargo</FormControl.Label>
                <Select
                  accessibilityLabel="Escolha seu cargo"
                  placeholder="Escolha seu cargo"
                  _selectedItem={{
                    bg: 'primary.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  selectedValue={formik.values.role}
                  onValueChange={formik.handleChange('role')}
                >
                  {Object.values(Enums.ERole).map((role) => (
                    <Select.Item
                      key={role}
                      label={Enums.ERoleMap[role]}
                      value={role}
                    />
                  ))}
                </Select>
                {formik.errors.role && formik.touched.role && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {formik.errors.role}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <Button
                isLoading={createUserRequest.isLoading}
                mt="2"
                onPress={() => formik.handleSubmit()}
              >
                ENTRAR
              </Button>
            </VStack>
          </Container>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
