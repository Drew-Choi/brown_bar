'use client';
import ContentBox from '@/components/layout/ContentBox';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import React, { FormEvent, KeyboardEvent, ReactNode, RefObject, useRef, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { FaPlus } from 'react-icons/fa6';
import InputText from '@/components/inputs/InputText';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import Empty from '@/components/Empty';
import { useRouter } from 'next/navigation';
import LoadingMenuWrite from './loading';
import CollapseBarMap from '@/components/layout/CollapseBarMap';

const MenuWrite = () => {
  const { openPopup } = usePopup();

  // 메뉴명 수정시 사용자 입력 데이터 저장
  const editInputRef = useRef<{ [key: number | string]: HTMLInputElement | null }>({});

  // Collapse 액티브 체크
  const [openValues, setOpenValues] = useState<Record<number, boolean>>({});
  const oneDepthHandler = (idx: number) => {
    setOpenValues((cur) => ({ ...cur, [idx]: cur[idx] ? !cur[idx] : true }));
  };

  // 에딧 세팅
  const [onEdit, setOnEdit] = useState<Record<number, boolean>>({});
  const onEditHandler = (idx: number) => {
    setOnEdit((cur) => ({ ...cur, [idx]: cur[idx] ? !cur[idx] : true }));
    setOpenValues((cur) => ({ ...cur, [idx]: false }));
  };

  // 메뉴리스트 패칭
  const {
    data: { data: menuList },
    isError,
    refetch,
    isLoading,
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

  // 에딧 핸들러 및 API
  const { mutate: editAPI } = useMutationInstance({
    apiEndPoint: USE_MUTATE_POINT.MENU_EDIT,
    apiMethod: 'post',
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
    onSuccessFn: (response) => {
      if (response?.category_idx) {
        const idx = response.category_idx;
        setOnEdit((cur) => ({ ...cur, [idx]: false }));
        setOpenValues((cur) => ({ ...cur, [idx]: false }));
        refetch();
      }
    },
  });
  const submitEditHandler = (
    e: KeyboardEvent<HTMLInputElement> | null,
    category_idx: number,
    preName: string,
  ) => {
    if ((e && e.key === 'Enter') || !e) {
      if (preName === editInputRef.current[category_idx]?.value)
        return openPopup({ title: '오류', content: '변경사항이 없습니다.' });

      const new_label = editInputRef.current[category_idx]?.value;

      editAPI({ apiBody: { category_idx, new_label } });
    }
  };

  if (isError) return <Box color="text.secondary">Fetching Error</Box>;

  if (isLoading) return <LoadingMenuWrite />;

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
          padding: { xs: '20px 0px', sm: '20px' },
        }}
      >
        <InputText
          title="카테고리추가"
          ref={categoryLabelRef}
          textSx={{ flex: '9', fontSize: '18px', color: 'text.secondary' }}
        />
        <ButtonNomal type="submit" sx={{ flex: '1', padding: '10px 20px' }}>
          <FaPlus />
        </ButtonNomal>
      </Box>
      <ContentBox sx={{ padding: '20px' }}>
        {menuList?.length !== 0 ? (
          menuList?.map((el: MenuCategoryType) => (
            <CollapseBarMap
              key={el?.category_idx}
              onClickEditMode={() => onEditHandler(el.category_idx)}
              onClickRemove={() =>
                openPopup({
                  title: '안내',
                  content: (
                    <span style={{ whiteSpace: 'pre-line' }}>
                      {`[${el.label}]\n정말 삭제하시겠습니까?`}
                    </span>
                  ),
                  onConfirm: () => categoryDeleteAPI({ apiPathParams: el.category_idx }),
                })
              }
              onEdit={onEdit[el.category_idx]}
              openCollapseValue={openValues[el.category_idx]}
              onClickCollapse={() => !onEdit[el.category_idx] && oneDepthHandler(el.category_idx)}
              title={el.label}
              editModeTitle="카테고리명 수정"
              editInputRef={(dom) => {
                editInputRef.current[el.category_idx] = dom;
              }}
              onClickEditConfirm={() => {
                submitEditHandler(null, el.category_idx, el.label);
              }}
              onKeyDownEditConfirm={(e) => submitEditHandler(e, el.category_idx, el.label)}
            >
              <CollapseSubMenu
                el_category_idx={el?.category_idx}
                openValue={openValues[el.category_idx]}
              />
            </CollapseBarMap>
          ))
        ) : (
          <Empty title="등록된 메뉴판 카테고리가 없습니다." />
        )}
      </ContentBox>
    </Box>
  );
};

export default MenuWrite;

// Ui 개별성
const CollapseSubMenu = React.memo(
  ({ el_category_idx, openValue }: { el_category_idx: number; openValue: boolean }) => {
    const {
      data: { data: productList },
      isError,
      isLoading,
    } = useQueryInstance({
      queryKey: [QUERY_KEY.MENU_PRODUCT_LIST, String(el_category_idx)],
      apiEndPoint: USE_QUERY_POINT.PRODUCT_LIST,
      apiMethod: 'get',
      apiPathParams: el_category_idx,
      queryEnable: openValue,
    });
    const router = useRouter();

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
              onClick={() =>
                router.push(
                  `/admin/product/product_list/edit/${pd._id}?category_idx=${String(
                    pd.category_idx,
                  )}`,
                )
              }
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
