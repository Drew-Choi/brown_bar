'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const StartAdmin = () => {
  const session = useSession();

  console.log(session);

  return <div style={{ color: 'white', padding: '50px' }}>StartAdmin</div>;
};

export default StartAdmin;
