'use client';
import ContentBox from '@/components/layout/ContentBox';
import ImageLayout from '@/components/layout/ImageLayout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent, styled } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { useQueryClient } from '@tanstack/react-query';
import { PRODUCT_LIST_TYPE } from '@/constant/TYPE';
import Selector from '@/components/Selector';
import { COLORS } from '@/asset/style';
import { cartData } from '@/recoil/cart';
import { useSetRecoilState } from 'recoil';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { id } = params;
  const { section } = searchParams;
  const queryClient = useQueryClient();

  const setMenuData = useSetRecoilState(cartData);

  const [cacheData, setCacheData] = useState<ProductNewListType | null | undefined>(undefined);
  // 옵션 항목
  const [optionValue, setOptionValue] = useState<string | number>(0);
  const indiMenuOptionSelectorHandler = (e: SelectChangeEvent<string | number>) => {
    const value = e.target.value;
    setOptionValue(value);
  };

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

  const { data: { data } = { data: undefined } } = useQueryInstance<{ data: ProductNewListType }>({
    queryKey: [QUERY_KEY.PRODUCT_DETAIL, id],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.PRODUCT_DETAIL,
    apiPathParams: id,
    queryEnable: cacheData === null,
  });

  const addMenuHandler = useCallback(
    (
      el: { _id: string; pd_name: string; price: number; option_arr: ProductOptionType[] } | null,
    ) => {
      if (!el) return;

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
        setOptionValue(0);
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
        setOptionValue(0);
      }
    },
    [optionValue],
  );

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            (data && data.option_arr?.length !== 0) ||
            (cacheData && cacheData.option_arr?.length !== 0)
              ? 'space-between'
              : 'center',
          marginBottom: '10px',
        }}
      >
        <Typography color="text.secondary" fontSize="16px">
          {data
            ? (
                data?.price +
                (data.option_arr?.length !== 0
                  ? Number(data.option_arr?.find((el) => el.value === optionValue)?.price)
                  : 0)
              ).toLocaleString('ko-KR')
            : cacheData
              ? (
                  cacheData?.price +
                  (cacheData.option_arr?.length !== 0
                    ? Number(cacheData.option_arr?.find((el) => el.value === optionValue)?.price)
                    : 0)
                ).toLocaleString('ko-KR')
              : null}
          ₩
        </Typography>
        {(data && data.option_arr?.length !== 0) ||
        (cacheData && cacheData.option_arr?.length !== 0) ? (
          <Selector
            width="60%"
            value={optionValue}
            optionArr={data ? data?.option_arr : cacheData ? cacheData?.option_arr : []}
            onChangeEvent={indiMenuOptionSelectorHandler}
            height="30px"
            xsFontSize="13px"
            bgcolor={COLORS.divider}
          />
        ) : null}
      </Box>
      <ContentBox sx={{ height: '28vh', overflow: 'scroll' }}>
        <Typography
          padding={1}
          sx={{ fontSize: { xs: '4vw', md: '36px' }, wordBreak: 'break-all' }}
          color="text.secondary"
        >
          {data?.desc ? data.desc : cacheData?.desc}
        </Typography>
      </ContentBox>
      <Box sx={{ marginTop: '5px', marginBottom: '5px', textAlign: 'right' }}>
        <ButtonNomal
          sx={{ marginRight: '10px', padding: '5px 10px', fontSize: '12px', fontWeight: '600' }}
          onClickEvent={() => router.push('/main/menu')}
        >
          메뉴판
        </ButtonNomal>
        <ButtonNomal
          sx={{ padding: '5px 10px', fontSize: '12px', fontWeight: '600' }}
          onClickEvent={() => addMenuHandler(data ? data : cacheData ? cacheData : null)}
        >
          카트담기
        </ButtonNomal>
      </Box>
    </MainContainer>
  );
};

export default Detail;
