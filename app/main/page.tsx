'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import { Container, Typography, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`;

const Main = () => {
  const router = useRouter();

  return (
    <MainContainer>
      <Container
        sx={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '30px',
        }}
      >
        <ButtonWide
          fontSize={{ xs: '11vw', md: '100px' }}
          onClickEvent={() => router.push('/main/menu')}
        >
          <Typography fontSize="inherit" fontWeight={700} lineHeight={1}>
            MENU
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
            fontWeight={700}
            alignSelf="center"
          >
            메뉴판
          </Typography>
        </ButtonWide>

        <ButtonWide fontSize={{ xs: '7.2vw', md: '65px' }} padding="8% 2%">
          <Typography fontSize="inherit" fontWeight={700} lineHeight={1.3}>
            FINDING MY TASTE
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
            fontWeight={700}
            alignSelf="center"
          >
            내 취향 찾기
          </Typography>
        </ButtonWide>

        <ButtonWide fontSize={{ xs: '8vw', md: '72px' }} padding="8% 2%">
          <Typography fontSize="inherit" fontWeight={700} lineHeight={1.2}>
            ABOUT ALCOHOL
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
            fontWeight={700}
            alignSelf="center"
          >
            술에 대하여
          </Typography>
        </ButtonWide>
      </Container>
    </MainContainer>
  );
};
export default Main;
