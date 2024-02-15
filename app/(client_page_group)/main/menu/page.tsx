'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { SelectChangeEvent, styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
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
import { useSetRecoilState } from 'recoil';
import { cartData } from '@/recoil/cart';
import DetailPopup from './_menuComponents/DetailPopup';
import { COLORS } from '@/asset/style';
import Empty from '@/components/Empty';
import { useIsStart } from '@/hook/useIsStart/useIsStart';

const MainContainer = styled('main')`
  position: relative;
  width: 100%;
  overflow: scroll;
`;

const Menu = () => {
  const { isStart, isError: startError, isLoading: isLoadingStart } = useIsStart();

  const [menuSelectorValue, setMenuSelectorValue] = useState<string | number | null>(null);
  // 상품디테일 팝업
  const [onProduct, setOnProduct] = useState<{
    on: boolean;
    _id: string;
    pd_name: string;
    price: number;
    desc: string;
    img_url: string;
    option_arr: ProductOptionType[];
  }>({
    on: false,
    _id: '',
    pd_name: '',
    price: 0,
    desc: '',
    img_url: '',
    option_arr: [],
  });

  const setMenuData = useSetRecoilState(cartData);

  // 메뉴리스트 부르기
  const { data: menuList = [], isLoading } = useQueryInstance<
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
    queryEnable: isStart,
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
    isLoading: infinitLoading,
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

  const addMenuHandler = useCallback(
    (
      el: {
        _id: string;
        pd_name: string;
        price: number;
        option_arr: ProductOptionType[];
      },
      optionValue: string | number,
      isPopup: boolean = false,
    ) => {
      const newMenuData: MenuType = {
        _id: el._id,
        pd_name: el.pd_name,
        price: el.price,
        ea: 1,
        option:
          optionValue === 0 || !optionValue
            ? {}
            : el.option_arr?.find((el) => el.value === optionValue),
      };

      const cartData = localStorage.getItem('cart');

      if (!cartData) {
        localStorage.setItem('cart', JSON.stringify([newMenuData]));
        setMenuData([newMenuData]);
        isPopup &&
          setOnProduct((cur) => ({
            ...cur,
            on: false,
            _id: '',
            pd_name: '',
            price: 0,
            desc: '',
            img_url: '',
            option_arr: [],
          }));
      } else {
        const cartDataParse: MenuType[] = JSON.parse(cartData);
        // // 이미 카트에 있는 메뉴 체크
        const isExisting = cartDataParse.some((menu: MenuType) =>
          menu.option
            ? menu.option?._id === newMenuData.option?._id && menu._id === newMenuData._id
            : menu._id === newMenuData._id,
        );

        let newArr: MenuType[] = [];
        if (isExisting) {
          newArr = cartDataParse.map((menu: MenuType) =>
            menu._id === newMenuData._id && menu.option?._id === newMenuData.option?._id
              ? { ...menu, ea: menu.ea + 1 }
              : menu,
          );
        } else {
          newArr = [...cartDataParse, newMenuData];
        }

        localStorage.setItem('cart', JSON.stringify(newArr));
        setMenuData(newArr);
        isPopup &&
          setOnProduct((cur) => ({
            ...cur,
            on: false,
            _id: '',
            pd_name: '',
            price: 0,
            desc: '',
            img_url: '',
            option_arr: [],
          }));
      }
    },
    [],
  );

  if (!isStart && !isLoading && !infinitLoading && !isLoadingStart)
    return (
      <Box color="text.secondary" sx={{ padding: '20px' }}>
        현재 영업이 종료되었습니다.
      </Box>
    );

  if (isError || startError)
    return (
      <Box color="text.secondary" sx={{ padding: '20px' }}>
        Fetching Error
      </Box>
    );

  return (
    <MainContainer>
      {onProduct.on && (
        <DetailPopup
          data={onProduct}
          onClickClose={() =>
            setOnProduct((cur) => ({
              ...cur,
              on: false,
              _id: '',
              pd_name: '',
              price: 0,
              desc: '',
              img_url: '',
              option_arr: [],
            }))
          }
          onClickAddCart={(data, optionValue) => addMenuHandler(data, optionValue, true)}
          titleSx={{
            color: COLORS.text.secondary,
            fontWeight: '600',
            fontSize: '15px',
          }}
        />
      )}
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
        {isLoading || isLoadingStart || infinitLoading ? (
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height="fit-content"
            sx={{ bgcolor: 'grey.900' }}
          >
            <Selector
              optionArr={[]}
              value={'loding...'}
              fontWeight="600"
              width="100%"
              xsFontSize="4vw"
              mdFontSize="35px"
              subText="메뉴 카테고리 선택"
            />
          </Skeleton>
        ) : (
          <Selector
            textAlign="center"
            optionArr={menuList}
            value={menuSelectorValue || 'loding...'}
            fontWeight="600"
            width="100%"
            xsFontSize="4vw"
            mdFontSize="35px"
            onChangeEvent={menuSelectorHandler}
            subText="메뉴 카테고리 선택"
            subSx={{ textAlign: 'center' }}
          />
        )}

        <Box sx={{ padding: '10px 10px', height: '60vh', overflowY: 'scroll' }}>
          {isLoading || isLoadingStart || infinitLoading ? (
            Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  animation="wave"
                  width="100%"
                  height="fit-content"
                  sx={{ bgcolor: 'grey.900', marginBottom: '10px' }}
                >
                  <MenuLineLayout
                    data={{
                      pd_name: 'aa',
                      desc: 'aa',
                      price: 100,
                      option_arr: [],
                    }}
                  />
                </Skeleton>
              ))
          ) : productList?.length === 0 ? (
            <Empty title="등록된 상품이 없습니다." />
          ) : (
            productList?.map((el: ProductNewListType, index: number) => (
              <MenuLineLayout
                conSx={{ marginBottom: '10px' }}
                data={el}
                key={index}
                onClickMenuPlus={(optionValue) => addMenuHandler(el, optionValue)}
                onClickProductName={() =>
                  setOnProduct((cur) => ({
                    ...cur,
                    on: true,
                    _id: el._id,
                    pd_name: el.pd_name,
                    price: el.price,
                    desc: el.desc,
                    img_url: el.img_url,
                    option_arr: el.option_arr,
                  }))
                }
              />
            ))
          )}
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
