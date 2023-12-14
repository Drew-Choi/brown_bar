'use client';
import { Button, Container, Typography, styled } from '@mui/material';
import React from 'react';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`;

export default function Home() {
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
          gap: '20px',
        }}
      >
        <Button
          color="warning"
          variant="contained"
          sx={{
            fontWeight: '700',
            fontSize: { xs: '11vw', md: '100px' },
            textTransform: 'none',
            flexDirection: 'column',
            width: '80%',
            padding: '7% 2%',
            boxSizing: 'border-box',
            borderRadius: '20px',
          }}
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
        </Button>
        <Button
          color="warning"
          variant="contained"
          sx={{
            fontWeight: '700',
            fontSize: { xs: '7.2vw', md: '65px' },
            textTransform: 'none',
            flexDirection: 'column',
            width: '80%',
            padding: '8% 2%',
            boxSizing: 'border-box',
            borderRadius: '20px',
          }}
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
        </Button>
        <Button
          color="warning"
          variant="contained"
          sx={{
            fontWeight: '700',
            fontSize: { xs: '8vw', md: '72px' },
            textTransform: 'none',
            flexDirection: 'column',
            width: '80%',
            padding: '8% 2%',
            boxSizing: 'border-box',
            borderRadius: '20px',
          }}
        >
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
        </Button>
      </Container>
    </MainContainer>
  );
}

// ----
