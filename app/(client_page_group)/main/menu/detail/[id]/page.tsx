'use client';
import ContentBox from '@/components/layout/ContentBox';
import ImageLayout from '@/components/layout/ImageLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { useQueryClient } from '@tanstack/react-query';
import { PRODUCT_LIST_TYPE } from '@/constant/TYPE';

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
    section?: string;
  };
}) => {
  const { id } = params;
  const { section } = searchParams;
  const queryClient = useQueryClient();

  const [cacheData, setCacheData] = useState<ProductNewListType | null | undefined>(undefined);

  useEffect(() => {
    if (!section) return setCacheData(undefined);

    const cacheData: { data: ProductNewListType[] } | undefined = queryClient.getQueryData([
      QUERY_KEY.PRODUCT_LIST,
      section,
      String(PRODUCT_LIST_TYPE.IS_SUB_CLIENT_VEIW_LIST),
    ]);

    if (cacheData) {
      const productData = cacheData.data.filter((el) => el._id === id);
      productData ? setCacheData(productData[0]) : setCacheData(null);
    } else {
      setCacheData(null);
    }
  }, [section]);

  const { data: { data } = { data: undefined } } = useQueryInstance<{ data: ProductInfoType }>({
    queryKey: [QUERY_KEY.PRODUCT_DETAIL, id],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.PRODUCT_DETAIL,
    apiPathParams: id,
    queryEnable: cacheData === null,
  });

  return (
    <MainContainer>
      <Typography
        color="text.secondary"
        marginBottom="5px"
        textAlign="center"
        sx={{ fontSize: { xs: '6vw', md: '54px' } }}
      >
        {data?.pd_name ? data.pd_name : cacheData?.pd_name}
      </Typography>
      <Box width="50%" margin="auto">
        <ImageLayout
          priority
          src={data?.img_url ? data.img_url : cacheData?.img_url || '/'}
          alt="제품사진"
          marginBottom="10px"
        />
      </Box>
      <ContentBox sx={{ height: '32vh', overflow: 'scroll' }}>
        <Typography padding={1} sx={{ fontSize: { xs: '4vw', md: '36px' } }} color="text.secondary">
          {data?.desc ? data.desc : cacheData?.desc}
        </Typography>
      </ContentBox>
    </MainContainer>
  );
};

export default Detail;
