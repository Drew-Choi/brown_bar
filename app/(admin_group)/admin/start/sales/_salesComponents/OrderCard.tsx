import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';
import { After } from '@/asset/After';
import { Before } from '@/asset/Before';
import { TbLocationCheck } from 'react-icons/tb';
import { convertUtcToKst } from '@/utils/mometDayAndTime';
import { FaRegTrashCan } from 'react-icons/fa6';

const OrderCard = ({
  orderInfo,
  completeOnClick,
  deleteOnClick,
}: {
  orderInfo: OrderCardProps;
  completeOnClick?: () => void;
  deleteOnClick?: () => void;
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
      }}
    >
      {orderInfo?.order_idx && (
        <Typography textAlign="left" color={COLORS.divider} sx={{ fontSize: '14px' }}>
          {orderInfo?.order_idx}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <span style={{ fontWeight: '700', fontSize: '20px' }}>{orderInfo.tb_idx}</span> 번 테이블{' '}
          {'>'} <span style={{ fontWeight: '700', fontSize: '16px' }}>주문</span>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <FaRegTrashCan size={20} style={{ cursor: 'pointer' }} onClick={deleteOnClick} />
          <TbLocationCheck size={25} style={{ cursor: 'pointer' }} onClick={completeOnClick} />
        </Box>
      </Box>

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
        {orderInfo.menu?.map((menu, index) => (
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
      {orderInfo?.created_at && (
        <Typography textAlign="right" color={COLORS.divider} sx={{ fontSize: '14px' }}>
          {convertUtcToKst({ utcTime: orderInfo?.created_at, format: 'YYYY-MM-DD HH:mm' })}
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(OrderCard);
