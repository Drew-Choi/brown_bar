'use client';
import { COLORS } from '@/asset/style';
import axiosInstance from '@/axios/instance';
import Empty from '@/components/Empty';
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

  const { data, error, status, fetchNextPage, hasNextPage, refetch, isFetching } = useInfiniteQuery(
    {
      queryKey: [QUERY_KEY.PRODUCT_LIST],
      queryFn: fetch,
      initialPageParam: 1,
      getNextPageParam: (LastPage, allPage) => {
        if (LastPage.data.data?.length < 10) return undefined;

        const nextPage = allPage.length + 1;
        return nextPage;
      },
    },
  );

  // 바텀 자동 패칭
  const { isInView, elementRef } = useScrollObserver({ isOnlyTop: false });

  useEffect(() => {
    if (isInView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  // 아이템삭제
  const { mutate: deleteAPI } = useMutationInstance({
    apiMethod: 'delete',
    apiEndPoint: USE_MUTATE_POINT.PRODUCT_DELETE,
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
    onSuccessFn: () => {
      openPopup({ title: '안내', content: '삭제 성공' });
      refetch();
    },
  });

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
        {data?.pages[0].data.data.length !== 0 ? (
          data?.pages.map((arr) =>
            arr.data.data.map((el: ProductNewListType) => (
              <Grid xs={12} key={el._id}>
                <ListItemLayout
                  onClickDelete={() =>
                    openPopup({
                      title: '안내',
                      content: (
                        <span style={{ whiteSpace: 'pre-line' }}>
                          {`[${el.pd_name}]\n정말 삭제하시겠습니까?`}
                        </span>
                      ),
                      onConfirm: () => deleteAPI({ apiPathParams: el._id }),
                    })
                  }
                  productData={el}
                />
              </Grid>
            )),
          )
        ) : (
          <Empty title="등록된 상품이 없습니다." />
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
