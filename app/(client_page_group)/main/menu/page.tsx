'use client';
import React, { useState } from 'react';
import { SelectChangeEvent, styled } from '@mui/material';
import MenuLineLayout from '@/components/layout/MenuLineLayout';
import Container from '@mui/material/Container';
import Selector from '@/components/Selector';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  overflow: scroll;
`;

const data = [
  {
    // 24자 최대
    name: '코일레 싱글빈야 까르베네쇼비뇽까르베네쇼비뇽까',
    desc: 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㄴㅁㅇ',
    price: 560000,
    optionArr: [
      { label: '- 옵션선택 -', value: 0, price: 0 },
      { label: '베일리스 + 1,000', value: 1, price: 1000 },
      { label: '베일리스+1,100', value: 2, price: 1100 },
      // 14자 제한
      { label: '베일리스베일리스베일리스베일', value: 3, price: 1200 },
    ],
  },
  {
    name: '코일레 싱글빈야 까르베네쇼비뇽',
    desc: '칠렌ㅁㅇㄴㅇㅇㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    price: 56000,
    optionArr: [
      { label: '- 옵션선택 -', value: 0, price: 0 },
      { label: '옵션1', value: 1, price: 1000 },
      { label: '옵션2', value: 2, price: 1000 },
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
    optionArr: [
      { label: '- 옵션선택 -', value: 0, price: 0 },
      { label: '베일리스 + 3,000', value: 1, price: 3000 },
      { label: '베일리스 + 3,500', value: 2, price: 3500 },
      { label: '베일리스aaa + 5,000', value: 3, price: 5000 },
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
const Menu = () => {
  const [menuSelectorValue, setMenuSelectorValue] = useState<string | number>(10);

  const menuSelectorHandler = (e: SelectChangeEvent<string | number>) => {
    const value = e.target.value;
    setMenuSelectorValue(value);
  };

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
        <Selector
          textAlign="center"
          // 나중에 데이터 받아야 함
          optionArr={[
            { label: '위스키', value: 10 },
            { label: '아메리칸 위스키', value: 20 },
            { label: '스카치 블랜디드 위스키', value: 30 },
            // 글씨 제한기준
            { label: '스카치 블랜디드 싱글몰트 위스키 위스키 위스키키키', value: 40 },
            { label: '버번', value: 50 },
            { label: '브랜디', value: 60 },
            { label: '와인', value: 70 },
            { label: '칵테일', value: 80 },
            { label: '데킬라', value: 90 },
            { label: '럼', value: 100 },
          ]}
          value={menuSelectorValue}
          fontWeight="600"
          width="100%"
          xsFontSize="4vw"
          mdFontSize="35px"
          onChangeEvent={menuSelectorHandler}
          subText="메뉴 카테고리 선택"
          subSx={{ textAlign: 'center' }}
        />
        {data.map((el, index) => (
          <MenuLineLayout data={el} key={index} />
        ))}
      </Container>
    </MainContainer>
  );
};

export default Menu;
