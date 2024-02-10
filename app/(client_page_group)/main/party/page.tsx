'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`;

const ImageWrap = styled('div')`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const Party = () => {
  return (
    <MainContainer>
      <Typography color="text.secondary" sx={{ padding: '20px' }}>
        서비스 준비 중
      </Typography>
    </MainContainer>
  );
};

export default Party;
