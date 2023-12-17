'use client';
import { COLORS } from '@/asset/style';
import Cork from '@/components/svg/Cork';
import { Box, Button, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { BiSolidFoodMenu } from 'react-icons/bi';
import { BsCartPlusFill } from 'react-icons/bs';
import { RiHome4Fill } from 'react-icons/ri';

const BottomNavContainer = styled('nav')(({ flex }: { flex: string }) => ({
  position: 'relative',
  flex: flex,
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '10px 20px',
  gap: '20px',
}));

const ImageWrap = styled('div')`
  flex: 1;
  position: relative;
`;

const BottomNav = ({ flex = '1' }: { flex?: string }) => {
  const pathName = usePathname();
  const router = useRouter();

  if (pathName === '/') return;

  return (
    <BottomNavContainer flex={flex}>
      {pathName === '/main/menu' && (
        <Cork
          sx={{
            position: 'absolute',
            zIndex: '99',
            top: '0px',
            left: '48%',
          }}
        />
      )}

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
        {pathName !== '/' &&
          pathName !== '/main' &&
          pathName !== '/main/menu' &&
          pathName !== '/main/menu/order' &&
          pathName !== '/main/menu/order/final' && (
            <BiSolidFoodMenu
              size="32%"
              color={COLORS.info}
              onClick={() => router.push('/main/menu')}
            />
          )}
        {pathName === '/main/menu' && (
          <Box sx={{ position: 'relative' }} onClick={() => router.push('/main/menu/order')}>
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '12vw', md: '100px' },
                height: { xs: '12vw', md: '100px' },
                bgcolor: COLORS.error,
                borderRadius: '50%',
                right: '-5px',
                top: '-18px',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  display: 'block',
                  color: COLORS.text.secondary,
                  fontWeight: '700',
                  fontSize: { xs: '8vw', md: '72px' },
                  textAlign: 'center',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {'10'}
              </Typography>
            </Box>
            <BsCartPlusFill size="32%" color={COLORS.info} />
          </Box>
        )}

        {pathName === '/main/menu/order' && (
          <Button
            variant="contained"
            color="info"
            sx={{ fontWeight: '700', fontSize: '5vw' }}
            onClick={() => router.push('/main/menu/order/final')}
          >
            주문하기
          </Button>
        )}

        {pathName === '/main/menu/order/final' && (
          <RiHome4Fill size="32%" color={COLORS.info} onClick={() => router.push('/main')} />
        )}
      </Box>
    </BottomNavContainer>
  );
};

export default React.memo(BottomNav);