'use client';
import React, { useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ContentBox from '@/components/layout/ContentBox';
import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';
import { After } from '@/asset/After';
import ToTopButton from '@/components/buttons/ToTopButton';
import { Before } from '@/asset/Before';

interface OrderCardProps {
  order_idx: number;
  tb_idx: number;
  menu: { pd_name: string; total_price: number; ea: number }[];
  complete: boolean;
  pay: boolean;
}

const data = [
  {
    order_idx: 1,
    tb_idx: 1,
    menu: [
      { pd_name: '코일레코일레코일레코일레코일레코일레코일레코일레', total_price: 100000, ea: 2 },
      { pd_name: '블랙러시안', total_price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 2,
    tb_idx: 2,
    menu: [
      { pd_name: '코일레', total_price: 100000, ea: 2 },
      { pd_name: '블랙러시안', total_price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 2,
    tb_idx: 2,
    menu: [
      { pd_name: '코일레', total_price: 100000, ea: 2 },
      { pd_name: '블랙러시안', total_price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 2,
    tb_idx: 2,
    menu: [
      { pd_name: '코일레', total_price: 100000, ea: 2 },
      { pd_name: '블랙러시안', total_price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 2,
    tb_idx: 2,
    menu: [
      { pd_name: '코일레', total_price: 100000, ea: 2 },
      { pd_name: '블랙러시안', total_price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
];

const tableData = [
  { tb_idx: 1, bar: false },
  { tb_idx: 2, bar: false },
  { tb_idx: 3, bar: true },
  { tb_idx: 4, bar: true },
];

const Sales = () => {
  //메뉴 탑으로 이동용
  const navTopRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (navTopRef.current) {
      navTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Grid
      container
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '30px',
        minHeight: '700px',
      }}
    >
      <div ref={navTopRef} />
      <Grid xs={6}>
        <ContentBox
          sx={{
            borderRadius: '10px 0 0 10px',
            padding: 0,
            bgcolor: '#cba77950',
            border: '1px solid' + COLORS.info,
            height: '100%',
          }}
        >
          <Typography
            color="text.primary"
            fontWeight={700}
            sx={{
              textAlign: 'center',
              fontSize: '24px',
              bgcolor: COLORS.info,
              borderRadius: '10px 0 0 0',
            }}
          >
            Order
          </Typography>

          {data?.map((el) => <OrderCard key={el.order_idx} el={el} />)}
        </ContentBox>
      </Grid>
      <Grid xs={6}>
        <ContentBox
          sx={{
            borderRadius: '0 10px 10px 0',
            padding: '0',
            height: '100%',
          }}
        >
          <Typography
            fontWeight={700}
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontSize: '24px',
              borderRadius: '0 10px 0 0',
              bgcolor: COLORS.primary,
            }}
          >
            Complete
          </Typography>
          {tableData?.map((el) => <CompleteCard key={el.tb_idx} tableData={el} orderData={data} />)}
        </ContentBox>
      </Grid>
      <ToTopButton onClickEvent={scrollToTarget} />
    </Grid>
  );
};
export default Sales;

const OrderCard = React.memo(({ el }: { el: OrderCardProps }) => {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '80%',
        padding: '20px',
        bgcolor: COLORS.background.paper,
        margin: '20px auto',
        borderRadius: '10px',
      }}
    >
      <Typography>
        <span style={{ fontWeight: '700', fontSize: '20px' }}>{el.tb_idx}</span> 번 테이블 {'>'}{' '}
        <span style={{ fontWeight: '700', fontSize: '16px' }}>주문</span>
      </Typography>
      <Grid container rowGap={1}>
        <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
          <After height="15px">
            <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
              메뉴
            </Typography>
          </After>
        </Grid>
        <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
          <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
            총가격
          </Typography>
        </Grid>
        <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
          <Before height="15px">
            <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
              수량
            </Typography>
          </Before>
        </Grid>
        {el.menu?.map((menu, index) => (
          <React.Fragment key={index}>
            <Grid xs={4}>
              <Typography>{menu.pd_name}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography textAlign="center">
                {menu.total_price.toLocaleString('ko-KR')} ₩
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography textAlign="center">{menu.ea.toLocaleString('ko-KR')} 개</Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
});
OrderCard.displayName = 'OrderCard';

const CompleteCard = React.memo(
  ({
    tableData,
    orderData,
  }: {
    tableData: { tb_idx: number; bar: boolean };
    orderData: {
      order_idx: number;
      tb_idx: number;
      menu: { pd_name: string; total_price: number; ea: number }[];
      complete: boolean;
      pay: boolean;
    }[];
  }) => {
    return (
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '80%',
          padding: '20px',
          bgcolor: COLORS.background.paper,
          margin: '20px auto',
          borderRadius: '10px',
          height: '300px',
        }}
      >
        <Typography>
          <span style={{ fontWeight: '700', fontSize: '20px' }}>{tableData.tb_idx}</span> 번 테이블
        </Typography>
        <Box sx={{ bgcolor: 'aqua', width: '100%', height: '230px', overflowY: 'scroll' }}></Box>
      </Box>
    );
  },
);

CompleteCard.displayName = 'CompleteCard';
