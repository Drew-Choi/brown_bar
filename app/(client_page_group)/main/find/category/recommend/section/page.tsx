'use client';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ContentBox from '@/components/layout/ContentBox';
import { useRouter, useSearchParams } from 'next/navigation';
import ImageLayout from '@/components/layout/ImageLayout';
import Typography from '@mui/material/Typography';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { PRODUCT_LIST_TYPE } from '@/constant/TYPE';
import Empty from '@/components/Empty';

const MainContainer = styled('main')`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-height: 57.5vh;
  padding: 20px;
  overflow: scroll;
`;

const Section = () => {
  const search = useSearchParams();

  const choice = search.get('choice');
  const userClass = search.get('class');
  const section = search.get('section');
  const section_name = search.get('section_name');

  const router = useRouter();

  const { data: { data: subProductList } = { data: [] }, isError } = useQueryInstance<{
    data: ProductNewListType[];
  }>({
    queryKey: [QUERY_KEY.PRODUCT_LIST, section, String(PRODUCT_LIST_TYPE.IS_SUB_CLIENT_VEIW_LIST)],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.PRODUCT_LIST,
    apiQueryParams: {
      section_id: section,
      type: PRODUCT_LIST_TYPE.IS_SUB_CLIENT_VEIW_LIST,
    },
  });

  if (isError) return <Box sx={{ color: 'text.secondary', padding: '20px' }}>Fetching Error</Box>;

  return (
    <MainContainer>
      <Grid container spacing={2}>
        {subProductList?.length === 0 ? (
          <Empty title="등록된 상품이 없습니다." />
        ) : (
          subProductList?.map((el, index) => (
            <Grid
              xs={6}
              key={index}
              onClick={() =>
                router.push(
                  `/main/menu/detail/${el._id}?class=${userClass}&choice=${choice}&section=${section}&section_name=${section_name}`,
                )
              }
            >
              <ImageLayout priority={true} src={el.img_url} alt="제품사진" marginBottom="5px" />
              <ContentBox>
                <Typography
                  textAlign="center"
                  color="text.secondary"
                  fontWeight={700}
                  sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
                >
                  {el.pd_name}
                </Typography>
                <Typography
                  textAlign="center"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}
                >
                  {el.price.toLocaleString('ko-KR')} ₩
                </Typography>
              </ContentBox>
            </Grid>
          ))
        )}
      </Grid>
    </MainContainer>
  );
};

export default Section;
