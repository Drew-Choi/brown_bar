import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ContentBox from '@/components/layout/ContentBox';
import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';

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
      { pd_name: '코일레', total_price: 100000, ea: 2 },
      { pd_name: '블랙러시안', total_price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 2,
    tb_idx: 1,
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
  return (
    <Grid container sx={{ width: '100%', boxSizing: 'border-box', padding: '30px' }}>
      <Grid xs={6}>
        <ContentBox
          sx={{
            borderRadius: '10px 0 0 10px',
            padding: 0,
            minHeight: '700px',
            bgcolor: '#cba77950',
            border: '1px solid' + COLORS.info,
            overflow: 'scroll',
          }}
        >
          <Typography
            color="text.primary"
            fontWeight={700}
            sx={{
              textAlign: 'center',
              fontSize: '24px',

              bgcolor: COLORS.info,
              borderRadius: '10px 0 0 10px',
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
            minHeight: '700px',
            overflow: 'scroll',
          }}
        >
          <Typography
            fontWeight={700}
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontSize: '24px',
              borderRadius: '0 10px 10px 0',
              bgcolor: COLORS.primary,
            }}
          >
            Complete
          </Typography>
        </ContentBox>
      </Grid>
    </Grid>
  );
};
export default Sales;

const OrderCard = ({ el }: { el: OrderCardProps }) => {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '80%',
        padding: '20px',
        bgcolor: COLORS.background.paper,
        margin: '10px auto',
        borderRadius: '10px',
      }}
    >
      {el.menu?.map((menu, index) => <Typography key={index}>{menu.pd_name}</Typography>)}
    </Box>
  );
};
