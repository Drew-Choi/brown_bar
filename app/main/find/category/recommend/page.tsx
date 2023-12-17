'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import ContentBox from '@/components/layout/ContentBox';
import { Box, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  padding: 20px 30px;
  top: 50%;
  transform: translateY(-50%);
`;

const data = [
  { class: 'beginner', section: '취향 찾기 좋은 위스키 3종', idx: 1 },
  { class: 'beginner', section: '과일 & 우디 & 허니', idx: 2 },
  { class: 'beginner', section: '과일 & 스모키', idx: 3 },
  { class: 'explorer', section: '쉐리캐스크 or 버번캐스크', idx: 4 },
  { class: 'explorer', section: '쉐리 & 피트', idx: 5 },
  { class: 'explorer', section: '피트', idx: 6 },
  { class: 'oldwater', section: '몰라1', idx: 7 },
  { class: 'oldwater', section: '몰라2', idx: 8 },
  { class: 'oldwater', section: '몰라3', idx: 9 },
  // { class: 'oldwater', section: '몰라1', idx: 7 },
  // { class: 'oldwater', section: '몰라2', idx: 8 },
  // { class: 'oldwater', section: '몰라3', idx: 9 },
  // { class: 'oldwater', section: '몰라1', idx: 7 },
  // { class: 'oldwater', section: '몰라2', idx: 8 },
  // { class: 'oldwater', section: '몰라3', idx: 9 },
];

const Recommend = ({ searchParams }: { searchParams: { class: string; choice: string } }) => {
  const { class: userClass, choice } = searchParams;

  const router = useRouter();

  return (
    <MainContainer>
      <Box>
        <Box
          position="relative"
          width="25%"
          margin="auto"
          bgcolor="background.paper"
          borderRadius="50%"
          textAlign="center"
          marginBottom="10px"
        >
          <Image
            src={
              userClass === 'Beginner'
                ? '/img/beginner_icon.png'
                : userClass === 'Explorer'
                  ? '/img/explorer_icon.png'
                  : '/img/old_water_icon.png'
            }
            width={50}
            height={50}
            alt="유저등급아이콘"
            style={{
              padding: '5px 5px 0px 5px',
              width: '80%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box marginBottom="20px">
          <Typography
            textAlign="center"
            color="text.secondary"
            fontWeight="700"
            marginBottom="10px"
            sx={{ fontSize: { xs: '5vw', md: '45px' } }}
          >
            {userClass === 'Beginner' ? '초심자' : userClass === 'Explorer' ? '탐험가' : '고인물'}
          </Typography>
          <ContentBox>
            <Typography color="text.secondary" sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}>
              처음부터 고가의 위스키 보다는 부드러우며, 가격이 비교적 저렴한위스키들로
              구성하였습니다
            </Typography>
          </ContentBox>
        </Box>

        <Box display="flex" flexDirection="column" gap="10px" maxHeight="25vh" overflow="scroll">
          {data?.map((el) =>
            userClass?.toLocaleLowerCase() === el.class ? (
              <ButtonWide
                padding="3%"
                key={el.idx}
                onClickEvent={() =>
                  router.push(
                    `/main/find/category/recommend/section?class=${userClass}&choice=${choice}&section=${el.idx}&section_name=${el.section}`,
                  )
                }
              >
                <Typography
                  textAlign="center"
                  fontWeight="700"
                  sx={{ fontSize: { xs: '4.5vw', md: '40px' } }}
                >
                  {el.section}
                </Typography>
              </ButtonWide>
            ) : null,
          )}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default Recommend;