import { Container } from '@mui/material';
import React, { ReactNode } from 'react';
import { NavAdmin } from './NavAdmin';
import { AuthSessionProvider } from '@/providers/AuthSessionProvider';

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
          {children}
        </Container>
      </AuthSessionProvider>
    </Container>
  );
}
