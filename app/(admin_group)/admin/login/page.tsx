'use client';
import React, { FormEvent, useRef } from 'react';
import Box from '@mui/material/Box';
import InputText from '@/components/inputs/InputText';
import InputPassword from '@/components/inputs/InputPassword';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { useRouter } from 'next/navigation';
import { usePopup } from '@/hook/usePopup/usePopup';
import { signIn } from 'next-auth/react';

const Login = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { openPopup } = usePopup();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!idRef.current?.value)
      return openPopup({ title: '오류', content: '아이디를 입력해주세요.' });

    if (!passwordRef.current?.value)
      return openPopup({ title: '오류', content: '패스워드를 입력해주세요.' });

    try {
      const result = await signIn('credentials', {
        redirect: false,
        id: idRef.current?.value,
        password: passwordRef.current?.value,
      });

      router.replace('/admin');

      if (result?.error) {
        openPopup({ title: '로그인 실패', content: '아이디 또는 비밀번호가 잘못되었습니다.' });
      } else {
        router.push('/admin');
      }
    } catch (error) {
      console.error(error);
      openPopup({ title: '오류', content: '서버오류\n다시 시도해주세요.' });
    }
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
