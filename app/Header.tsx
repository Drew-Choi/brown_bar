'use client';
import React from 'react';
import { styled } from '@mui/material';
import { COLORS } from '@/asset/style';
import Image from 'next/image';
import { Theme, Typography } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa6';

const HeaderContainer = styled('header')(({ flex }: { flex: string }) => ({
  flex: flex,
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '20px',
  color: COLORS.text.secondary,
}));

const ImageWrap = styled('div')`
  flex: 1;
  position: relative;
  width: 45%;
`;

const LeftWrap = styled('div')`
  position: relative;
  flex: 1.5;
  padding: 10px 0;
`;

const Tag = styled('div')(({ theme, skeleton }: { skeleton: boolean; theme?: Theme }) => ({
  position: 'relative',
  backgroundColor: skeleton ? COLORS.background.default : COLORS.background.paper,
  width: '100%',
  height: 'auto',
  padding: '5px 0',
  borderRadius: '0 10px 10px 0',
  color: skeleton ? COLORS.background.default : COLORS.text.secondary,
  fontSize: '8vw',
  [theme!.breakpoints.up('md')]: {
    fontSize: '72px',
  },
}));

export const Header = ({ pathName, flex = '1' }: { pathName: string; flex?: string }) => {
  return (
    <HeaderContainer flex={flex}>
      <LeftWrap>
        <FaArrowLeft color={COLORS.info} size="10%" style={{ marginLeft: '10px' }} />
        {pathName === '/' ? (
          <Tag skeleton={true}>
            <Typography fontSize="inherit">|</Typography>
          </Tag>
        ) : (
          <Tag skeleton={false}>
            <Typography fontSize="inherit">tag</Typography>
          </Tag>
        )}
      </LeftWrap>
      <ImageWrap>
        <Image
          priority
          src="/img/header_logo.png"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          width={150}
          height={60}
          alt="대표로고"
        />
      </ImageWrap>
    </HeaderContainer>
  );
};

export default React.memo(Header);
