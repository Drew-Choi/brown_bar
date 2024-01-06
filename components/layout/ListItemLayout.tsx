import Box from '@mui/material/Box';
import React from 'react';
import ImageLayout from './ImageLayout';
import ContentBox from './ContentBox';
import { Typography } from '@mui/material';
import { ImCancelCircle } from 'react-icons/im';
import { COLORS } from '@/asset/style';

interface ListItemLayoutProps {
  img_url: string;
  pd_name: string;
  price: number;
  desc?: string;
  onClickDelete?: () => void;
}

const ListItemLayout = ({ img_url, pd_name, price, desc, onClickDelete }: ListItemLayoutProps) => {
  return (
    <ContentBox
      sx={{
        display: { xs: 'block', md: 'flex' },
        gap: '30px',
      }}
    >
      <Box
        onClick={onClickDelete}
        sx={{
          display: { xs: 'block', md: 'none' },
          textAlign: 'right',
          flex: '0.08',
          justifySelf: 'right',
          cursor: 'pointer',
          height: 'fit-content',
        }}
      >
        <ImCancelCircle color={COLORS.text.secondary} size={30} />
      </Box>
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
      <Box
        onClick={onClickDelete}
        sx={{
          display: { xs: 'none', md: 'block' },
          textAlign: 'right',
          flex: '0.08',
          justifySelf: 'right',
          cursor: 'pointer',
          height: 'fit-content',
        }}
      >
        <ImCancelCircle color={COLORS.text.secondary} size={30} />
      </Box>
    </ContentBox>
  );
};

export default React.memo(ListItemLayout);
