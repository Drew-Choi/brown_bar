import React from 'react';
import Typography from '@mui/material/Typography';
import ContentBox from './ContentBox';
import Box from '@mui/material/Box';
import { COLORS } from '@/asset/style';

const FianlLineLayout = ({ data }: { data: OrderCardProps }) => {
  return (
    <ContentBox sx={{ border: 'none', backgroundColor: 'divider' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '5px',
        }}
      >
        <Typography
          color="text.secondary"
          gutterBottom={true}
          fontWeight={400}
          sx={{ fontSize: { xs: '3.5vw', md: '30px' } }}
        >
          주문번호: <span style={{ fontWeight: '600' }}>{data?.order_idx}</span>
        </Typography>
        <Typography
          color="text.secondary"
          gutterBottom={true}
          fontWeight={400}
          sx={{ fontSize: { xs: '3.5vw', md: '30px' } }}
        >
          테이블 번호: <span style={{ fontWeight: '600' }}>T {data?.tb_idx}</span>
        </Typography>
      </Box>
      <Box sx={{ maxHeight: '150px', overflowY: 'scroll' }}>
        {data.menu.map((menu) => (
          <Box
            key={menu._id}
            sx={{
              border: '1px solid' + COLORS.background.paper,
              borderRadius: '10px',
              marginBottom: '10px',
              padding: '0 5px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Typography
                color="text.secondary"
                textAlign="center"
                sx={{ fontSize: { xs: '3.5vw', md: '30px' } }}
              >
                {menu.pd_name}
              </Typography>
              <Typography
                color="text.secondary"
                textAlign="center"
                sx={{ fontSize: { xs: '3.8vw', md: '32px' } }}
              >
                {menu.ea} ea
              </Typography>
              <Typography
                color="text.secondary"
                textAlign="center"
                sx={{ fontSize: { xs: '4vw', md: '34px' } }}
              >
                {menu.option?.price
                  ? ((menu.price + menu.option?.price) * menu.ea)?.toLocaleString('ko-KR')
                  : (menu.price * menu.ea)?.toLocaleString('ko-KR')}{' '}
                ₩
              </Typography>
            </Box>
            <Box>
              {menu.option?.label && (
                <Typography
                  textAlign="right"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '3.2vw', md: '28px' },
                  }}
                >
                  옵션: {menu.option?.label}
                </Typography>
              )}
              <Typography
                textAlign="right"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '3.2vw', md: '28px' },
                }}
              >
                단가(+옵션가):{' '}
                {(menu.option?.price ? menu.price + menu.option.price : menu.price)?.toLocaleString(
                  'ko-KR',
                )}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </ContentBox>
  );
};

export default React.memo(FianlLineLayout);
