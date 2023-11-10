import React from 'react';

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonSpinner,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import { UseMutationResult } from 'react-query';

interface DeleteDialogProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  description: string;
  onDelete: UseMutationResult<Enclosure, unknown, void, unknown>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onToggle,
  title,
  description,
  onDelete,
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onToggle}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">{title}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm">{description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button variant="outline" action="secondary" onPress={onToggle}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              bg="$error600"
              action="negative"
              isDisabled={onDelete.isLoading}
              onPress={() => {
                onDelete.mutate();
              }}
            >
              {onDelete.isLoading && <ButtonSpinner mr="$1" />}
              <ButtonText>Deletar</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
