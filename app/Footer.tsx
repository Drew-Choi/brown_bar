'use client';
import { Container, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

export const Footer = ({ flex = '1' }: { flex?: string }) => {
  const pathName = usePathname();

  if (pathName === '/') return;

  return (
    <Container
      component="footer"
      sx={{
        flex: flex,
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'fit-content',
        color: 'text.disabled',
        padding: '0px 10px',
        boxSizing: 'border-box',
        fontSize: { xs: '8px', sm: '10px' },
      }}
    >
      <Typography fontSize="inherit">Copyright | The Brown Bar</Typography>
      <Typography fontSize="inherit" align="right">
        Designed by Drew.C
        <br />
        SVG Designed by Freepik
      </Typography>
    </Container>
  );
};

export default React.memo(Footer);
