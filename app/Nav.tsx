'use client';
import { COLORS } from '@/asset/style';
import { Box, styled } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { BiSolidFoodMenu } from 'react-icons/bi';

const BottomNavContainer = styled('nav')(({ flex }: { flex: string }) => ({
  flex: flex,
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '0 20px',
  gap: '20px',
}));

const ImageWrap = styled('div')`
  flex: 1;
  position: relative;
`;

const BottomNav = ({ flex = '1' }: { flex?: string }) => {
  return (
    <BottomNavContainer flex={flex}>
      <ImageWrap>
        <Image
          src="/img/bottom_icon.png"
          width={121}
          height={76}
          alt="오크통캐리커쳐"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </ImageWrap>
      <Box flex="1.8" textAlign="right">
        <BiSolidFoodMenu size="30%" color={COLORS.info} />
      </Box>
    </BottomNavContainer>
  );
};

export default React.memo(BottomNav);
