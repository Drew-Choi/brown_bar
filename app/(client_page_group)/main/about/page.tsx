'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { useRouter } from 'next/navigation';
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
    label: 'Irish Whiskey',
    kor: '아이리쉬 위스키',
    img: 'malt_whiskey.png',
    params_eng: 'Irish Whiskey',
    params_kor: '아이리쉬 위스키',
    alt: '아이리쉬아이콘',
    about_idx: 1,
  },
  {
    label: 'Scotch Whisky',
    kor: '스카치 위스키',
    img: 'scotch.png',
    params_eng: 'Scotch Whisky',
    params_kor: '스카치 위스키',
    alt: '스카치위스키아이콘',
    about_idx: 2,
  },
  {
    label: 'Amerian Whiskey',
    kor: '아메리칸 위스키',
    img: 'american_whiskey.png',
    params_eng: 'Amerian Whiskey',
    params_kor: '아메리칸 위스키',
    alt: '아메리칸위스키아이콘',
    about_idx: 3,
  },
  {
    label: (
      <>
        Brandy
        <br />& Cognac
      </>
    ),
    kor: '브랜디 & 꼬냑',
    img: 'brandy.png',
    params_eng: ' BrandyCognac',
    params_kor: '브랜디꼬냑',
    alt: '브랜디꼬냑아이콘',
    about_idx: 4,
  },
  {
    label: (
      <>
        <br />
        Rum
      </>
    ),
    kor: '럼',
    img: 'rum.png',
    params_eng: 'Rum',
    params_kor: '럼',
    alt: '럼아이콘',
    about_idx: 5,
  },
  {
    label: (
      <>
        <br />
        Tequila
      </>
    ),
    kor: '데킬라',
    img: 'tequila.png',
    params_eng: 'Tequila',
    params_kor: '데킬라',
    alt: '데킬라아이콘',
    about_idx: 6,
  },
  {
    label: (
      <>
        <br />
        Wine
      </>
    ),
    kor: '와인',
    img: 'wine.png',
    params_eng: 'Wine',
    params_kor: '와인',
    alt: '와인아이콘',
    about_idx: 7,
  },
  {
    label: (
      <>
        <br />
        Cocktail
      </>
    ),
    kor: '칵테일',
    img: 'cocktail.png',
    params_eng: 'Cocktail',
    params_kor: '칵테일',
    alt: '칵테일아이콘',
    about_idx: 8,
  },
];

const About = ({ searchParams }: { searchParams: { class: string } }) => {
  const router = useRouter();
  const useClass = searchParams.class;

  return (
    <MainContainer>
      <Grid container spacing={1} boxSizing="border-box" padding="10px 30px">
        {categories?.map((el, index) => (
          <Grid xs={6} key={index}>
            <ButtonWide
              onClickEvent={() =>
                router.push(
                  `/main/about/detail/${el.about_idx}?eng=${el.params_eng}&kor=${el.params_kor}`,
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

export default About;
