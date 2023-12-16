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

import { useBatch } from '../../../../hooks';
import { Errors } from '../../../../utils';

interface IAnimalInfoProps {
  onFinish: (data: AnimalFormValues) => void;
  initialValues?: AnimalFormValues;
}

const AnimalInfo: React.ForwardRefRenderFunction<
  IFormStepRef,
  IAnimalInfoProps
> = ({ onFinish, initialValues }, ref) => {
  const { listBatch } = useBatch();

  const formik = useFormik<AnimalFormValues>({
    initialValues: {
      name: '',
      number: '',
      sex: '',
      breed: '',
      bornDate: '',
      bornWheight: '',
      entryDate: '',
      entryWheight: '',
      weaningDate: '',
      fitnessDate: '',
      type: '',
      weight: '',
      status: '',
      category: '',
      prefix: '',
      suffix: '',
      batch: '',
      ...initialValues,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(Errors.required),
    }),
    onSubmit: onFinish,
  });

  useImperativeHandle(ref, () => ({
    submit: formik.handleSubmit,
  }));

  const fetchBatchs = useQuery('batchs', listBatch);

  return (
    <FormikProvider value={formik}>
      <FormControl
        isRequired
        isInvalid={!!formik.touched.number && !!formik.errors.name}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Nome do animal</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do animal"
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
        isInvalid={!!formik.touched.number && !!formik.errors.number}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Número</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Ex: 500 KG"
            value={formik.values.number}
            onChangeText={formik.handleChange('number')}
            onBlur={formik.handleBlur('number')}
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.number && formik.errors.number && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.number}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched.sex && !!formik.errors.sex}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Sexo</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Sexo"
            value={formik.values.sex}
            onChangeText={formik.handleChange('sex')}
            onBlur={formik.handleBlur('sex')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.sex && formik.errors.sex && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.sex}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched.breed && !!formik.errors.breed}
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
        isInvalid={!!formik.touched.bornWheight && !!formik.errors.bornWheight}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Peso no nascimento</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Peso no nascimento"
            value={formik.values.bornWheight}
            onChangeText={formik.handleChange('bornWheight')}
            onBlur={formik.handleBlur('bornWheight')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.bornWheight && formik.errors.bornWheight && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.bornWheight}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!!formik.touched && !!formik.errors.bornDate}
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
        isInvalid={!!formik.touched.entryDate && !!formik.errors.entryDate}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Data de entrada</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Data de nascimento"
            value={formik.values.entryDate}
            onChangeText={(value) =>
              formik.setFieldValue(
                'entryDate',
                MaskService.toMask('datetime', value, {
                  format: 'DD/MM/YYYY',
                })
              )
            }
            onBlur={formik.handleBlur('entryDate')}
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.entryDate && formik.errors.entryDate && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.entryDate}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <FormControl
        isRequired
        isInvalid={
          !!formik.touched.entryWheight && !!formik.errors.entryWheight
        }
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Peso de entrada</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Peso de entrada"
            value={formik.values.entryWheight}
            onChangeText={formik.handleChange('entryWheight')}
            onBlur={formik.handleBlur('entryWheight')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.entryWheight && formik.errors.entryWheight && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.entryWheight}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.weaningDate && !!formik.errors.weaningDate}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Data de desmame</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Número do brinco"
            value={formik.values.weaningDate}
            onChangeText={formik.handleChange('weaningDate')}
            onBlur={formik.handleBlur('weaningDate')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.weaningDate && formik.errors.weaningDate && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.weaningDate}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.fitnessDate && !!formik.errors.fitnessDate}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Data fitness</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Data fitness"
            value={formik.values.fitnessDate}
            onChangeText={(value) =>
              formik.setFieldValue(
                'fitnessDate',
                MaskService.toMask('datetime', value, {
                  format: 'DD/MM/YYYY',
                })
              )
            }
            onBlur={formik.handleBlur('fitnessDate')}
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.fitnessDate && formik.errors.fitnessDate && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.fitnessDate}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.type && !!formik.errors.type}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Tipo</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Tipo"
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

      <FormControl
        isRequired
        isInvalid={!!formik.touched.weight && !!formik.errors.weight}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Peso</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Peso"
            value={formik.values.weight}
            onChangeText={formik.handleChange('weight')}
            onBlur={formik.handleBlur('weight')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.weight && formik.errors.weight && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.weight}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.status && !!formik.errors.status}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Status</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Peso"
            value={formik.values.status}
            onChangeText={formik.handleChange('status')}
            onBlur={formik.handleBlur('status')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.status && formik.errors.status && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.status}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.category && !!formik.errors.category}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Categoria</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Categoria"
            value={formik.values.category}
            onChangeText={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Input>

        {formik.touched.category && formik.errors.category && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {formik.errors.category}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.prefix && !!formik.errors.prefix}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Prefixo</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Prefixo"
            value={formik.values.prefix}
            onChangeText={formik.handleChange('prefix')}
            onBlur={formik.handleBlur('prefix')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.prefix && formik.errors.prefix && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.prefix}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.touched.suffix && !!formik.errors.suffix}
        mt={'$5'}
      >
        <FormControlLabel>
          <FormControlLabelText>Sufixo</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            placeholder="Sufixo"
            value={formik.values.suffix}
            onChangeText={formik.handleChange('suffix')}
            onBlur={formik.handleBlur('suffix')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </Input>

        {formik.touched.suffix && formik.errors.suffix && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.suffix}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!formik.errors.batch && formik.touched.batch}
        my={'$5'}
      >
        <FormControlLabel mb="$1">
          <FormControlLabelText>Lote</FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={formik.values.batch}
          onValueChange={formik.handleChange('batch')}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Selecione a opção" />
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
              {fetchBatchs.isLoading ? (
                <Text>Loading...</Text>
              ) : (
                fetchBatchs.data.map((batch) => (
                  <SelectItem
                    key={batch.id}
                    label={batch.name}
                    value={batch.id.toString()}
                  />
                ))
              )}
            </SelectContent>
          </SelectPortal>
        </Select>

        {formik.errors.batch && formik.touched.batch && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.batch}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </FormikProvider>
  );
};

export default forwardRef(AnimalInfo);
