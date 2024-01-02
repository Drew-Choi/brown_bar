'use client';
import React, { FormEvent, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import InputText from '@/components/inputs/InputText';
import InputPassword from '@/components/inputs/InputPassword';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePopup } from '@/hook/usePopup/usePopup';
import { signIn } from 'next-auth/react';

const Login = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const search = useSearchParams();
  const error = search.get('error');
  const { openPopup } = usePopup();

  useEffect(() => {
    const rtCheck = localStorage.getItem('rt');
    if (rtCheck) {
      openPopup({ title: '오류', content: '현재 로그인 상태입니다.' });
      return router.replace('/admin');
    }
  }, []);

  useEffect(() => {
    if (error)
      return openPopup({
        title: '로그인 실패',
        content: '아이디와 비밀번호를 정확히 입력해주세요.',
      });
  }, [search, error]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!idRef.current?.value)
      return openPopup({ title: '오류', content: '아이디를 입력해주세요.' });

    if (!passwordRef.current?.value)
      return openPopup({ title: '오류', content: '패스워드를 입력해주세요.' });

    await signIn('credentials', {
      redirect: true,
      id: idRef.current?.value,
      password: passwordRef.current?.value,
      callbackUrl: process.env.NEXT_PUBLIC_AUTH_URL + '/admin',
    });
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
      <form onSubmit={submitHandler}>
        <InputText
          ref={idRef}
          conSx={{ marginBottom: '20px' }}
          textSx={{ color: 'text.secondary', fontSize: '24px' }}
        />
        <InputPassword
          ref={passwordRef}
          conSx={{ marginBottom: '20px' }}
          textSx={{ color: 'text.secondary', fontSize: '24px' }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
            margin: '50px 0',
          }}
        >
          <ButtonNomal
            color="warning"
            sx={{ width: '100%', fontSize: '16px', fontWeight: '600', color: 'text.primary' }}
            onClickEvent={() => router.back()}
          >
            뒤로가기
          </ButtonNomal>
          <ButtonNomal
            type="submit"
            color="secondary"
            sx={{ width: '100%', fontSize: '16px', fontWeight: '600', color: 'text.primary' }}
          >
            로그인
          </ButtonNomal>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
