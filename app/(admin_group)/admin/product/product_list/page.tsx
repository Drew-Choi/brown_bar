'use client';
import axiosInstance from '@/axios/instance';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import ListItemLayout from '@/components/layout/ListItemLayout';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { LastPage } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ProductList = () => {
  const fetch = async ({ pageParam }: { pageParam: number }) => {
    const response = await axiosInstance.get(`product/list?page=${pageParam}`);

    return response;
  };

  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.PRODUCT_LIST],
    queryFn: fetch,
    initialPageParam: 1,
    getNextPageParam: (LastPage, allPage) => {
      const nextPage = LastPage.data.data.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  return (
    <Grid container rowSpacing={2} sx={{ width: '100%', padding: '30px' }}>
      {data?.pages[0].data.data.map((el: ProductInfoType) => (
        <Grid xs={12} key={el._id}>
          <ListItemLayout
            img_url={el.img_url}
            pd_name={el.pd_name}
            price={el.price}
            desc={el.desc}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
