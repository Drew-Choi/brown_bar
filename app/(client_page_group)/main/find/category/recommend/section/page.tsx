'use client';
import { Box, Typography, styled } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { COLORS } from '@/asset/style';
import ContentBox from '@/components/layout/ContentBox';
import { useRouter } from 'next/navigation';
import ImageLayout from '@/components/layout/ImageLayout';

const data = [
  {
    name: 'BB&R',
    price: 13000,
    class: 'Beginner',
    chice: 'MaltWhiskey',
    sectionIdx: 1,
    img: 'https://fovvimage.s3.ap-northeast-2.amazonaws.com/brown_products/test',
    idx: 1,
  },
  {
    name: '레미마르땡 V.S.O.P 레미마',
    price: 13000,
    class: 'Beginner',
    chice: 'MaltWhiskey',
    sectionIdx: 1,
    img: '/img/test/test_image.jpeg',
    idx: 2,
  },
  {
    name: 'BB&R',
    price: 13000,
    class: 'Beginner',
    chice: 'MaltWhiskey',
    sectionIdx: 1,
    img: '/img/test/test_image.jpeg',
    idx: 3,
  },
  {
    name: 'BB&R',
    price: 13000,
    class: 'Beginner',
    chice: 'MaltWhiskey',
    sectionIdx: 1,
    img: '/img/test/test_image.jpeg',
    idx: 4,
  },
  {
    name: 'BB&R',
    price: 13000,
    class: 'Beginner',
    chice: 'MaltWhiskey',
    sectionIdx: 1,
    img: '/img/test/test_image.jpeg',
    idx: 5,
  },
];

const MainContainer = styled('main')`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-height: 57.5vh;
  padding: 20px;
  overflow: scroll;
`;

const Section = ({
  searchParams,
}: {
  searchParams: {
    class: string;
    choice: string;
    section: string;
    section_name: string;
  };
}) => {
  const { choice, class: userClass, section, section_name } = searchParams;

  const router = useRouter();

  return (
    <MainContainer>
      <Grid container spacing={2}>
        {data?.map((el, index) => (
          <Grid
            xs={6}
            key={index}
            onClick={() =>
              router.push(
                `/main/menu/detail/${el.idx}?class=${userClass}&choice=${choice}&section=${section}&section_name=${section_name}`,
              )
            }
          >
            <ImageLayout priority={true} src={el.img} alt="제품사진" marginBottom="5px" />
            <ContentBox>
              <Typography
                textAlign="center"
                color="text.secondary"
                fontWeight={700}
                sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
              >
                {el.name}
              </Typography>
              <Typography
                textAlign="center"
                color="text.secondary"
                sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
              >
                {el.price.toLocaleString('ko-KR')} ₩
              </Typography>
            </ContentBox>
          </Grid>
        ))}
      </Grid>
    </MainContainer>
  );
};

export default Section;
