'use client';
import ButtonWide from '@/components/buttons/ButtonWide';
import ContentBox from '@/components/layout/ContentBox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { FINDING_TYPE, SUB_CATEGORY_TYPE } from '@/constant/TYPE';
import Empty from '@/components/Empty';

const MainContainer = styled('main')`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 30px;
  top: 50%;
  transform: translateY(-50%);
`;

const Recommend = () => {
  const search = useSearchParams();
  const userClass = search.get('class');
  const choice = search.get('choice');

  const router = useRouter();

  const finding_idx =
    userClass === 'Beginner'
      ? FINDING_TYPE.BEGINNER
      : userClass === 'Explorer'
        ? FINDING_TYPE.EXPLORER
        : FINDING_TYPE.OLDWATER;

  const sub_category_idx =
    choice === '몰트 위스키 류'
      ? SUB_CATEGORY_TYPE.MALT
      : choice === '아메리칸 위스키 류'
        ? SUB_CATEGORY_TYPE.AMERICAN
        : choice === '와인 류'
          ? SUB_CATEGORY_TYPE.WINE
          : choice === '브랜디 꼬냑 류'
            ? SUB_CATEGORY_TYPE.BRANDY
            : choice === '럼 류'
              ? SUB_CATEGORY_TYPE.RUM
              : SUB_CATEGORY_TYPE.TEQUILA;

  // 인트로문구 패칭
  const { data: { data: introTextData } = { data: undefined }, isError: introIsError } =
    useQueryInstance<{ data: FindingIntroType }>({
      queryKey: [QUERY_KEY.FINDING_INTRO, String(finding_idx)],
      apiMethod: 'get',
      apiEndPoint: USE_QUERY_POINT.FINDING_INTRO,
      apiQueryParams: {
        finding_idx,
      },
    });

  // 주류별 하위메뉴 불러오기
  const {
    data: { data: { section_list: sectionListData } } = { data: { section_list: [] } },
    isError: sectionListError,
  } = useQueryInstance<{ data: FindingSectionType }>({
    queryKey: [QUERY_KEY.FINDING_SECTION_LIST, String(finding_idx), String(sub_category_idx)],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.FINDING_SECTION_LIST,
    apiQueryParams: {
      finding_idx,
      sub_category_idx,
    },
  });

  if (introIsError || sectionListError)
    return <Box sx={{ color: 'text.secondary', padding: '20px' }}>Fetching Error</Box>;

  return (
    <MainContainer>
      <Box>
        <Box
          position="relative"
          width="25%"
          margin="auto"
          bgcolor="background.paper"
          borderRadius="50%"
          textAlign="center"
          marginBottom="10px"
        >
          <Image
            src={
              userClass === 'Beginner'
                ? '/img/beginner_icon.png'
                : userClass === 'Explorer'
                  ? '/img/explorer_icon.png'
                  : '/img/old_water_icon.png'
            }
            width={50}
            height={50}
            alt="유저등급아이콘"
            style={{
              padding: '5px 5px 0px 5px',
              width: '80%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box marginBottom="20px">
          <Typography
            textAlign="center"
            color="text.secondary"
            fontWeight="700"
            marginBottom="10px"
            sx={{ fontSize: { xs: '5vw', md: '45px' } }}
          >
            {userClass === 'Beginner' ? '초심자' : userClass === 'Explorer' ? '탐험가' : '고인물'}
          </Typography>
          <ContentBox>
            <Typography color="text.secondary" sx={{ fontSize: { xs: '3.5vw', md: '31px' } }}>
              {introTextData?.intro_text}
            </Typography>
          </ContentBox>
        </Box>

        <Box display="flex" flexDirection="column" maxHeight="26vh" overflow="scroll" gap="5px">
          {sectionListData?.length === 0 ? (
            <Empty title="등록된 카테고리가 없습니다." />
          ) : (
            sectionListData?.map((el, index) => (
              <ButtonWide
                padding="3%"
                key={index}
                onClickEvent={() =>
                  router.push(
                    `/main/find/category/recommend/section?class=${userClass}&choice=${choice}&section=${el._id}&section_name=${el.title}`,
                  )
                }
              >
                <Typography
                  textAlign="center"
                  fontWeight="700"
                  sx={{ fontSize: { xs: '4.5vw', md: '40px' } }}
                >
                  {el.title}
                </Typography>
              </ButtonWide>
            ))
          )}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default Recommend;
