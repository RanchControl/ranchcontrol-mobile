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
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

import { Errors } from '../../../../utils';

interface IEnclosureInfoProps {
  onFinish: (data: EnclosureFormValues) => void;
  initialValues?: EnclosureFormValues;
}
const EnclosureInfo: React.ForwardRefRenderFunction<
  IFormStepRef,
  IEnclosureInfoProps
> = ({ onFinish, initialValues }, ref) => {
  const formik = useFormik<EnclosureFormValues>({
    initialValues: {
      name: '',
      type: '',
      ...initialValues,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(Errors.required),
      type: yup.string().required(Errors.required),
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
        isInvalid={!!formik.touched && !!formik.errors.name}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Nome do recinto</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do recinto"
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
        isInvalid={!!formik.touched && !!formik.errors.type}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Tipo do recinto</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Tipo do recinto"
            value={formik.values.type}
            onChangeText={formik.handleChange('type')}
            onBlur={formik.handleBlur('type')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.type && formik.errors.type && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.type}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </FormikProvider>
  );
};
export default forwardRef(EnclosureInfo);
