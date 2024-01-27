'use client';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import Box from '@mui/material/Box';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Analysis = () => {
  const router = useRouter();
  return <Box sx={{ color: 'text.secondary', padding: '20px' }}>서비스 준비 중</Box>;
};

export default Analysis;
