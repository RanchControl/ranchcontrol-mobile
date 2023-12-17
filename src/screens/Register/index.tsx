import React from 'react';

import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Select,
  VStack,
  Image,
  InputField,
  AlertCircleIcon,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  useToast,
  FormControlLabel,
  FormControlLabelText,
  ButtonText,
  SelectItem,
  ChevronDownIcon,
  Icon,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
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
          placement: 'top',
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
        <Center flex={1} bg={'$background'} p={'$5'}>
          <Box width={'$full'}>
            <VStack w={'$full'} space={'md'} mt={5}>
              <Center>
                <Image
                  source={require('../../assets/images/logo-no-background.png')}
                  alt='Image of a logo with the name "Ranch Control"'
                  sx={{
                    width: 70,
                    height: 80,
                  }}
                />
              </Center>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.username && formik.touched.username}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Username</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.username}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    placeholder="******"
                    type="password"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.password}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.fullName && formik.touched.fullName}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Nome completo</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={formik.values.fullName}
                    onChangeText={formik.handleChange('fullName')}
                    onBlur={formik.handleBlur('fullName')}
                    type="text"
                    placeholder="Insira seu nome"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.fullName}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  !!formik.errors.phoneNumber && formik.touched.phoneNumber
                }
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Telefone</FormControlLabelText>
                </FormControlLabel>

                <Input>
                  <InputField
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
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {formik.errors.phoneNumber}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!formik.errors.role && formik.touched.role}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Cargo</FormControlLabelText>
                </FormControlLabel>
                <Select
                  selectedValue={formik.values.role}
                  onValueChange={formik.handleChange('role')}
                >
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select option" />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {Object.values(Enums.ERole).map((role) => (
                        <SelectItem
                          key={role}
                          label={Enums.ERoleMap[role]}
                          value={role}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>

                {formik.errors.role && formik.touched.role && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {formik.errors.role}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              <Button mt="$2" onPress={() => formik.handleSubmit()}>
                <ButtonText>CADASTRAR</ButtonText>
              </Button>
            </VStack>
          </Box>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
