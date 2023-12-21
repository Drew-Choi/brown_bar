import { Container, SxProps } from '@mui/material';
import React, { ReactNode } from 'react';

const SectionContainer = ({ children, sx }: { children: ReactNode; sx?: SxProps }) => {
  return (
    <Container
      disableGutters={true}
      component="section"
      sx={{ position: 'relative', width: '100%', ...sx }}
    >
      {children}
    </Container>
  );
};

export default React.memo(SectionContainer);
