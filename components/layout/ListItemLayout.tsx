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
  category: string;
  option: { label: string; value: number; price: number }[] | [];
  onClickDelete?: () => void;
  desc?: string;
}

const ListItemLayout = ({
  img_url,
  pd_name,
  price,
  desc,
  onClickDelete,
  category,
  option,
}: ListItemLayoutProps) => {
  return (
    <ContentBox>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography color="text.secondary" fontWeight={700} textAlign="left" padding="10px">
          <span style={{ position: 'relative', fontWeight: '400', marginRight: '5px' }}>Menu:</span>{' '}
          {category}
        </Typography>
        <Box
          onClick={onClickDelete}
          sx={{
            textAlign: 'right',
            flex: '0.08',
            justifySelf: 'right',
            cursor: 'pointer',
            height: 'fit-content',
          }}
        >
          <ImCancelCircle color={COLORS.text.secondary} size={30} />
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          gap: '10px',
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
            flex: '0.6',
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
            boxSizing: 'border-box',
            width: { xs: '90%', md: 'auto' },
            height: '150px',
            bgcolor: 'divider',
            color: 'text.secondary',
            borderRadius: '10px',
            padding: '10px',
            margin: { xs: '20px auto', md: '0' },
          }}
        >
          <Typography
            fontSize="14px"
            sx={{
              wordBreak: 'break-all',
              height: '130px',
              overflow: 'scroll',
            }}
          >
            - 옵션 - <br />
            {option?.length === 0
              ? ''
              : option?.map((el, index) =>
                  index !== 0 ? (
                    <React.Fragment key={el.value}>
                      <span>{`${el.label}: ${el.price.toLocaleString('ko-KR')}`}</span>
                      <br />
                    </React.Fragment>
                  ) : null,
                )}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: '0.5',
            boxSizing: 'border-box',
            width: { xs: '90%', md: 'auto' },
            height: '150px',
            bgcolor: 'divider',
            color: 'text.secondary',
            borderRadius: '10px',
            padding: '10px',
            margin: { xs: '20px auto', md: '0' },
          }}
        >
          <Typography
            fontSize="14px"
            sx={{
              wordBreak: 'break-all',
              height: '130px',
              overflow: 'scroll',
              lineHeight: '1.5',
            }}
          >
            {desc}
          </Typography>
        </Box>
      </Box>
    </ContentBox>
  );
};

export default React.memo(ListItemLayout);
