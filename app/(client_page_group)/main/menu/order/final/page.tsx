'use client';
import Line from '@/components/Line';
import FianlLineLayout from '@/components/layout/FianlLineLayout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { useRouter } from 'next/navigation';
import { GC_TIME } from '@/constant/NUMBER';
import Empty from '@/components/Empty';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  overflow: scroll;
`;

// 총 주문 합계 계산
const totalPrice = (orderList: OrderCardProps[]) => {
  let sum = 0;

  orderList.forEach(
    (orderCard) =>
      (sum += orderCard.menu?.reduce(
        (acc, menu) =>
          acc +
          (menu.option?.price ? (menu.price + menu.option.price) * menu.ea : menu.price * menu.ea),
        0,
      )),
  );

  return sum;
};

const Fianl = () => {
  const router = useRouter();
  const [tb, setTb] = useState<string | null>(null);

  useEffect(() => {
    const cartValue = sessionStorage.getItem('tb');

    if (cartValue) {
      const cartParseTb = JSON.parse(cartValue)?.tb;
      setTb(cartParseTb);
    } else {
      setTb(null);
      return router.push('/not_tb');
    }
  }, []);

  const { data: { data: tbOrderList } = { data: [] }, isError } = useQueryInstance<{
    data: OrderCardProps[];
  }>({
    queryKey: [QUERY_KEY.ORDER_LIST, tb],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.ORDER_LIST,
    queryEnable: tb !== null,
    apiQueryParams: { tb },
    staleTime: 0,
    gcTime: GC_TIME.DEFAULT,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  if (isError) return <Box sx={{ color: 'text.secondary', padding: '20px' }}>Fetching Error</Box>;

  return (
    <>
      <Typography gutterBottom textAlign="center" color="text.secondary">
        주문해주셔서 감사합니다.
        <br />
        조금만 기다려주세요 :)
      </Typography>
      <Typography
        textAlign="right"
        color="text.secondary"
        sx={{ fontSize: { xs: '3.8vw', md: '32px' }, padding: '0 10px' }}
      >
        총 주문금액: {totalPrice(tbOrderList)?.toLocaleString('ko-KR')} ₩
      </Typography>

      <Line height="2px" margin="10px 0px" />

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
            height: '46vh',
          }}
        >
          {tbOrderList?.length === 0 ? (
            <Empty title="주문내역이 없습니다." />
          ) : (
            tbOrderList?.map((el, index) => <FianlLineLayout key={index} data={el} />)
          )}
        </Container>
      </MainContainer>
    </>
  );
};

export default Fianl;
