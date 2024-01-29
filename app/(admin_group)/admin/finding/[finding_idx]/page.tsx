'use client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useRef, useState } from 'react';
import ContentBox from '@/components/layout/ContentBox';
import { FaRegEdit } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { COLORS } from '@/asset/style';
import InputText from '@/components/inputs/InputText';
import { usePopup } from '@/hook/usePopup/usePopup';
import Selector from '@/components/Selector';
import { FINDING_IDX, FINDING_SUB_CATEGORIES } from '@/constant/FINDING_MY_TASTE_LIST';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { useMutationInstance } from '@/react-query/useMutationInstance';

const FindLayout = ({ params }: { params: { finding_idx: string } }) => {
  const finding_idx = Number(params.finding_idx);

  const { openPopup } = usePopup();

  const introTextRef = useRef<HTMLInputElement>(null);
  const [introEdit, setIntroEdit] = useState<boolean>(false);
  // sub카테고리 선택
  const [subCategory, setSubCategory] = useState<number>(100);

  // 인트로문구
  const {
    data: { data: introTextData },
    isError: introIsError,
    refetch: introRefetch,
  } = useQueryInstance({
    queryKey: [QUERY_KEY.FINDING_INTRO, String(finding_idx)],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.FINDING_INTRO,
    apiQueryParams: {
      finding_idx,
    },
  });

  // 인트로 문구 수정
  const { mutate: editIntroTextAPI } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.FINDING_INTRO,
    onSuccessFn: () => {
      introRefetch();
      setIntroEdit(false);
    },
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
  });

  // 주류별 하위메뉴 불러오기
  const {
    data: { data: sectionListData },
    isError: sectionListError,
    refetch: sectionListRefetch,
  } = useQueryInstance({
    queryKey: [QUERY_KEY.FINDING_SECTION_LIST, String(finding_idx), String(subCategory)],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.FINDING_SECTION_LIST,
    apiQueryParams: {
      finding_idx,
      sub_category_idx: subCategory,
    },
  });

  console.log(sectionListData);

  // 문구 수정 핸들러
  const introEditConfirmHandler = async () => {
    const textValue = introTextRef.current?.value.replace(/\n/g, ' ');

    if (!textValue) return openPopup({ title: '오류', content: '인트로 문구를 작성해주세요.' });

    if (textValue !== introTextData?.intro_text && textValue?.length > 50)
      return openPopup({ title: '오류', content: '띄어쓰기 포함 50자 이내로 작성해주세요.' });

    if (textValue === introTextData?.intro_text) return setIntroEdit(false);

    editIntroTextAPI({ apiBody: { finding_idx, intro_text: textValue } });
  };

  if (introIsError || sectionListError) return <Box color="text.secondary">Fetching Error</Box>;

  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 20px', sm: '40px 50px' } }}>
      <Typography color="text.secondary" fontSize="14px" fontWeight={600}>
        *
        {finding_idx === FINDING_IDX.BEGINNER
          ? '초심자'
          : finding_idx === FINDING_IDX.EXPLORER
            ? '탐험가'
            : '고인물'}{' '}
        인트로 문구 -
      </Typography>
      <ContentBox
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          alignItems: 'center',
          padding: '10px 20px',
          marginBottom: '20px',
        }}
      >
        {/* 50자 한도 */}
        {!introEdit ? (
          <Typography color="text.secondary" fontSize="14px">
            {introTextData?.intro_text}
          </Typography>
        ) : (
          <InputText
            title="수정 중"
            labelSx={{ fontSize: '14px' }}
            textSx={{
              color: 'text.secondary',
              fontSize: '14px',
            }}
            conSx={{ padding: '0' }}
            defaultValue={introTextData?.intro_text}
            multiline
            ref={introTextRef}
          />
        )}
        <Box>
          {!introEdit ? (
            <FaRegEdit
              color={COLORS.text.secondary}
              size={22}
              style={{ cursor: 'pointer' }}
              onClick={() => setIntroEdit(true)}
            />
          ) : (
            <GiConfirmed
              color={COLORS.text.secondary}
              size={25}
              style={{ cursor: 'pointer' }}
              onClick={introEditConfirmHandler}
            />
          )}
        </Box>
      </ContentBox>

      <Box>
        <Selector
          value={subCategory}
          onChangeEvent={(e) => setSubCategory(e.target.value as number)}
          optionArr={FINDING_SUB_CATEGORIES}
        />
        <Box></Box>
      </Box>
    </Box>
  );
};

export default React.memo(FindLayout);
