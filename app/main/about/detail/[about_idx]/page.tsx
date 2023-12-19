'use client';
import { styled } from '@mui/material';
import React from 'react';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`;

const AboutDetail = ({
  searchParams,
  params,
}: {
  searchParams: { kor: string; eng: string };
  params: { about_idx: string };
}) => {
  return <MainContainer sx={{ color: 'white' }}>about detail</MainContainer>;
};

export default AboutDetail;
