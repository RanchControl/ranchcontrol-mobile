import React, { forwardRef, useImperativeHandle } from 'react';

import {
  AlertCircleIcon,
  ChevronDownIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Input,
  InputField,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
} from '@gluestack-ui/themed';
import { FormikProvider, useFormik } from 'formik';
import { MaskService } from 'react-native-masked-text';
import { useQuery } from 'react-query';
import * as yup from 'yup';

import { useEnclosure } from '../../../../hooks';
import { Errors } from '../../../../utils';

interface IBatchInfoProps {
  onFinish: (data: BatchFormValues) => void;
  initialValues?: BatchFormValues;
}
const BatchInfo: React.ForwardRefRenderFunction<
  IFormStepRef,
  IBatchInfoProps
> = ({ onFinish, initialValues }, ref) => {
  const { listEnclosure } = useEnclosure();
  const formik = useFormik<BatchFormValues>({
    initialValues: {
      name: '',
      weightAverage: '',
      animalQuantity: '',
      breed: '',
      age: '',
      bornDate: '',
      observation: '',
      situation: '',
      earringStartNumber: '',
      enclosure: '',
      ...initialValues,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(Errors.required),
      weightAverage: yup.string().required(Errors.required),
    }),
    onSubmit: onFinish,
  });

  useImperativeHandle(ref, () => ({
    submit: formik.handleSubmit,
  }));

  const fetchEnclosures = useQuery('enclosures', listEnclosure);

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
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Média de peso</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Ex: 500 KG"
            value={formik.values.weightAverage}
            onChangeText={formik.handleChange('weightAverage')}
            onBlur={formik.handleBlur('weightAverage')}
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.weightAverage && formik.errors.weightAverage && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.weightAverage}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Quantidade de animais</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Quantidade de animais"
            value={formik.values.animalQuantity}
            onChangeText={formik.handleChange('animalQuantity')}
            onBlur={formik.handleBlur('animalQuantity')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.animalQuantity && formik.errors.animalQuantity && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.animalQuantity}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Raça</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Raça"
            value={formik.values.breed}
            onChangeText={formik.handleChange('breed')}
            onBlur={formik.handleBlur('breed')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.breed && formik.errors.breed && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.breed}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Idade</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Idade"
            value={formik.values.age}
            onChangeText={formik.handleChange('age')}
            onBlur={formik.handleBlur('age')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.age && formik.errors.age && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.age}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Data de nascimento</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Data de nascimento"
            value={formik.values.bornDate}
            onChangeText={(value) =>
              formik.setFieldValue(
                'bornDate',
                MaskService.toMask('datetime', value, {
                  format: 'DD/MM/YYYY',
                })
              )
            }
            onBlur={formik.handleBlur('bornDate')}
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.bornDate && formik.errors.bornDate && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.bornDate}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Observação</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Observação"
            value={formik.values.observation}
            onChangeText={formik.handleChange('observation')}
            onBlur={formik.handleBlur('observation')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.observation && formik.errors.observation && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.observation}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Situação</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Situação"
            value={formik.values.situation}
            onChangeText={formik.handleChange('situation')}
            onBlur={formik.handleBlur('situation')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.situation && formik.errors.situation && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.situation}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.weightAverage}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Número do brinco</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Número do brinco"
            value={formik.values.earringStartNumber}
            onChangeText={formik.handleChange('earringStartNumber')}
            onBlur={formik.handleBlur('earringStartNumber')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.earringStartNumber &&
          formik.errors.earringStartNumber && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {formik.errors.earringStartNumber}
              </FormControlErrorText>
            </FormControlError>
          )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.errors.enclosure && formik.touched.enclosure}
        my={'$5'}
      >
        <FormControlLabel mb="$1">
          <FormControlLabelText>Recinto</FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={formik.values.enclosure}
          onValueChange={formik.handleChange('enclosure')}
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
              {fetchEnclosures.isLoading ? (
                <Text>Loading...</Text>
              ) : (
                fetchEnclosures.data.map((enclosure) => (
                  <SelectItem
                    key={enclosure.id}
                    label={enclosure.name}
                    value={enclosure.id.toString()}
                  />
                ))
              )}
            </SelectContent>
          </SelectPortal>
        </Select>

        {formik.errors.enclosure && formik.touched.enclosure && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.enclosure}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </FormikProvider>
  );
};
export default forwardRef(BatchInfo);
