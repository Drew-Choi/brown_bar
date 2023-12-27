'use client';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import InputPassword from '@/components/inputs/InputPassword';
import InputText from '@/components/inputs/InputText';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef } from 'react';

const Join = () => {
  const router = useRouter();
  const { openPopup } = usePopup();

  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const { mutate: joinApi } = useMutationInstance({
    apiEndPoint: USE_MUTATE_POINT.JOIN,
    apiMethod: 'post',
    onErrorFn: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        const status = error.response?.status;

        status === 409
          ? openPopup({ title: '오류', content: message })
          : openPopup({ title: '오류', content: '다시 시도해주세요.' });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
    onSuccessFn: (response) => {
      openPopup({ title: '!환영!', content: response.message });
      router.push('/admin');
    },
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameRef.current?.value)
      return openPopup({ title: '오류', content: '이름을 입력해주세요.' });

    if (!idRef.current?.value)
      return openPopup({ title: '오류', content: '아이디를 입력해주세요.' });

    if (!passwordRef.current?.value)
      return openPopup({ title: '오류', content: '패스워드를 입력해주세요.' });

    if (!passwordCheckRef.current?.value)
      return openPopup({ title: '오류', content: '비밀번호를 한번 더 입력해주세요.' });

    if (
      passwordRef.current?.value &&
      passwordCheckRef.current?.value &&
      passwordCheckRef.current?.value !== passwordRef.current?.value
    )
      return openPopup({ title: '오류', content: '비밀번호가 일치하지 않습니다.' });

    const finalData = {
      name: nameRef.current?.value,
      id: idRef.current?.value,
      password: passwordRef.current?.value,
    };

    joinApi({ apiBody: finalData });
  };

  return (
    <Box
      maxWidth="sm"
      sx={{
        position: 'relative',
        margin: 'auto',
        padding: '30px',
        boxSizing: 'border-box',
        top: '45%',
        transform: 'translateY(-50%)',
      }}
    >
      <form onSubmit={submitHandler}>
        <InputText
          title="Name"
          ref={nameRef}
          conSx={{ marginBottom: '20px' }}
          textSx={{ color: 'text.secondary', fontSize: '24px' }}
        />
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
        <InputPassword
          ref={passwordCheckRef}
          title="Check Password"
          conSx={{ marginBottom: '20px' }}
          textSx={{ color: 'text.secondary', fontSize: '22px' }}
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
            취소
          </ButtonNomal>
          <ButtonNomal
            type="submit"
            color="secondary"
            sx={{ width: '100%', fontSize: '16px', fontWeight: '600', color: 'text.primary' }}
          >
            완료
          </ButtonNomal>
        </Box>
      </form>
    </Box>
  );
};

export default Join;
