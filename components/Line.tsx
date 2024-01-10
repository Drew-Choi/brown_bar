import { COLORS } from '@/asset/style';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const Line = ({
  width = '100%',
  height = '1px',
  margin = '0 0 0 0',
  sx,
}: {
  height?: string;
  margin?: string;
  width?: string;
  sx?: SxProps;
}) => {
  return <Box sx={{ width, height, margin, backgroundColor: COLORS.divider, ...sx }} />;
};

export default React.memo(Line);
