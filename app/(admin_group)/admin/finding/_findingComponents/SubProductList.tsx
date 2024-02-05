import React, { MouseEvent } from 'react';
import List from '@mui/material/List';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { PRODUCT_LIST_TYPE } from '@/constant/TYPE';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { COLORS } from '@/asset/style';
import { useRouter } from 'next/navigation';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { usePopup } from '@/hook/usePopup/usePopup';
import { FaMinus } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';

const SubProductList = ({
  sectionId,
  sectionTitle,
}: {
  sectionId: string;
  sectionTitle: string;
}) => {
  const router = useRouter();
  const { openPopup } = usePopup();
  const queryClient = useQueryClient();

  const {
    data: { data: subProductList },
    refetch,
    isLoading,
    isError,
  } = useQueryInstance({
    queryKey: [QUERY_KEY.PRODUCT_LIST, sectionId, String(PRODUCT_LIST_TYPE.IS_SUB_LIST)],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.PRODUCT_LIST,
    apiQueryParams: {
      section_id: sectionId,
      type: PRODUCT_LIST_TYPE.IS_SUB_LIST,
    },
  });

  const { mutate: removeSubProductAPI } = useMutationInstance({
    apiMethod: 'delete',
    apiEndPoint: USE_MUTATE_POINT.FINDING_DELETE_PRODUCT,
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
    onSuccessFn: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.PRODUCT_LIST, sectionId], exact: true });
      refetch();
    },
  });

  const removeHandler = (
    e: MouseEvent<HTMLOrSVGElement>,
    productId: string,
    productName: string,
  ) => {
    e.stopPropagation();

    openPopup({
      title: '안내',
      content: `[${sectionTitle}]에서 '${productName}'상품을 삭제하시겠습니까?`,
      onConfirm: () => {
        removeSubProductAPI({
          apiQueryParams: {
            product_id: productId,
            section_id: sectionId,
          },
        });
      },
    });
  };

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
        <Box component="li" color="text.primary">
          Loading...
        </Box>
      ) : isError ? (
        <Box component="li" color="text.primary">
          Fetching Error
        </Box>
      ) : subProductList?.length === 0 ? (
        <ListItemButton dense component="li" sx={{ whiteSpace: 'nowrap' }}>
          등록된 상품이 없습니다.
        </ListItemButton>
      ) : (
        subProductList?.map((pd: SubProductList) => (
          <ListItemButton
            key={pd._id}
            dense
            component="li"
            sx={{
              display: 'block',
              width: '100%',
              bgcolor: COLORS.info,
              marginBottom: '10px',
              borderBottom: '1px solid #7d7d7d',
              borderRadius: '10px',
            }}
            onClick={() =>
              router.push(
                `/admin/product/product_list/edit/${pd._id}?type=${String(
                  PRODUCT_LIST_TYPE.IS_SUB_LIST,
                )}`,
              )
            }
          >
            <Box sx={{ textAlign: 'right' }}>
              <FaMinus
                style={{ cursor: 'pointer', zIndex: '10' }}
                onClick={(e: MouseEvent<HTMLOrSVGElement>) => removeHandler(e, pd._id, pd.pd_name)}
              />
            </Box>
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
          </ListItemButton>
        ))
      )}
    </List>
  );
};

export default React.memo(SubProductList);
