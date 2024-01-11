import Box from '@mui/material/Box';
import React from 'react';
import ImageLayout from './ImageLayout';
import ContentBox from './ContentBox';
import { Typography } from '@mui/material';
import { ImCancelCircle } from 'react-icons/im';
import { COLORS } from '@/asset/style';
import { FaRegEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface ListItemLayoutProps {
  onClickDelete?: () => void;
  productData: ProductNewListType;
}

const ListItemLayout = ({ onClickDelete, productData }: ListItemLayoutProps) => {
  const router = useRouter();

  return (
    <ContentBox>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography color="text.secondary" fontWeight={700} textAlign="left" padding="10px">
          <span style={{ position: 'relative', fontWeight: '400', marginRight: '5px' }}>Menu:</span>{' '}
          {productData?.category}
        </Typography>
        <Box
          sx={{
            textAlign: 'right',
            flex: '0.08',
            justifySelf: 'right',
            height: 'fit-content',
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <FaRegEdit
              color={COLORS.text.secondary}
              size={30}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/admin/product/product_list/edit/${productData._id}`)}
            />
            <ImCancelCircle
              color={COLORS.text.secondary}
              size={30}
              style={{ cursor: 'pointer' }}
              onClick={onClickDelete}
            />
          </Box>
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
          <ImageLayout priority={true} src={productData?.img_url} alt="상품이미지" />
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
            {productData?.pd_name}
          </Typography>
          <Typography gutterBottom>{productData?.price.toLocaleString('ko-KR')} ₩</Typography>
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
            {productData?.option_arr?.length === 0
              ? ''
              : productData?.option_arr?.map((el, index) =>
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
            {productData?.desc}
          </Typography>
        </Box>
      </Box>
    </ContentBox>
  );
};

export default React.memo(ListItemLayout);
