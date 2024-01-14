'use client';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ContentBox from '@/components/layout/ContentBox';
import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';
import { After } from '@/asset/After';
import ToTopButton from '@/components/buttons/ToTopButton';
import { Before } from '@/asset/Before';

type MenuType = {
  _id: string;
  pd_name: string;
  price: number;
  ea: number;
};

interface OrderCardProps {
  order_idx: number;
  tb_idx: number;
  menu: MenuType[];
  complete: boolean;
  pay: boolean;
}

interface TableDataProps {
  tb_idx: number;
  bar: boolean;
}

const data = [
  {
    order_idx: 1,
    tb_idx: 1,
    menu: [
      {
        _id: '1',
        pd_name: '코일레',
        price: 50000,
        ea: 2,
      },
      { _id: '2', pd_name: '블랙러시안', price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 2,
    tb_idx: 2,
    menu: [
      { _id: '1', pd_name: '코일레', price: 50000, ea: 1 },
      { _id: '2', pd_name: '블랙러시안', price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 3,
    tb_idx: 4,
    menu: [
      { _id: '1', pd_name: '코일레', price: 50000, ea: 2 },
      { _id: '2', pd_name: '블랙러시안', price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 4,
    tb_idx: 4,
    menu: [
      { _id: '1', pd_name: '코일레', price: 50000, ea: 2 },
      { _id: '2', pd_name: '블랙러시안', price: 13000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 5,
    tb_idx: 5,
    menu: [
      { _id: '1', pd_name: '코일레', price: 50000, ea: 2 },
      { _id: '2', pd_name: '블랙러시안', price: 13000, ea: 1 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 6,
    tb_idx: 1,
    menu: [
      { _id: '1', pd_name: '코일레', price: 50000, ea: 2 },
      { _id: '2', pd_name: '블랙러시안', price: 13000, ea: 1 },
      { _id: '3', pd_name: '데킬라', price: 10000, ea: 2 },
      { _id: '4', pd_name: '아메리카노', price: 11000, ea: 1 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 7,
    tb_idx: 1,
    menu: [
      { _id: '5', pd_name: '추주1', price: 25000, ea: 2 },
      { _id: '6', pd_name: '추주2', price: 9000, ea: 1 },
      { _id: '7', pd_name: '추주3', price: 5000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 8,
    tb_idx: 3,
    menu: [
      { _id: '5', pd_name: '추주1', price: 25000, ea: 2 },
      { _id: '6', pd_name: '추주2', price: 9000, ea: 1 },
      { _id: '7', pd_name: '추주3', price: 5000, ea: 2 },
    ],
    complete: false,
    pay: false,
  },
  {
    order_idx: 9,
    tb_idx: 5,
    menu: [
      { _id: '5', pd_name: '추주1', price: 25000, ea: 2 },
      { _id: '6', pd_name: '추주2', price: 9000, ea: 1 },
      { _id: '7', pd_name: '추주3', price: 5000, ea: 2 },
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
  { tb_idx: 5, bar: true },
];

const generateMenuList = (orderData: OrderCardProps[], tableData: TableDataProps): MenuType[] => {
  const menuFilter = orderData
    .filter((el) => el.tb_idx === tableData.tb_idx && el.complete)
    .map((el) => el.menu)
    .flat()
    .reduce((acc: { [key: string]: MenuType }, item: MenuType) => {
      if (!acc[item._id]) {
        acc[item._id] = { ...item, ea: 0 };
      }
      acc[item._id].ea += item.ea; // ea 합산
      return acc;
    }, {});

  return Object.values(menuFilter);
};

const generateTotalPrice = (menuList: MenuType[]): number => {
  return menuList.reduce((acc, menu) => (acc += menu.price * menu.ea), 0);
};

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
      <Grid xs={12} md={6}>
        <ContentBox
          sx={{
            borderRadius: { xs: '10px', md: '10px 0 0 0' },
            padding: 0,
            bgcolor: '#cba77950',
            border: '1px solid' + COLORS.info,
            marginBottom: { xs: '50px', md: '0' },
          }}
        >
          <Typography
            color="text.primary"
            fontWeight={700}
            sx={{
              textAlign: 'center',
              fontSize: '24px',
              bgcolor: COLORS.info,
              borderRadius: { xs: '10px 10px 0 0', md: '10px 0 0 0' },
            }}
          >
            Order
          </Typography>

          <Box
            sx={{ height: { xs: '1000px', md: '100%' }, overflowY: { xs: 'scroll', md: 'auto' } }}
          >
            {data?.map((el) => !el.complete && <OrderCard key={el.order_idx} el={el} />)}
          </Box>
        </ContentBox>
      </Grid>
      <Grid xs={12} md={6}>
        <ContentBox
          sx={{
            borderRadius: { xs: '10px', md: '0 10px 0 0' },
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
              borderRadius: { xs: '10px 10px 0 0', md: '0 10px 0 0' },
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
              <Typography textAlign="center" lineHeight="1">
                {(menu.price * menu.ea).toLocaleString('ko-KR')} ₩ <br />
                <span style={{ fontSize: '12px' }}>({menu.price.toLocaleString('ko-KR')})</span>
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
  ({ tableData, orderData }: { tableData: TableDataProps; orderData: OrderCardProps[] }) => {
    const [menuList, setMenuList] = useState<MenuType[]>([]);

    //데이터 셋
    useEffect(() => {
      if (orderData && tableData) {
        const newMenuList = generateMenuList(orderData, tableData);
        setMenuList(newMenuList);
      }
    }, [orderData, tableData]);

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
        <Typography>Total: {generateTotalPrice(menuList).toLocaleString('ko-KR')} ₩</Typography>

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
        </Grid>
        <Box sx={{ width: '100%', height: '180px', overflowY: 'scroll' }}>
          {menuList?.map((menu, menuIndex) => (
            <Grid container key={`complete_menu_${menuIndex}`}>
              <Grid xs={4}>
                <Typography>{menu.pd_name}</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography textAlign="center" lineHeight="1">
                  {(menu.price * menu.ea).toLocaleString('ko-KR')} ₩ <br />
                  <span style={{ fontSize: '12px' }}>({menu.price.toLocaleString('ko-KR')})</span>
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography textAlign="center">{menu.ea.toLocaleString('ko-KR')} 개</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    );
  },
);

CompleteCard.displayName = 'CompleteCard';
