'use client';
import ContentBox from '@/components/layout/ContentBox';
import ImageLayout from '@/components/layout/ImageLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import React from 'react';

const data = {
  content: '좋습니다. 좋습니다. 좋습니다. 좋습니다. 좋습니다.',
  recipe: 1,
  material: 1,
};

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
  return (
    <>
      <MainContainer>
        <Box width="50%" margin="auto" marginBottom="10px">
          <ImageLayout priority={true} src="/img/test/test_image.jpeg" alt="주류대표사진" />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          sx={{ fontSize: { xs: '4vw', md: '35px' } }}
        >
          <Typography fontSize="inherit" color="text.secondary" fontWeight={600}>
            주원료 : {data.material}
          </Typography>
          <Typography fontSize="inherit" color="text.secondary" fontWeight={600}>
            방식 : {data.recipe}
          </Typography>
        </Box>
        <ContentBox
          sx={{
            width: '90%',
            margin: 'auto',
            height: '28vh',
            marginBottom: '10px',
            overflow: 'scroll',
            color: 'text.secondary',
          }}
        >
          <Typography sx={{ fontSize: { xs: '4vw', md: '35px' } }} padding={1}>
            {data.content}
          </Typography>
        </ContentBox>
      </MainContainer>
    </>
  );
};

export default AboutDetail;
