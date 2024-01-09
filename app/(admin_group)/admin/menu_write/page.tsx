'use client';
import ContentBox from '@/components/layout/ContentBox';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import React, { FormEvent, useRef, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import InputText from '@/components/inputs/InputText';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import Empty from '@/components/Empty';

//패칭해야함
const pdData = [
  {
    category_idx: 2,
    pd_datas: [
      {
        _id: 10,
        pd_name: 'zz',
        price: 30000,
        desc: '하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
    ],
  },
  {
    category_idx: 3,
    pd_datas: [
      {
        _id: 1,
        pd_name: '상품이름상품이름상품이름상품이름상품이름상품이름',
        price: 30000,
        desc: '하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
      {
        _id: 2,
        pd_name: '상품이름1',
        price: 30000,
        desc: '하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
      {
        _id: 3,
        pd_name: '상품이름2',
        price: 30000,
        desc: '하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
      {
        _id: 4,
        pd_name: '상품이름3',
        price: 30000,
        desc: '하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
    ],
  },
];
const MenuWrite = () => {
  const { openPopup } = usePopup();
  const [openValues, setOpenValues] = useState<Record<number, boolean>>({});

  // 메뉴리스트 패칭
  const {
    data: { data: menuList },
    isError,
    refetch,
  } = useQueryInstance({
    queryKey: [QUERY_KEY.MENU_LIST],
    apiEndPoint: USE_QUERY_POINT.MENU,
    apiMethod: 'get',
  });

  // 카테고리 추가 api
  const categoryLabelRef = useRef<HTMLInputElement>(null);
  const { mutate: addCategoryLabelAPI } = useMutationInstance({
    apiEndPoint: USE_MUTATE_POINT.MENU,
    apiMethod: 'post',
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
    onSuccessFn: () => {
      refetch();
      if (categoryLabelRef.current) {
        categoryLabelRef.current.value = '';
      }
    },
  });

  const addLabelHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryLabelRef.current?.value)
      return openPopup({ title: '오류', content: '카테고리명을 입력해주세요.' });

    return addCategoryLabelAPI({ apiBody: { label: categoryLabelRef.current?.value } });
  };

  // 카테고리 삭제 api(항목있음 삭제 불가)
  const { mutate: categoryDeleteAPI } = useMutationInstance({
    apiEndPoint: USE_MUTATE_POINT.MENU_DELETE,
    apiMethod: 'delete',
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

  // Collapse 액티브 체크
  const oneDepthHandler = (idx: number) => {
    setOpenValues((cur) => ({ ...cur, [idx]: cur[idx] ? !cur[idx] : true }));
  };

  // 하위 메뉴 상품리스트 클릭시 마다 개별로 부르는 함수

  if (isError) return <Box color="text.secondary">Fetching Error</Box>;

  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 20px', sm: '40px 50px' } }}>
      <Box
        component="form"
        onSubmit={addLabelHandler}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          textAlign: 'right',
          gap: '20px',
          padding: '20px',
        }}
      >
        <InputText
          title="카테고리추가"
          ref={categoryLabelRef}
          textSx={{ fontSize: '18px', color: 'text.secondary' }}
        />
        <ButtonNomal type="submit" sx={{ padding: '10px 20px' }}>
          <FaPlus />
        </ButtonNomal>
      </Box>
      <ContentBox sx={{ padding: '20px' }}>
        {menuList?.length !== 0 ? (
          menuList?.map((el: MenuCategoryType) => (
            <List
              key={el.category_idx}
              component="ul"
              sx={{
                fontSize: '16px',
                padding: '10px 0',
                marginBottom: '0px',
              }}
            >
              <Box component="li" sx={{ marginBottom: '10px' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <FaMinus
                    color={COLORS.text.secondary}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      openPopup({
                        title: '안내',
                        content: (
                          <div style={{ whiteSpace: 'pre-line' }}>
                            {`[${el.label}]\n정말 삭제하시겠습니까?`}
                          </div>
                        ),
                        onConfirm: () => categoryDeleteAPI({ apiPathParams: el.category_idx }),
                      })
                    }
                  />
                </Box>
                <ListItemButton
                  sx={{
                    gap: '10px',
                    justifyContent: 'space-between',
                    fontWeight: '600',
                    bgcolor: COLORS.primary,
                    borderRadius: '10px',
                  }}
                  selected={openValues[el.category_idx]}
                  onClick={() => oneDepthHandler(el.category_idx)}
                >
                  <Typography
                    sx={{ flex: '9', fontWeight: '600', fontSize: '16px', color: 'text.secondary' }}
                  >
                    {el.label}
                  </Typography>
                  {openValues[el.category_idx] ? (
                    <ExpandLess sx={{ flex: '1', justifySelf: 'right' }} />
                  ) : (
                    <ExpandMore sx={{ flex: '1', justifySelf: 'right' }} />
                  )}
                </ListItemButton>
                <Collapse
                  sx={{
                    bgcolor: COLORS.info,
                    width: '95%',
                    margin: 'auto',
                    borderRadius: '0 0 10px 10px',
                  }}
                  in={openValues[el.category_idx] || false}
                  timeout="auto"
                  unmountOnExit
                >
                  <CollapseSubMenu
                    el_category_idx={el.category_idx}
                    openValues={openValues[el.category_idx]}
                  />
                </Collapse>
              </Box>
            </List>
          ))
        ) : (
          <Empty title="등록된 메뉴판 카테고리가 없습니다." />
        )}
      </ContentBox>
    </Box>
  );
};

export default MenuWrite;

const CollapseSubMenu = React.memo(
  ({ el_category_idx, openValues }: { el_category_idx: number; openValues: boolean }) => {
    const {
      data: { data: productList },
      isError,
      isLoading,
    } = useQueryInstance({
      queryKey: [QUERY_KEY.MENU_PRODUCT_LIST, el_category_idx],
      apiEndPoint: USE_QUERY_POINT.PRODUCT_LIST,
      apiMethod: 'get',
      apiPathParams: el_category_idx,
      queryEnable: openValues,
    });

    return (
      <List
        component="ul"
        sx={{
          position: 'relative',
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        {isLoading ? (
          <Box color="text.secondary">Loading...</Box>
        ) : isError ? (
          <Box color="text.secondary">Fetching Error</Box>
        ) : productList?.length === 0 ? (
          <ListItemButton dense component="li" sx={{ whiteSpace: 'nowrap' }}>
            등록된 상품이 없습니다.
          </ListItemButton>
        ) : (
          productList?.map((pd: ProductInfoType) => (
            <ListItemButton
              key={pd._id}
              dense
              component="li"
              sx={{
                display: 'block',
                width: '100%',
                bgcolor: COLORS.info,
                paddingBottom: '20px',
                marginBottom: '20px',
                borderBottom: '1px solid #7d7d7d',
                borderRadius: '10px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                <Typography sx={{ flex: '1' }}>{pd.pd_name}</Typography>
                <Typography sx={{ flex: '0.5', textAlign: 'center' }}>
                  {pd.price.toLocaleString('ko-KR')} ₩
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <Typography textAlign="left" flex={1.5} fontSize={14}>
                  {pd.desc}
                </Typography>
                <Typography textAlign="right" flex={1} fontSize={14}>
                  {pd.option_arr?.map(
                    (el, index) =>
                      index !== 0 && (
                        <React.Fragment key={el.value}>
                          {el.label}: {el.price.toLocaleString('ko-KR')} <br />
                        </React.Fragment>
                      ),
                  )}
                </Typography>
              </Box>
            </ListItemButton>
          ))
        )}
      </List>
    );
  },
);
CollapseSubMenu.displayName = 'CollapseSubMenu';
