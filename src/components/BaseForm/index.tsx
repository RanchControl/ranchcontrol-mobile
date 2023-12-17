import React, { useCallback, useState } from 'react';

import {
  Button,
  ButtonText,
  HStack,
  Spinner,
  useToast,
} from '@gluestack-ui/themed';
import { Platform, ScrollView } from 'react-native';
import { UseMutationResult } from 'react-query';

import AlertToast from '../AlertToast';
import { Container, Content, KeyboardAvoidingView, TopContent } from './styles';

interface IBaseFormProps {
  steps: Array<IStep>;
  createRequest: UseMutationResult<any, unknown, any, unknown>;
  title: string;
  initialValues?: any;
}

const BaseForm: React.FC<IBaseFormProps> = ({
  steps,
  createRequest,
  initialValues,
}) => {
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<any>(initialValues);

  const handleSubmit = useCallback(
    async <Type,>(data: Type) => {
      const newForm = { ...form, ...data };
      setForm(newForm);
      if (currentStep !== steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        try {
          await createRequest.mutateAsync(newForm);
        } catch (error: any) {
          toast.show({
            render: () => (
              <AlertToast status={'error'} title={'Aconteceu algo de errado'} />
            ),
          });
        }
      }
    },
    [createRequest, currentStep, form, steps.length]
  );

  const renderCurrentStep = () => {
    const step = steps[currentStep];

    return (
      <step.component
        ref={step.ref}
        initialValues={form}
        onFinish={handleSubmit}
        setCurrentStep={setCurrentStep}
        {...step.props}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Content>
            <TopContent>{renderCurrentStep()}</TopContent>

            {createRequest.isLoading ? (
              <Spinner />
            ) : (
              <HStack justifyContent="center" space="md">
                {currentStep !== 0 && (
                  <Button
                    width={'50%'}
                    variant="outline"
                    onPress={() => setCurrentStep(currentStep - 1)}
                  >
                    <ButtonText>Voltar</ButtonText>
                  </Button>
                )}
                <Button
                  width={'50%'}
                  variant="solid"
                  onPress={() => steps[currentStep].ref.current?.submit()}
                >
                  <ButtonText>
                    {currentStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
                  </ButtonText>
                </Button>
              </HStack>
            )}
          </Content>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default BaseForm;
