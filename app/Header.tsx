'use client';
import React from 'react';
import { styled } from '@mui/material';
import { COLORS } from '@/asset/style';
import Image from 'next/image';
import { Theme, Typography } from '@mui/material';
import ButtonBack from '@/components/buttons/ButtonBack';
import { usePathname } from 'next/navigation';

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
  display: 'flex',
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

const SubText = styled('span')(({ theme }) => ({
  fontSize: '6vw',
  [theme!.breakpoints.up('md')]: {
    fontSize: '54px',
  },
}));

export const Header = ({ flex = '1' }: { flex?: string }) => {
  const pathName = usePathname();

  if (pathName === '/') return;

  return (
    <HeaderContainer flex={flex}>
      <LeftWrap>
        {pathName !== '/main' && pathName !== '/' ? <ButtonBack /> : <ButtonBack skeleton={true} />}
        {pathName === '/main' || pathName === '/' ? (
          <Tag skeleton={true}>
            <Typography fontSize="inherit">tag</Typography>
          </Tag>
        ) : (
          <Tag skeleton={false}>
            {pathName === '/main/menu' ? (
              <Typography fontSize="inherit" color="text.primary" fontWeight={700} padding="0 10px">
                Menu | <SubText>{`위스키`}</SubText>
              </Typography>
            ) : (
              <Typography fontSize="inherit" color="text.primary" fontWeight={700} padding="0 10px">
                | <SubText>{``}</SubText>
              </Typography>
            )}
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
