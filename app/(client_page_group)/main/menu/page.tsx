'use client';
import React, { useEffect, useState } from 'react';
import { SelectChangeEvent, styled } from '@mui/material';
import Box from '@mui/material/Box';
import MenuLineLayout from '@/components/layout/MenuLineLayout';
import Container from '@mui/material/Container';
import Selector from '@/components/Selector';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import axiosInstance from '@/axios/instance';
import { useInfiniteQuery } from '@tanstack/react-query';
import useScrollObserver from '@/hook/useObserver/useScrollObserver';
import _ from 'lodash';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  overflow: scroll;
`;

const Menu = () => {
  const [menuSelectorValue, setMenuSelectorValue] = useState<string | number | null>(null);

  // 메뉴리스트 부르기
  const { data: menuList = [] } = useQueryInstance<
    {
      data: MenuCategoryType[];
    },
    { label: string; value: number }[]
  >({
    queryKey: [QUERY_KEY.MENU_LIST],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.MENU,
    selectFn: (data) => {
      return data.data?.map(({ category_idx, ...rest }: MenuCategoryType) => ({
        ...rest,
        value: category_idx,
      }));
    },
    onSuccessFn: (data) => {
      setMenuSelectorValue(data[0]?.value);
    },
  });

  const menuSelectorHandler = (e: SelectChangeEvent<string | number>) => {
    const value = e.target.value;
    setMenuSelectorValue(value);
  };

  // 카테고리별 메뉴
  const fetch = async ({ pageParam }: { pageParam: number }) => {
    const response = await axiosInstance.get(
      `product/list/${menuSelectorValue}?page=${pageParam}&is_client=1`,
    );

    return response;
  };

  const {
    data: productList,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.PRODUCT_LIST, menuSelectorValue],
    queryFn: fetch,
    initialPageParam: 1,
    getNextPageParam: (LastPage, allPage) => {
      if (LastPage.data.data?.length < 10) return undefined;

      const nextPage = allPage.length + 1;
      return nextPage;
    },
    select: (data) => {
      const newList = data.pages.map((el) => el.data.data).flat();
      return newList;
    },
    enabled: menuSelectorValue !== null,
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

  if (isError) return <Box>Fetching Error</Box>;

  return (
    <MainContainer>
      <Container
        sx={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px 10px',
          height: '60vh',
        }}
      >
        <Selector
          textAlign="center"
          // 나중에 데이터 받아야 함
          optionArr={menuList}
          value={menuSelectorValue || 'loding'}
          fontWeight="600"
          width="100%"
          xsFontSize="4vw"
          mdFontSize="35px"
          onChangeEvent={menuSelectorHandler}
          subText="메뉴 카테고리 선택"
          subSx={{ textAlign: 'center' }}
        />
        <Box sx={{ padding: '10px 10px', height: '60vh', overflowY: 'scroll' }}>
          {productList?.map((el, index) => <MenuLineLayout data={el} key={index} />)}
          {status !== 'pending' && (
            <div
              ref={elementRef}
              style={{
                position: 'relative',
                width: '0',
                height: '0',
                visibility: 'hidden',
              }}
            />
          )}
        </Box>
      </Container>
    </MainContainer>
  );
};

export default Menu;
