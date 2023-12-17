'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import { Box, Typography, styled } from '@mui/material';
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

const FindCategory = ({ searchParams }: { searchParams: { class: string } }) => {
  const router = useRouter();
  const useClass = searchParams.class;

  return (
    <MainContainer>
      <Grid container spacing={2} boxSizing="border-box" padding="10px 30px">
        <Grid xs={6}>
          <ButtonWide
            onClickEvent={() =>
              router.push(`/main/find/category/recommend?class=${useClass}&choice=MaltWhiskey`)
            }
            flexDirection="row"
            justifyContent="space-around"
          >
            <ImageWrap>
              <Image
                src="/img/icon/malt_whiskey.png"
                width={70}
                height={70}
                alt="몰트위스키아이콘"
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
                  Malt Whiskey
                </Typography>
                <Typography
                  textAlign="right"
                  fontWeight="600"
                  sx={{ fontSize: { xs: '3vw', md: '27px' } }}
                >
                  위스키 류
                </Typography>
              </Box>
            </Box>
          </ButtonWide>
        </Grid>
        <Grid xs={6}>
          <ButtonWide
            onClickEvent={() =>
              router.push(`/main/find/category/recommend?class=${useClass}&choice=AmericanWhiskey`)
            }
            flexDirection="row"
            justifyContent="space-around"
          >
            <ImageWrap>
              <Image
                src="/img/icon/american_whiskey.png"
                width={70}
                height={70}
                alt="아메리칸위스키아이콘"
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
                  American Whiskey
                </Typography>
                <Typography
                  textAlign="right"
                  fontWeight="600"
                  sx={{ fontSize: { xs: '3vw', md: '27px' } }}
                >
                  아메리칸 위스키 류
                </Typography>
              </Box>
            </Box>
          </ButtonWide>
        </Grid>
        <Grid xs={6}>
          <ButtonWide
            onClickEvent={() =>
              router.push(`/main/find/category/recommend?class=${useClass}&choice=Wine`)
            }
            flexDirection="row"
            justifyContent="space-around"
          >
            <ImageWrap>
              <Image
                src="/img/icon/wine.png"
                width={70}
                height={70}
                alt="와인아이콘"
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
                  <br />
                  Wine
                </Typography>
                <Typography
                  textAlign="right"
                  fontWeight="600"
                  sx={{ fontSize: { xs: '3vw', md: '27px' } }}
                >
                  와인 류
                </Typography>
              </Box>
            </Box>
          </ButtonWide>
        </Grid>
        <Grid xs={6}>
          <ButtonWide
            onClickEvent={() =>
              router.push(`/main/find/category/recommend?class=${useClass}&choice=BrandyCognac`)
            }
            flexDirection="row"
            justifyContent="space-around"
          >
            <ImageWrap>
              <Image
                src="/img/icon/brandy.png"
                width={70}
                height={70}
                alt="브랜디꼬냑아이콘"
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
                  Brandy & Cognac
                </Typography>
                <Typography
                  textAlign="right"
                  fontWeight="600"
                  sx={{ fontSize: { xs: '3vw', md: '27px' } }}
                >
                  브랜디 & 꼬냑 류
                </Typography>
              </Box>
            </Box>
          </ButtonWide>
        </Grid>
        <Grid xs={6}>
          <ButtonWide
            onClickEvent={() =>
              router.push(`/main/find/category/recommend?class=${useClass}&choice=Rum`)
            }
            flexDirection="row"
            justifyContent="space-around"
          >
            <ImageWrap>
              <Image
                src="/img/icon/rum.png"
                width={70}
                height={70}
                alt="럼아이콘"
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
                  <br />
                  Rum
                </Typography>
                <Typography
                  textAlign="right"
                  fontWeight="600"
                  sx={{ fontSize: { xs: '3vw', md: '27px' } }}
                >
                  럼 류
                </Typography>
              </Box>
            </Box>
          </ButtonWide>
        </Grid>
        <Grid xs={6}>
          <ButtonWide
            onClickEvent={() =>
              router.push(`/main/find/category/recommend?class=${useClass}&choice=Tequila`)
            }
            flexDirection="row"
            justifyContent="space-around"
          >
            <ImageWrap>
              <Image
                src="/img/icon/malt_whiskey.png"
                width={70}
                height={70}
                alt="데킬라아이콘"
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
                  Tequila
                </Typography>
                <Typography
                  textAlign="right"
                  fontWeight="600"
                  sx={{ fontSize: { xs: '3vw', md: '27px' } }}
                >
                  <br />
                  데킬라 류
                </Typography>
              </Box>
            </Box>
          </ButtonWide>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default FindCategory;
