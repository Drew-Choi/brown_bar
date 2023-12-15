'use client';
import Line from '@/components/Line';
import FianlLineLayout from '@/components/layout/FianlLineLayout';

import { Container, Typography, styled } from '@mui/material';
import React from 'react';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  overflow: scroll;
`;

const data = [
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: { label: '베일리스 + 1,000', value: 1000 },
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: { label: '- 옵션선택 -', value: 0 },
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: { label: '베일리스aaa + 5,000', value: 5000 },
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
  },
];

const Fianl = () => {
  return (
    <>
      <Typography textAlign="center" color="text.secondary">
        주문해주셔서 감사합니다.
        <br />
        조금만 기다려주세요 :)
      </Typography>

      <Line height="2px" margin="10px 0px" />

      <MainContainer>
        <Container
          sx={{
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px 10px',
            height: '50vh',
          }}
        >
          {data?.map((el, index) => <FianlLineLayout key={index} data={el} />)}
        </Container>
      </MainContainer>
    </>
  );
};

export default Fianl;
