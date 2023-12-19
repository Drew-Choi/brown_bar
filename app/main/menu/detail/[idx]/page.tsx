'use client';
import { COLORS } from '@/asset/style';
import ContentBox from '@/components/layout/ContentBox';
import { Box, Typography, styled } from '@mui/material';
import Image from 'next/image';
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
        <Box
          sx={{
            position: 'relative',
            height: '0',
            paddingTop: '100%',
            overflow: 'hidden',
            borderRadius: '10px',
            border: `0.5px solid ${COLORS.info}`,
            marginBottom: '10px',
          }}
        >
          <Image
            src="/img/test/test_image.jpeg"
            priority
            width={500}
            height={500}
            alt="제품이미지"
            style={{
              position: 'absolute',
              display: 'block',
              width: '100%',
              height: 'auto',
              top: '50%',
              left: '0',
              transform: 'translateY(-50%)',
            }}
          />
        </Box>
      </Box>
      <ContentBox sx={{ maxHeight: '32vh', overflow: 'scroll' }}>
        <Typography sx={{ fontSize: { xs: '4vw', md: '36px' } }} color="text.secondary">
          {data.desc}
        </Typography>
      </ContentBox>
    </MainContainer>
  );
};

export default Detail;
