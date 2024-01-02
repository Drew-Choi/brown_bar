'use client';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
};
