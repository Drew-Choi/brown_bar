'use client';
import React from 'react';
import { COLORS } from '@/asset/style';
import Image from 'next/image';
import { Theme, Typography, styled } from '@mui/material';
import ButtonBack from '@/components/buttons/ButtonBack';
import { usePathname } from 'next/navigation';
import Selector from '@/components/Selector';

const HeaderContainer = styled('header')(({ flex }: { flex: string }) => ({
  flex: flex,
  position: 'relative',
  boxSizing: 'border-box',
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

const SubText = styled('span')<{ fontSize?: string; mdFontSize?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '6vw')};
  @media screen and (min-width: 900px) {
    font-size: ${({ mdFontSize }) => (mdFontSize ? mdFontSize : '54px')};
  }
`;

export const Header = ({ flex = '1' }: { flex?: string }) => {
  const pathName = usePathname();

  if (pathName === '/') return;

  return (
    <HeaderContainer flex={flex}>
      <LeftWrap>
        {pathName !== '/main' && pathName !== '/' ? <ButtonBack /> : <ButtonBack skeleton={true} />}
        {pathName === '/main/find' || pathName === '/main' || pathName === '/' ? (
          <Tag skeleton={true}>
            <Typography fontSize="inherit">tag</Typography>
          </Tag>
        ) : (
          <Tag skeleton={false}>
            {pathName === '/main/menu' ? (
              <Typography
                fontSize="inherit"
                color="text.primary"
                fontWeight={700}
                padding="0 10px"
                sx={{ display: 'flex', alignItems: 'center' }}
                width="100%"
                gap="10px"
              >
                Menu |{' '}
                <Selector
                  optionArr={[
                    { label: '위스키', value: 'wh' },
                    { label: '버번', value: 'a' },
                    { label: '브랜디', value: 'b' },
                    { label: '와인', value: 'w' },
                    { label: '칵테일', value: 'c' },
                    { label: '데킬라', value: 't' },
                    { label: '럼', value: 'r' },
                  ]}
                  fontWeight="600"
                  width="45%"
                  height="70%"
                  padding="5px"
                  fontSize="4.5vw"
                  mdFontSize="35px"
                />
              </Typography>
            ) : pathName === '/main/menu/order' || pathName === '/main/menu/order/final' ? (
              <Typography fontSize="inherit" color="text.primary" fontWeight={700} padding="0 10px">
                Order | <SubText fontSize="8vw" mdFontSize="72px">{`T 5`}</SubText>
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
