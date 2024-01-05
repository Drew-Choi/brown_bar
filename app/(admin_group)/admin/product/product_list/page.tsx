'use client';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import Grid from '@mui/material/Unstable_Grid2';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ProductList = () => {
  const search = useSearchParams();
  const skip = search.get('skip') ? search.get('skip') : '0';
  const limit = search.get('limit') ? search.get('limit') : '10';

  const {
    data: { data: prodcutList },
  } = useQueryInstance({
    queryKey: [QUERY_KEY.PRODUCT_LIST, skip, limit],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.PRODUCT_LIST,
    apiQueryParams: {
      skip,
      limit,
    },
  });

  return (
    <Grid container rowSpacing={2}>
      {prodcutList?.map((el: ProductInfoType, index: number) => (
        <Grid xs={12} color="white" key={index}>
          aaaaa
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
