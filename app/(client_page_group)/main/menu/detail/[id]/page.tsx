'use client';
import ContentBox from '@/components/layout/ContentBox';
import ImageLayout from '@/components/layout/ImageLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import React from 'react';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { USE_QUERY_POINT } from '@/constant/END_POINT';

const data = {
  name: 'BB&R',
  price: 13000,
  desc: '좋은 술 입니다.좋은 술 입니다.좋은 술 입니다.좋은 ',
  class: 'Beginner',
  chice: 'MaltWhiskey',
  sectionIdx: 1,
  img: '/img/test/test_image.jpeg',
  idx: 1,
};

const MainContainer = styled('main')`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
`;

const Detail = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    class: string;
    choice: string;
    section: string;
    section_name: string;
  };
}) => {
  const { id } = params;

  const { data: { data } = { data: undefined } } = useQueryInstance<{ data: ProductInfoType }>({
    queryKey: [QUERY_KEY.PRODUCT_DETAIL, id],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.PRODUCT_DETAIL,
    apiPathParams: id,
  });

  return (
    <MainContainer>
      <Typography
        color="text.secondary"
        marginBottom="5px"
        textAlign="center"
        sx={{ fontSize: { xs: '6vw', md: '54px' } }}
      >
        {data?.pd_name}
      </Typography>
      <Box width="50%" margin="auto">
        <ImageLayout src={data?.img_url ? data.img_url : ''} alt="제품사진" marginBottom="10px" />
      </Box>
      <ContentBox sx={{ height: '32vh', overflow: 'scroll' }}>
        <Typography padding={1} sx={{ fontSize: { xs: '4vw', md: '36px' } }} color="text.secondary">
          {data?.desc}
        </Typography>
      </ContentBox>
    </MainContainer>
  );
};

export default Detail;
