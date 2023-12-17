import React from 'react';

import { Alert, ToastTitle } from '@gluestack-ui/themed';

interface AlertToastProps {
  title: string;
  status: 'error' | 'success' | 'warning' | 'info';
}

const AlertToast: React.FC<AlertToastProps> = ({ status, title }) => {
  return (
    <Alert mt={'$10'} action={status} variant="solid">
      <ToastTitle>{title}</ToastTitle>
    </Alert>
  );
};

export default AlertToast;
