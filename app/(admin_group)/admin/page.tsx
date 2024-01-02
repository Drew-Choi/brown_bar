'use client';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { useIsLogin } from '@/hook/useIsLogin/useIsLogin';
import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react';

const StartAdmin = () => {
  return <div style={{ color: 'white', padding: '50px' }}>시작</div>;
};

export default StartAdmin;
