'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Admin = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      signIn();
    }
  }, [session, status, router]);

  return <div style={{ color: 'white' }}>adminPage</div>;
};

export default Admin;
