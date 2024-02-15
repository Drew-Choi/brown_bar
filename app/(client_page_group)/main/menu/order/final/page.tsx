'use client';
import Line from '@/components/Line';
import FianlLineLayout from '@/components/layout/FianlLineLayout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { useRouter } from 'next/navigation';
import { GC_TIME } from '@/constant/NUMBER';
import Empty from '@/components/Empty';
import { useIsStart } from '@/hook/useIsStart/useIsStart';

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
  const { isStart, isError: startError, isLoading: isLoadingStart } = useIsStart();

  const router = useRouter();
  const [tb, setTb] = useState<string | null>(null);

  useEffect(() => {
    const tbValue = sessionStorage.getItem('tb');

    if (tbValue) {
      const cartParseTb = JSON.parse(tbValue)?.tb;
      setTb(cartParseTb);
    } else {
      setTb(null);
      return router.push('/not_tb');
    }
  }, []);

  const {
    data: { data: tbOrderList } = { data: [] },
    isError,
    isLoading,
  } = useQueryInstance<{
    data: OrderCardProps[];
  }>({
    queryKey: [QUERY_KEY.ORDER_LIST, tb],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.ORDER_LIST,
    queryEnable: tb !== null && isStart === true,
    apiQueryParams: { tb },
    staleTime: 0,
    gcTime: GC_TIME.DEFAULT,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  if (!isStart && !isLoading && !isLoadingStart)
    return (
      <Box color="text.secondary" sx={{ padding: '20px' }}>
        현재 영업이 종료되었습니다.
      </Box>
    );

  if (isError || startError)
    return (
      <Box color="text.secondary" sx={{ padding: '20px' }}>
        Fetching Error
      </Box>
    );

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
        {isLoading || isLoadingStart
          ? 'Loading...'
          : `총 주문금액: ${totalPrice(tbOrderList)?.toLocaleString('ko-KR')} ₩`}
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
          {isLoading || isLoadingStart ? (
            Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  animation="wave"
                  width="100%"
                  height="fit-content"
                  sx={{ bgcolor: 'grey.900' }}
                >
                  <FianlLineLayout
                    data={{ order_idx: '1', tb_idx: 1, menu: [], complete: false, pay: false }}
                  />
                </Skeleton>
              ))
          ) : tbOrderList?.length === 0 ? (
            <Empty title="주문내역이 없습니다." />
          ) : (
            tbOrderList?.map((el, index) => <FianlLineLayout key={el.order_idx} data={el} />)
          )}
        </Container>
      </MainContainer>
    </>
  );
};

export default Fianl;
