'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import ImageLayout from '@/components/layout/ImageLayout';
import { COLORS } from '@/asset/style';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`;

const Party = () => {
  return (
    <MainContainer>
      <Container
        sx={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px 30px',
          height: '60vh',
          overflow: 'scroll',
        }}
      >
        <Box sx={{ width: '70%', margin: '0 auto' }}>
          <ImageLayout
            innerHeight="100%"
            innerWidth="auto"
            priority
            src="/img/test1.jpeg"
            alt="시음회대표이미지"
          />
        </Box>

        {/* 시음회 간략 소개 */}
        <Box sx={{ color: COLORS.text.secondary, padding: '20px 15px' }}>
          {/* 타이틀 */}
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: '600',
              marginBottom: '5px',
              fontSize: { xs: '3.5vw', md: '32px' },
            }}
          >
            {'더 브라운 시음회'}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: { xs: '3.4vw', md: '30.5px' },
            }}
          >
            {'다양한 와인을 마셔보며 취향을 찾아보세요.'}
          </Typography>
        </Box>
      </Container>
    </MainContainer>
  );
};

export default Party;
