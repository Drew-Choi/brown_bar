import { Button, SxProps } from '@mui/material';
import React, { MouseEvent, ReactNode } from 'react';

const ButtonNomal = ({
  children,
  sx,
  onClickEvent,
  color = 'info',
  type = 'button',
}: {
  children: ReactNode;
  sx?: SxProps;
  onClickEvent?: (e?: MouseEvent<HTMLButtonElement>) => void;
  color?: 'inherit' | 'info' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <Button type={type} variant="contained" color={color} sx={{ ...sx }} onClick={onClickEvent}>
      {children}
    </Button>
  );
};

export default React.memo(ButtonNomal);
