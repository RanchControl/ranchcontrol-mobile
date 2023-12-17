import React, { forwardRef, useImperativeHandle } from 'react';

import {
  AlertCircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import { cnpj } from 'cpf-cnpj-validator';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

import { Errors } from '../../../utils';

interface IFarmInfoProps {
  onFinish: (data: FarmFormValues) => void;
  initialValues?: FarmFormValues;
}
const FarmInfo: React.ForwardRefRenderFunction<IFormStepRef, IFarmInfoProps> = (
  { onFinish, initialValues },
  ref
) => {
  const formik = useFormik<FarmFormValues>({
    initialValues: {
      name: '',
      address: '',
      cnpj: '',
      ...initialValues,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(Errors.required),
      address: yup.string().required(Errors.required),
      cnpj: yup.string().required(Errors.required),
    }),
    onSubmit: onFinish,
  });

  useImperativeHandle(ref, () => ({
    submit: formik.handleSubmit,
  }));

  return (
    <FormikProvider value={formik}>
      <FormControl
        isRequired
        isInvalid={!!formik.touched.name && !!formik.errors.name}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Nome da fazenda</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome da fazenda"
          />
        </Input>

        {formik.touched.name && formik.errors.name && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.name}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.address && !!formik.errors.address}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Endereço da fazenda</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Endereço da fazenda"
            value={formik.values.address}
            onChangeText={formik.handleChange('address')}
            onBlur={formik.handleBlur('address')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.address && formik.errors.address && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.address}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched.cnpj && !!formik.errors.cnpj}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>CNPJ</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="CNPJ"
            value={formik.values.cnpj}
            onChangeText={(event) =>
              formik.setFieldValue('cnpj', cnpj.format(event))
            }
            onBlur={formik.handleBlur('cnpj')}
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.cnpj && formik.errors.cnpj && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.cnpj}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </FormikProvider>
  );
};
export default forwardRef(FarmInfo);
