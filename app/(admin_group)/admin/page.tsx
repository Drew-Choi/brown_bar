'use client';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { useIsLogin } from '@/hook/useIsLogin/useIsLogin';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const StartAdmin = () => {
  const { openPopup } = usePopup();
  useIsLogin();

  return (
    <div style={{ color: 'white', padding: '50px' }}>
      <ButtonNomal
        onClickEvent={() => {
          signIn('kakao', {
            redirect: true,
            callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/admin`,
          });
        }}
      >
        로그인
      </ButtonNomal>
    </div>
  );
};

export default StartAdmin;
