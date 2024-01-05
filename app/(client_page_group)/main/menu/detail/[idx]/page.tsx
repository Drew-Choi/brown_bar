'use client';
import ContentBox from '@/components/layout/ContentBox';
import ImageLayout from '@/components/layout/ImageLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import React from 'react';

const data = {
  name: 'BB&R',
  price: 13000,
  desc: '좋은 술 입니다.좋은 술 입니다.좋은 술 입니다.좋은 ',
  class: 'Beginner',
  chice: 'MaltWhiskey',
  sectionIdx: 1,
  img: '/img/test/test_image.jpeg',
  idx: 1,
};

const MainContainer = styled('main')`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
`;

const Detail = ({
  params,
  searchParams,
}: {
  params: { idx: string };
  searchParams: {
    class: string;
    choice: string;
    section: string;
    section_name: string;
  };
}) => {
  return (
    <MainContainer>
      <Typography
        color="text.secondary"
        marginBottom="5px"
        textAlign="center"
        sx={{ fontSize: { xs: '6vw', md: '54px' } }}
      >
        {data.name}
      </Typography>
      <Box width="50%" margin="auto">
        <ImageLayout src="/img/test/test_image.jpeg" alt="제품사진" marginBottom="10px" />
      </Box>
      <ContentBox sx={{ height: '32vh', overflow: 'scroll' }}>
        <Typography padding={1} sx={{ fontSize: { xs: '4vw', md: '36px' } }} color="text.secondary">
          {data.desc}
        </Typography>
      </ContentBox>
    </MainContainer>
  );
};

export default Detail;
