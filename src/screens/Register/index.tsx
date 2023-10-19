import React from 'react';

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
} from 'native-base';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

import { Enums, Errors } from '../../utils';

const Register: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      role: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email(Errors.email).required(Errors.required),
      password: Yup.string().required(Errors.required),
      name: Yup.string().required(Errors.required),
      phone: Yup.string().required(Errors.required),
      role: Yup.string().required(Errors.required),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  placeholder="email@email.com"
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  keyboardType="email-address"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {formik.errors.email}
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
                isInvalid={!!formik.errors.name && formik.touched.name}
              >
                <FormControl.Label>Nome completo</FormControl.Label>
                <Input
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  type="text"
                  placeholder="Insira seu nome"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {formik.errors.name}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.phone && formik.touched.phone}
              >
                <FormControl.Label>Telefone</FormControl.Label>
                <Input
                  value={formik.values.phone}
                  onChangeText={formik.handleChange('phone')}
                  onBlur={formik.handleBlur('phone')}
                  placeholder="(84) 98888-8888"
                  keyboardType="number-pad"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {formik.errors.phone}
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

              <Button mt="2" onPress={() => formik.handleSubmit()}>
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
