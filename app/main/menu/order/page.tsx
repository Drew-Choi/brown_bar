'use client';
import React from 'react';
import { styled, Container } from '@mui/material';
import MenuLineLayout from '@/components/layout/MenuLineLayout';

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
    optionArr: [
      { label: '- 옵션선택 -', value: 0 },
      { label: '베일리스 + 1,000', value: 1000 },
      { label: '베일리스 + 1,000', value: 1000 },
      { label: '베일리스aaa + 1,000', value: 1000 },
    ],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [{ label: '- 옵션선택 -', value: 0 }],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [
      { label: '- 옵션선택 -', value: 0 },
      { label: '베일리스 + 3,000', value: 3000 },
      { label: '베일리스 + 3,500', value: 3500 },
      { label: '베일리스aaa + 5,000', value: 5000 },
    ],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [],
  },
];
const Order = () => {
  return (
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
          height: '60vh',
        }}
      >
        {data.map((el, index) => (
          <MenuLineLayout data={el} key={index} changeOrderList={true} />
        ))}
      </Container>
    </MainContainer>
  );
};

export default Order;
