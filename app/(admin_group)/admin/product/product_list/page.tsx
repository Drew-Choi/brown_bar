'use client';
import { COLORS } from '@/asset/style';
import axiosInstance from '@/axios/instance';
import ListItemLayout from '@/components/layout/ListItemLayout';
import Cork from '@/components/svg/Cork';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import useScrollObserver from '@/hook/useObserver/useScrollObserver';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';

const ProductList = () => {
  const { openPopup } = usePopup();

  const fetch = async ({ pageParam }: { pageParam: number }) => {
    const response = await axiosInstance.get(`product/list?page=${pageParam}`);

    return response;
  };

  const { data, error, status, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: [QUERY_KEY.PRODUCT_LIST],
    queryFn: fetch,
    initialPageParam: 1,
    getNextPageParam: (LastPage, allPage) => {
      const nextPage = LastPage.data.data.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  // 아이템삭제
  const { mutate: deleteApi } = useMutationInstance({
    apiMethod: 'delete',
    apiEndPoint: USE_MUTATE_POINT.PRODUCT_DELETE,
    onErrorFn: (err: any) => {
      console.error(err);
      return openPopup({ title: '오류', content: err.response.data.message });
    },
    onSuccessFn: () => {
      openPopup({ title: '안내', content: '삭제 성공' });
      refetch();
    },
  });

  // 바텀 자동 패칭
  const { isInView, elementRef } = useScrollObserver({ isOnlyTop: false });

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage]);

  //메뉴 탑으로 이동용
  const navTopRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (navTopRef.current) {
      navTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (error) return;

  return (
    <>
      <div ref={navTopRef} style={{ height: '0', width: '0', visibility: 'hidden' }} />
      <Grid container rowSpacing={2} sx={{ width: '100%', padding: '30px' }}>
        {data?.pages.map((arr) =>
          arr.data.data.map((el: ProductInfoType) => (
            <Grid xs={12} key={el._id}>
              <ListItemLayout
                onClickDelete={() =>
                  openPopup({
                    title: '안내',
                    content: `[${el.pd_name}] 상품을 삭제하시겠습니까?`,
                    onConfirm: () => deleteApi({ apiPathParams: el._id }),
                  })
                }
                img_url={el.img_url}
                pd_name={el.pd_name}
                price={el.price}
                desc={el.desc}
              />
            </Grid>
          )),
        )}
        {status !== 'pending' && (
          <Grid xs={12} sx={{ visibility: 'hidden' }}>
            <div ref={elementRef} style={{ width: '0', height: '0', visibility: 'hidden' }} />
          </Grid>
        )}
      </Grid>

      {/* 상단으로 돌아가기 */}

      <Box
        onClick={scrollToTarget}
        sx={{
          position: 'fixed',
          bottom: '10px',
          right: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'rotate(180deg)',
          cursor: 'pointer',
          bgcolor: '#84848442',
          borderRadius: '10px',
          padding: '3px',
        }}
      >
        <Cork
          pointerColor={COLORS.primary}
          sx={{
            position: 'relative',
            display: 'block',
          }}
        />
        <Typography sx={{ transform: 'rotate(180deg)', color: 'text.secondary' }}>
          to Top
        </Typography>
      </Box>
    </>
  );
};

export default ProductList;
