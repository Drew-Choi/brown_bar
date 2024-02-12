'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import MenuLineLayout from '@/components/layout/MenuLineLayout';
import Container from '@mui/material/Container';
import { useRecoilState } from 'recoil';
import { cartData } from '@/recoil/cart';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  overflow: scroll;
`;

const Order = () => {
  const [cartValue, setCartValue] = useRecoilState(cartData);
  const [resetting, setResetting] = useState<boolean>(false);

  useEffect(() => {
    const cartValue = localStorage.getItem('cart');

    if (cartValue) return setCartValue(JSON.parse(cartValue));
  }, [resetting]);

  const cartMenuRemoveHandler = useCallback((index: number) => {
    const sessionData = localStorage.getItem('cart');

    if (sessionData) {
      const cartData: MenuType[] = JSON.parse(sessionData);
      const newDataArr = cartData.filter((_, dataIndex) => dataIndex !== index);
      localStorage.setItem('cart', JSON.stringify(newDataArr));
      setResetting((cur) => !cur);
    }
  }, []);

  const cartQuantityHandler = useCallback((plus: boolean = true, index: number) => {
    const sessionData = localStorage.getItem('cart');

    if (sessionData) {
      const cartData: MenuType[] = JSON.parse(sessionData);
      const newDataArr = cartData.map((menu: MenuType, dataIndex) =>
        dataIndex === index
          ? plus
            ? { ...menu, ea: menu.ea + 1 }
            : { ...menu, ea: menu.ea === 1 ? 1 : menu.ea - 1 }
          : menu,
      );
      localStorage.setItem('cart', JSON.stringify(newDataArr));
      setResetting((cur) => !cur);
    }
  }, []);

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
        {cartValue?.length === 0 ? (
          <Box
            sx={{ color: 'text.secondary', fontSize: { xs: '4vw', md: '30px' } }}
            textAlign="center"
          >
            카트가 비어있습니다.
          </Box>
        ) : (
          cartValue.map((el, index) => (
            <MenuLineLayout
              data={el}
              key={index}
              changeOrderList={true}
              onClickCartMenuRemove={() => cartMenuRemoveHandler(index)}
              onClickCartPlus={() => cartQuantityHandler(true, index)}
              onClickCartMinus={() => cartQuantityHandler(false, index)}
            />
          ))
        )}
      </Container>
    </MainContainer>
  );
};

export default Order;
