'use client';
import React from 'react';
import { styled, Container, Typography } from '@mui/material';
import { COLORS } from '@/asset/style';
import { FaPlus } from 'react-icons/fa6';
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
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [],
  },
];
const Menu = () => {
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
          height: '65vh',
        }}
      >
        {data.map((el, index) => (
          <MenuLineLayout data={el} key={index} />
        ))}
      </Container>
    </MainContainer>
  );
};

export default Menu;
