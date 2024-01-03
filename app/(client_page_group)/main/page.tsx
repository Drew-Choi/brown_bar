'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import SectionContainer from '@/components/layout/SectionContainer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Main = () => {
  const router = useRouter();
  const [intro, setIntro] = useState<boolean>(false);

  useEffect(() => {
    setIntro(true);
  }, []);

  return (
    <SectionContainer
      sx={{
        top: '50%',
        transform: 'translateY(-50%)',
        transition: '2s opacity ease',
        opacity: intro ? '1' : '0',
      }}
    >
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

        <ButtonWide
          fontSize={{ xs: '7.2vw', md: '65px' }}
          padding="8% 2%"
          onClickEvent={() => router.push('/main/find')}
        >
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

        <ButtonWide
          fontSize={{ xs: '8vw', md: '72px' }}
          padding="8% 2%"
          onClickEvent={() => router.push('/main/about')}
        >
          <Typography fontSize="inherit" fontWeight={700} lineHeight={1.2}>
            A TASTING PARTY
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
            fontWeight={700}
            alignSelf="center"
          >
            더 브라운's 시음회
          </Typography>
        </ButtonWide>
      </Container>
    </SectionContainer>
  );
};
export default Main;
