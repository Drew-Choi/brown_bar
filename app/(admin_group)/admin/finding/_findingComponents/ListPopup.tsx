import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ImCancelCircle, ImCross } from 'react-icons/im';
import { SxProps } from '@mui/material';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import axiosInstance from '@/axios/instance';
import useScrollObserver from '@/hook/useObserver/useScrollObserver';
import Grid from '@mui/material/Unstable_Grid2';
import InputText from '@/components/inputs/InputText';
import { FaSearch } from 'react-icons/fa';
import ContentBox from '@/components/layout/ContentBox';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { usePopup } from '@/hook/usePopup/usePopup';
import { PRODUCT_LIST_TYPE } from '@/constant/TYPE';

interface ListPopupProps {
  title?: string;
  onClickEvent?: () => void;
  titleSx?: SxProps;
  conSx?: SxProps;
  sectionTitle: string;
  sectionId: string;
}

const ListPopup = ({
  title = '',
  onClickEvent,
  titleSx,
  conSx,
  sectionTitle,
  sectionId,
}: ListPopupProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { openPopup } = usePopup();
  const queryClient = useQueryClient();

  const fetch = async ({ pageParam }: { pageParam: number }) => {
    const response = await axiosInstance.get(
      `product/list?page=${pageParam}&search=${searchTerm}&section_id=${sectionId}`,
    );

    return response;
  };

  const { data, status, fetchNextPage, hasNextPage, isFetching, isError, refetch } =
    useInfiniteQuery({
      queryKey: searchTerm
        ? [QUERY_KEY.PRODUCT_LIST, searchTerm, sectionId]
        : [QUERY_KEY.PRODUCT_LIST, sectionId],
      queryFn: fetch,
      initialPageParam: 1,
      getNextPageParam: (LastPage, allPage) => {
        if (LastPage.data.data?.length < 10) return undefined;

        const nextPage = allPage.length + 1;
        return nextPage;
      },
      select: (data) => {
        const newMessageList = data.pages.map((el) => el.data.data).flat();
        return newMessageList;
      },
    });

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSearchTerm = searchRef.current?.value;
    setSearchTerm(newSearchTerm ? newSearchTerm : '');
  };

  // 바텀 자동 패칭
  const { isInView, elementRef } = useScrollObserver({ isOnlyTop: false });

  useEffect(() => {
    if (isInView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  // 체크박스
  const [selected, setSelected] = useState<{ [key: string]: { value: boolean; name: string } }>({});

  const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>, id: string, name: string) => {
    const value = e.target?.checked;

    setSelected((cur) => ({ ...cur, [id]: { value, name } }));
  };

  const crossHandler = (id: string) => {
    setSelected((cur) => ({ ...cur, [id]: { value: false, name: cur[id].name } }));
  };

  // 상품등록 API
  const { mutate: addProductAPI } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.FINDING_ADD_PRODUCT,
    onSuccessFn: () => {
      refetch();
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY.PRODUCT_LIST, sectionId, String(PRODUCT_LIST_TYPE.IS_SUB_LIST)],
        exact: true,
      });
      setSelected({});
    },
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
  });
  // 상품등록 API 핸들러
  const addProductHandler = () => {
    const productIdList = Object.keys(selected).filter((key) => selected[key].value === true);

    addProductAPI({
      apiBody: {
        product_list: productIdList,
        section_id: sectionId,
      },
    });
  };

  if (isError) return <Box sx={{ padding: '20px' }}>Fetching Error</Box>;

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '300px',
        height: '500px',
        bgcolor: COLORS.divider,
        borderRadius: '10px',
        border: '1px solid white',
        zIndex: '900',
        top: '100px',
        left: '50%',
        transform: { xs: 'translateX(-50%)', sm: 'translateX(-20%)' },
        transition: '1s transform ease',
        ...conSx,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: COLORS.primary,
          borderRadius: '10px 10px 0 0',
          padding: '3px 5px',
        }}
      >
        <Typography sx={{ ...titleSx }}>{title}</Typography>
        <ImCancelCircle
          color={COLORS.text.secondary}
          size={20}
          style={{ cursor: 'pointer' }}
          onClick={onClickEvent}
        />
      </Box>

      <Typography
        sx={{
          bgcolor: COLORS.info,
          width: 'fit-content',
          fontSize: '15px',
          fontWeight: '700',
          padding: '3px 5px',
          borderRadius: '0 0 10px 0',
        }}
      >
        {sectionTitle}
      </Typography>

      <Box>
        <Box
          component="form"
          onSubmit={searchHandler}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 10px',
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

        <ContentBox
          sx={{
            width: '90%',
            minHeight: '50px',
            margin: 'auto',
            marginTop: '20px',
            gap: '10px',
          }}
        >
          {Object.keys(selected)
            .filter((el) => selected[el].value === true)
            .map((el) => ({ id: el, name: selected[el].name }))
            .map((el) => (
              <Box
                sx={{
                  display: 'inline-block',
                  position: 'relative',
                  bgcolor: 'background.paper',
                  borderRadius: '5px',
                  padding: '2px 12px',
                  margin: '5px',
                }}
                key={el.id}
              >
                <ImCross
                  size={12}
                  color={COLORS.error}
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    cursor: 'pointer',
                  }}
                  onClick={() => crossHandler(el.id)}
                />

                <Typography sx={{ fontSize: '14px' }}>{el.name}</Typography>
              </Box>
            ))}
        </ContentBox>

        <Box sx={{ marginTop: '5px', padding: '0 15px', textAlign: 'right' }}>
          <ButtonNomal
            sx={{ padding: '0', fontSize: '12px', fontWeight: '600' }}
            onClickEvent={addProductHandler}
          >
            등록
          </ButtonNomal>
        </Box>

        <Grid container rowSpacing={1} sx={{ width: '100%', padding: '20px 10px 30px 10px' }}>
          {data?.map((el: ProductNewListType) => (
            <Grid key={el._id} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <input
                  id={`checkbox_${el._id}`}
                  checked={selected[el._id]?.value ? selected[el._id].value : false}
                  type="checkBox"
                  style={{ flex: '1', cursor: 'pointer' }}
                  onChange={(e) => checkBoxHandler(e, el._id, el.pd_name)}
                />
                <Box
                  component="label"
                  htmlFor={`checkbox_${el._id}`}
                  sx={{
                    flex: '9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '15px',
                    bgcolor: 'background.paper',
                    padding: '5px 10px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <Typography sx={{ lineHeight: '1.2' }}>{el.pd_name}</Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {el.price?.toLocaleString('ko-KR')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}

          {status !== 'pending' && (
            <Grid xs={12} sx={{ visibility: 'hidden' }}>
              <div ref={elementRef} style={{ width: '0', height: '0', visibility: 'hidden' }} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(ListPopup);
