'use client';
import Box from '@mui/material/Box';
import React from 'react';
import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { After } from '@/asset/After';
import { Before } from '@/asset/Before';
import { convertUtcToKst } from '@/utils/mometDayAndTime';

const generateTotalPrice = (menuList: MenuType[]): number => {
  return menuList.reduce(
    (acc, menu) =>
      menu.option?.price
        ? (acc += (menu.price + menu.option.price) * menu.ea)
        : (acc += menu.price * menu.ea),
    0,
  );
};

const OrderHistoryCard = ({ orderInfo }: { orderInfo: OrderCardProps }) => {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '90%',
        padding: '20px',
        bgcolor: COLORS.info,
        margin: '20px auto',
        borderRadius: '10px',
        height: 'fit-content',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: '15px', color: 'text.primary' }}>
            주문번호: {orderInfo.order_idx}
          </Typography>{' '}
          <Typography sx={{ fontSize: '15px', color: 'text.primary' }}>
            날짜: {convertUtcToKst({ utcTime: orderInfo?.created_at, format: 'YYYY-MM-DD HH:mm' })}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '15px', color: 'text.primary' }}>
          {orderInfo.tb_idx}번 테이블
        </Typography>
      </Box>

      <Typography textAlign="right" sx={{ color: COLORS.text.primary }}>
        Total: {generateTotalPrice(orderInfo.menu).toLocaleString('ko-KR')} ₩
      </Typography>

      <Grid container rowGap={1} color="text.primary">
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
      <Box sx={{ width: '100%', height: '100px', overflowY: 'scroll', color: COLORS.text.primary }}>
        {orderInfo?.menu?.map((menu, menuIndex) => (
          <Grid container key={`complete_menu_${menuIndex}`} sx={{ marginBottom: '10px' }}>
            <Grid xs={4}>
              <Typography>
                {menu.pd_name}
                {menu.option?.label && (
                  <>
                    <br />
                    <span style={{ fontSize: '12px' }}>+옵션: {menu.option?.label}</span>
                  </>
                )}
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography textAlign="center" lineHeight="1">
                {(
                  (menu.option?.price ? menu.price + menu.option.price : menu.price) * menu.ea
                ).toLocaleString('ko-KR')}{' '}
                ₩ <br />
                <span style={{ fontSize: '12px' }}>
                  (
                  {(menu.option?.price
                    ? menu.price + menu.option.price
                    : menu.price
                  ).toLocaleString('ko-KR')}
                  )
                </span>
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography textAlign="center">{menu.ea.toLocaleString('ko-KR')} 개</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      {/* {menuList?.length !== 0 && (
        <Typography color={COLORS.divider} textAlign="right" sx={{ fontSize: '14px' }}>
          {orderDate}
        </Typography>
      )} */}
    </Box>
  );
};

export default React.memo(OrderHistoryCard);
