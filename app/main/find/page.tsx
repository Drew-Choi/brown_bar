'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import { Box, Container, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

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

const Find = () => {
  const router = useRouter();

  return (
    <MainContainer>
      <Container
        sx={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '30px',
        }}
      >
        <ButtonWide
          onClickEvent={() => router.push('/main/menu')}
          flexDirection="row"
          justifyContent="space-around"
          padding="2%"
        >
          <ImageWrap>
            <Image
              src="/img/beginner_icon.png"
              width={70}
              height={70}
              alt="초심자아이콘"
              style={{ width: '70%', height: 'auto', objectFit: 'contain' }}
            />
          </ImageWrap>
          <Box position="relative" width="100%">
            <Box position="relative" width="fit-content" margin="auto" marginBottom="5px">
              <Typography textAlign="right" fontSize="7vw" fontWeight="700" lineHeight="1">
                Beginner
              </Typography>
              <Typography textAlign="right" fontSize="4vw" fontWeight="600">
                초심자
              </Typography>
            </Box>
            <Typography fontSize="3.5vw">(40도의 도수가 힘들다)</Typography>
          </Box>
        </ButtonWide>

        <ButtonWide
          onClickEvent={() => router.push('/main/menu')}
          flexDirection="row"
          justifyContent="space-around"
          padding="2%"
        >
          <ImageWrap>
            <Image
              src="/img/explorer_icon.png"
              width={70}
              height={70}
              alt="탐험가아이콘"
              style={{ width: '70%', height: 'auto', objectFit: 'contain' }}
            />
          </ImageWrap>
          <Box position="relative" width="100%">
            <Box position="relative" width="fit-content" margin="auto" marginBottom="5px">
              <Typography textAlign="right" fontSize="7vw" fontWeight="700" lineHeight="1">
                Explorer
              </Typography>
              <Typography textAlign="right" fontSize="4vw" fontWeight="600">
                탐험가
              </Typography>
            </Box>
            <Typography fontSize="3.5vw">(40도 이상 적응완료)</Typography>
          </Box>
        </ButtonWide>

        <ButtonWide
          onClickEvent={() => router.push('/main/menu')}
          flexDirection="row"
          justifyContent="space-around"
          padding="2%"
        >
          <ImageWrap>
            <Image
              src="/img/old_water_icon.png"
              width={70}
              height={70}
              alt="초심자아이콘"
              style={{ width: '70%', height: 'auto', objectFit: 'contain' }}
            />
          </ImageWrap>
          <Box position="relative" width="100%">
            <Box position="relative" width="fit-content" margin="auto" marginBottom="5px">
              <Typography textAlign="right" fontSize="7vw" fontWeight="700" lineHeight="1">
                Old Water
              </Typography>
              <Typography textAlign="right" fontSize="4vw" fontWeight="600">
                고인물
              </Typography>
            </Box>
            <Typography fontSize="3.5vw">(46도~60도)</Typography>
          </Box>
        </ButtonWide>
      </Container>
    </MainContainer>
  );
};

export default Find;
