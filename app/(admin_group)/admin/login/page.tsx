'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { usePopup } from '@/hook/usePopup/usePopup';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Typography from '@mui/material/Typography';

const Login = () => {
  const { openPopup } = usePopup();
  const search = useSearchParams();
  const error = search.get('error');

  useEffect(() => {
    if (error === 'AccessDenied')
      return openPopup({
        title: '로그인 오류',
        content: (
          <>
            <span>관리자 권한이 없거나</span> <br /> <span>잘못된 로그인입니다.</span>
          </>
        ),
      });
  }, [error]);

  const submitHandler = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/admin',
    });

    return;
  };

  return (
    <Box
      maxWidth="sm"
      sx={{
        position: 'relative',
        margin: 'auto',
        padding: '30px',
        boxSizing: 'border-box',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <Typography color="text.secondary" textAlign="center" fontSize="14px" marginBottom={2}>
        관리자 페이지는 로그인이 필수입니다.
      </Typography>
      <Box sx={{ width: '300px', cursor: 'pointer', margin: 'auto' }} onClick={submitHandler}>
        <Image
          priority
          style={{ width: '100%', height: 'auto' }}
          src="/img/kakao_login_img.png"
          alt="카카오로그인아이콘"
          width={250}
          height={10}
        />
      </Box>
    </Box>
  );
};

export default Login;
