import Container from '@mui/material/Container';
import React, { ReactNode } from 'react';
import { NavAdmin } from './NavAdmin';
import { AuthSessionProvider } from '@/providers/AuthSessionProvider';
import Spinner from '@/components/spinner/Spinner';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      disableGutters={true}
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <AuthSessionProvider>
        <NavAdmin />
        <Container component="section" disableGutters={true} sx={{ position: 'relative' }}>
          <Spinner width="100%" height="100%" position="absolute" top="35%" />
          {children}
        </Container>
      </AuthSessionProvider>
    </Container>
  );
}
