'use client';
import React, { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

export const BoxCustom = ({ children, sx }: { children?: ReactNode; sx?: SxProps<Theme> }) => {
  return <Box sx={{ ...sx }}>{children}</Box>;
};
export default React.memo(BoxCustom);
