'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';

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

const categories = [
  {
    label: 'Malt Whiskey',
    kor: '몰트 위스키 류',
    img: 'malt_whiskey.png',
    choice_params: '몰트 위스키 류',
    alt: '몰트위스키아이콘',
  },
  {
    label: 'American Whiskey',
    kor: '아메리칸 위스키 류',
    img: 'american_whiskey.png',
    choice_params: '아메리칸 위스키 류',
    alt: '아메리칸위스키아이콘',
  },
  {
    label: (
      <>
        <br />
        Wine
      </>
    ),
    kor: '와인 류',
    img: 'wine.png',
    choice_params: '와인 류',
    alt: '와인아이콘',
  },
  {
    label: (
      <>
        Brandy
        <br />& Cognac
      </>
    ),
    kor: '브랜디 & 꼬냑 류',
    img: 'brandy.png',
    choice_params: '브랜디 꼬냑 류',
    alt: '브랜디꼬냑아이콘',
  },
  {
    label: (
      <>
        <br />
        Rum
      </>
    ),
    kor: '럼 류',
    img: 'rum.png',
    choice_params: '럼 류',
    alt: '럼아이콘',
  },
  {
    label: (
      <>
        <br />
        Tequila
      </>
    ),
    kor: '데킬라 류',
    img: 'tequila.png',
    choice_params: '데킬라 류',
    alt: '데킬라아이콘',
  },
];

const FindCategory = () => {
  const router = useRouter();
  const search = useSearchParams();
  const useClass = search.get('class');

  return (
    <MainContainer>
      <Grid container spacing={2} boxSizing="border-box" padding="10px 30px">
        {categories?.map((el, index) => (
          <Grid xs={6} key={index}>
            <ButtonWide
              onClickEvent={() =>
                router.push(
                  `/main/find/category/recommend?class=${useClass}&choice=${el.choice_params}`,
                )
              }
              flexDirection="row"
              justifyContent="space-around"
            >
              <ImageWrap>
                <Image
                  src={`/img/icon/${el.img}`}
                  width={70}
                  height={70}
                  alt={el.alt}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </ImageWrap>
              <Box position="relative" width="100%">
                <Box position="relative" width="fit-content" margin="auto" marginBottom="5px">
                  <Typography
                    textAlign="right"
                    fontWeight="700"
                    lineHeight="1"
                    sx={{ fontSize: { xs: '6vw', md: '52px' } }}
                  >
                    {el.label}
                  </Typography>
                  <Typography
                    textAlign="right"
                    fontWeight="600"
                    sx={{ fontSize: { xs: '3vw', md: '27px' } }}
                  >
                    {el.kor}
                  </Typography>
                </Box>
              </Box>
            </ButtonWide>
          </Grid>
        ))}
      </Grid>
    </MainContainer>
  );
};

export default FindCategory;
