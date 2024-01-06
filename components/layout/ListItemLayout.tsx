import Box from '@mui/material/Box';
import React from 'react';
import ImageLayout from './ImageLayout';
import ContentBox from './ContentBox';
import { Typography } from '@mui/material';

interface ListItemLayoutProps {
  img_url: string;
  pd_name: string;
  price: number;
  desc?: string;
}

const ListItemLayout = ({ img_url, pd_name, price, desc }: ListItemLayoutProps) => {
  return (
    <ContentBox
      sx={{
        display: { xs: 'block', md: 'flex' },
        gap: '30px',
      }}
    >
      <Box
        sx={{
          width: { xs: '70%', md: '150px' },
          height: { xs: 'auto', md: '150px' },
          margin: { xs: '20px auto', md: '0' },
        }}
      >
        <ImageLayout priority={true} src={img_url} alt="상품이미지" />
      </Box>
      <Box
        sx={{
          flex: '0.8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          color: 'text.secondary',
        }}
      >
        <Typography gutterBottom fontWeight={600}>
          {pd_name}
        </Typography>
        <Typography gutterBottom>{price.toLocaleString('ko-KR')} ₩</Typography>
      </Box>
      <Box
        sx={{
          flex: '0.5',
          width: { xs: '90%', md: 'auto' },
          height: '150px',
          bgcolor: 'divider',
          color: 'text.secondary',
          padding: '10px 20px',
          overflow: 'scroll',
          borderRadius: '10px',
          margin: { xs: '20px auto', md: '0' },
        }}
      >
        <Typography fontSize="14px" sx={{ wordBreak: 'break-all' }}>
          {desc}
        </Typography>
      </Box>
    </ContentBox>
  );
};

export default React.memo(ListItemLayout);
