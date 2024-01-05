import Container from '@mui/material/Container';
import React, { ReactNode } from 'react';

const WholeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      maxWidth="md"
      disableGutters={true}
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Container>
  );
};

export default WholeLayout;
