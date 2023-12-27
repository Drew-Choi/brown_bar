'use client';
import InputPassword from '@/components/inputs/InputPassword';
import InputText from '@/components/inputs/InputText';
import { Box } from '@mui/material';
import React from 'react';

const Join = () => {
  return (
    <Box maxWidth="sm" sx={{ margin: 'auto', padding: '30px', boxSizing: 'border-box' }}>
      <InputText
        title="Name"
        conSx={{ marginBottom: '20px' }}
        textSx={{ color: 'text.secondary', fontSize: '24px' }}
      />
      <InputText
        conSx={{ marginBottom: '20px' }}
        textSx={{ color: 'text.secondary', fontSize: '24px' }}
      />
      <InputPassword
        conSx={{ marginBottom: '20px' }}
        textSx={{ color: 'text.secondary', fontSize: '24px' }}
      />
      <InputPassword
        title="Check Password"
        conSx={{ marginBottom: '20px' }}
        textSx={{ color: 'text.secondary', fontSize: '22px' }}
      />
    </Box>
  );
};

export default Join;
