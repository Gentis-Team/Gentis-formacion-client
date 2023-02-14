import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

const Message = ({
  children,
  title,
  type,
  ...otherAlertProps
}) => {
  return (
    <Alert {...otherAlertProps} severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
};

export default Message;
