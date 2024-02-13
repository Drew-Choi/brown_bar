'use client';
import { COLORS } from '@/asset/style';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import Cork from '@/components/svg/Cork';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { cartData, cartQuantity } from '@/recoil/cart';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiSolidFoodMenu } from 'react-icons/bi';
import { BsCartPlusFill } from 'react-icons/bs';
import { RiHome4Fill } from 'react-icons/ri';
import { useRecoilState, useRecoilValue } from 'recoil';

const BottomNav = ({ flex = '1' }: { flex?: string }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [tb, setTb] = useState<string | null>(null);
  const { openPopup } = usePopup();

  const quantity = useRecoilValue(cartQuantity);
  const [cartValue, setCartValue] = useRecoilState(cartData);

  useEffect(() => {
    if (pathName === '/main/menu' || pathName.startsWith('/main/menu/detail')) {
      const localCartValue = localStorage.getItem('cart');

      if (localCartValue) return setCartValue(JSON.parse(localCartValue));
    }
  }, [pathName]);

  useEffect(() => {
    if (pathName === '/main/menu/order' || pathName === '/main') {
      const tbValue = sessionStorage.getItem('tb');

      if (tbValue) {
        const parseTb = JSON.parse(tbValue)?.tb;
        setTb(parseTb);
      } else {
        setTb(null);
        return router.push('/not_tb');
      }
    }
  }, [pathName]);

  const { mutate: addOrderAPI } = useMutationInstance<
    undefined,
    undefined,
    { tb_idx: number; menu: MenuOptionType[] }
  >({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.ORDER_ADD,
    onErrorFn: (err: any) => {
      console.error(err);
      if (err.response.status === 400)
        return openPopup({ title: '오류', content: err.response.data.message });
      openPopup({ title: '오류', content: '다시 시도해주세요.' });
    },
    onSuccessFn: () => {
      localStorage.removeItem('cart');
      setCartValue([]);
      router.push('/main/menu/order/final');
    },
  });

  const addOrderHandler = () => {
    addOrderAPI({
      apiBody: {
        tb_idx: Number(tb),
        menu: cartValue,
      },
    });
  };

  if (pathName === '/') return;

  if (pathName === '/not-found') return;

  if (pathName === '/not_tb') return;

  if (pathName.startsWith('/admin')) return;

  return (
    <Container
      component="nav"
      sx={{
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
      }}
    >
      {(pathName === '/main/menu' ||
        pathName === '/main/menu/order' ||
        pathName === '/main/menu/order/final' ||
        pathName === '/main/find/category/recommend' ||
        pathName === '/main/find/category/recommend/section') && (
        <Cork
          sx={{
            position: 'absolute',
            zIndex: '99',
            top: '0px',
            left: '48%',
          }}
        />
      )}

      <Box sx={{ flex: '1', position: 'relative' }} onClick={() => router.push('/main')}>
        <Image
          src="/img/bottom_icon.png"
          width={121}
          height={76}
          alt="오크통캐리커쳐"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Box>
      <Box flex="1.8" textAlign="right">
        {pathName !== '/' &&
          pathName !== '/main' &&
          pathName !== '/main/menu' &&
          pathName !== '/main/menu/order' &&
          pathName !== '/main/menu/order/final' &&
          !pathName.startsWith('/main/menu/detail') && (
            <BiSolidFoodMenu
              size="32%"
              color={COLORS.info}
              onClick={() => router.push('/main/menu')}
            />
          )}
        {(pathName === '/main/menu' || pathName.startsWith('/main/menu/detail')) && (
          <Box sx={{ position: 'relative' }} onClick={() => router.push('/main/menu/order')}>
            <Box
              sx={{
                position: 'absolute',
                bgcolor: 'error.main',
                width: { xs: '12vw', md: '100px' },
                height: { xs: '12vw', md: '100px' },
                borderRadius: '50%',
                right: '-5px',
                top: '-18px',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  display: 'block',
                  color: 'text.secondary',
                  fontWeight: '700',
                  fontSize: { xs: '8vw', md: '72px' },
                  textAlign: 'center',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {quantity}
              </Typography>
            </Box>
            <BsCartPlusFill size="32%" color={COLORS.info} />
          </Box>
        )}

        {pathName === '/main/menu/order' && (
          <ButtonNomal sx={{ fontWeight: '700', fontSize: '5vw' }} onClickEvent={addOrderHandler}>
            주문하기
          </ButtonNomal>
        )}

        {pathName === '/main/menu/order/final' && (
          <RiHome4Fill size="32%" color={COLORS.info} onClick={() => router.push('/main')} />
        )}

        {pathName === '/main' && (
          <ButtonNomal
            sx={{ fontWeight: '600' }}
            onClickEvent={() => router.push('/main/menu/order/final')}
          >
            T{tb} 주문내역
          </ButtonNomal>
        )}
      </Box>
    </Container>
  );
};

export default React.memo(BottomNav);
