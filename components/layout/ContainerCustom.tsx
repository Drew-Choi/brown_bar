'use client';
import React, { ReactNode } from 'react';
import { Container, SxProps, Theme } from '@mui/material';

export const ContainerCustom = ({
  children,
  sx,
  maxWidth,
}: {
  children?: ReactNode;
  sx?: SxProps<Theme>;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}) => {
  return (
    <Container maxWidth={maxWidth} sx={{ ...sx }}>
      {children}
    </Container>
  );
};
export default React.memo(ContainerCustom);
