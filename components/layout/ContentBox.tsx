import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';

export const ContentBox = ({ children, sx }: { children?: ReactNode; sx?: SxProps }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'rgba(169, 84, 24, 0.09)',
        borderRadius: '10px',
        border: '1px solid #773d14',
        padding: '5px 10px',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default React.memo(ContentBox);
