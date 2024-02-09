'use client';
import axiosInstance from '@/axios/instance';
import Empty from '@/components/Empty';
import ToTopButton from '@/components/buttons/ToTopButton';
import ListItemLayout from '@/app/(admin_group)/admin/product/_productComponents/ListItemLayout';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import useScrollObserver from '@/hook/useObserver/useScrollObserver';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import Grid from '@mui/material/Unstable_Grid2';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import InputText from '@/components/inputs/InputText';
import Box from '@mui/material/Box';
import { COLORS } from '@/asset/style';
import _ from 'lodash';

const ProductList = () => {
  const { openPopup } = usePopup();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetch = async ({ pageParam }: { pageParam: number }) => {
    const response = await axiosInstance.get(`product/list?page=${pageParam}&search=${searchTerm}`);

    return response;
  };

  const { data, status, fetchNextPage, hasNextPage, refetch, isFetching, isError } =
    useInfiniteQuery({
      queryKey: searchTerm ? [QUERY_KEY.PRODUCT_LIST, searchTerm] : [QUERY_KEY.PRODUCT_LIST],
      queryFn: fetch,
      initialPageParam: 1,
      getNextPageParam: (LastPage, allPage) => {
        if (LastPage.data.data?.length < 10) return undefined;

        const nextPage = allPage.length + 1;
        return nextPage;
      },
    });

  // 바텀 자동 패칭
  const { isInView, elementRef } = useScrollObserver({ isOnlyTop: false });

  useEffect(() => {
    const debounceAPI = _.debounce(() => {
      if (isInView) {
        !isFetching && hasNextPage && fetchNextPage();
      }
    }, 300);

    debounceAPI();

    return () => {
      debounceAPI.cancel();
    };
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  // 아이템삭제
  const { mutate: deleteAPI } = useMutationInstance<
    undefined,
    {
      id: string;
      img_url: string;
    }
  >({
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

  // 검색핸들ㄹ러
  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSearchTerm = searchRef.current?.value;
    setSearchTerm(newSearchTerm ? newSearchTerm : '');
  };

  if (isError) return;

  return (
    <>
      <div ref={navTopRef} style={{ height: '0', width: '0', visibility: 'hidden' }} />
      <Box
        component="form"
        onSubmit={searchHandler}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 30px',
          marginTop: '10px',
        }}
      >
        <InputText
          title="상품검색"
          labelSx={{ fontSize: '15px' }}
          textSx={{ color: 'text.secondary', fontSize: '15px' }}
          ref={searchRef}
        />
        <button
          type="submit"
          style={{
            display: 'block',
            position: 'relative',
            width: 'fit-content',
            height: 'fit-content',
            textDecoration: 'unset',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            marginBottom: '5px',
          }}
        >
          <FaSearch color={COLORS.text.secondary} size={15} />
        </button>
      </Box>
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
                      onConfirm: () =>
                        deleteAPI({
                          apiQueryParams: {
                            id: el._id,
                            img_url: el.img_url,
                          },
                        }),
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

      <ToTopButton onClickEvent={scrollToTarget} />
    </>
  );
};

export default ProductList;
