'use client';
import React, { useState } from 'react';
import { Box, Typography, Container, styled } from '@mui/material';
import Image from 'next/image';
import Light from '@/components/svg/Light';

const MainContainer = styled('main')(() => ({
  position: 'absolute',
  zIndex: '999',
  bgcolor: 'black',
  width: '100%',
  height: '100vh',
  top: '0',
}));

const Screen = () => {
  return (
    <MainContainer>
      <Image
        style={{
          position: 'absolute',
          display: 'block',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        src="/img/lightHead.png"
        width={50}
        height={50}
        alt="조명"
      />
      <Light
        style={{
          position: 'absolute',
          left: '51%',
          transform: 'translateX(-50%)',
          zIndex: '990',
          top: '25px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textShadow: '0 0 1px #FFFFFF, 0 0 6px #ffffff',
        }}
      >
        <Typography
          textAlign="center"
          fontSize={40}
          fontWeight={700}
          color="text.secondary"
          zIndex="10"
        >
          The Brown Bar
        </Typography>
        <Typography
          textAlign="center"
          fontSize={24}
          fontWeight={400}
          fontStyle="italic"
          color="text.secondary"
          zIndex="10"
        >
          - Guide -
        </Typography>
      </Box>
    </MainContainer>
  );
};

export default Screen;
