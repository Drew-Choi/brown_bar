'use client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { FormEvent, KeyboardEvent, useRef, useState } from 'react';
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
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { FaPlus } from 'react-icons/fa6';
import ListPopup from '@/app/(admin_group)/admin/finding/_findingComponents/ListPopup';
import CollapseBarMap from '@/components/layout/CollapseBarMap';
import Empty from '@/components/Empty';
import SubProductList from '@/app/(admin_group)/admin/finding/_findingComponents/SubProductList';
import { useQueryClient } from '@tanstack/react-query';
import { PRODUCT_LIST_TYPE } from '@/constant/TYPE';

const FindLayout = ({ params }: { params: { finding_idx: string } }) => {
  const finding_idx = Number(params.finding_idx);
  const queryClient = useQueryClient();

  const { openPopup } = usePopup();

  const introTextRef = useRef<HTMLInputElement>(null);
  const sectionTitle = useRef<HTMLInputElement>(null);
  const [introEdit, setIntroEdit] = useState<boolean>(false);
  // sub카테고리 선택
  const [subCategory, setSubCategory] = useState<number>(100);
  // 메뉴리스트팝업
  const [onProductList, setOnProductList] = useState<{ on: boolean; title: string; id: string }>({
    on: false,
    title: '',
    id: '',
  });

  // 섹션 컨트롤
  // 섹션명 수정시 사용자 입력 데이터 저장
  const editInputRef = useRef<{ [key: number | string]: HTMLInputElement | null }>({});

  // Collapse 액티브 체크
  const [openValues, setOpenValues] = useState<Record<string, boolean>>({});
  const oneDepthHandler = (idx: string) => {
    setOpenValues((cur) => ({ ...cur, [idx]: cur[idx] ? !cur[idx] : true }));
  };

  // 에딧 세팅
  const [onEdit, setOnEdit] = useState<Record<string, boolean>>({});
  const onEditHandler = (idx: string) => {
    setOnEdit((cur) => ({ ...cur, [idx]: cur[idx] ? !cur[idx] : true }));
    setOpenValues((cur) => ({ ...cur, [idx]: false }));
  };

  // 인트로문구
  const {
    data: { data: introTextData } = { data: undefined },
    isError: introIsError,
    refetch: introRefetch,
  } = useQueryInstance<{ data: FindingIntroType }>({
    queryKey: [QUERY_KEY.FINDING_INTRO, String(finding_idx)],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.FINDING_INTRO,
    apiQueryParams: {
      finding_idx,
    },
  });

  // 인트로 문구 수정
  const { mutate: editIntroTextAPI } = useMutationInstance<
    undefined,
    undefined,
    { finding_idx: number; intro_text: string }
  >({
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
  // 문구 수정 핸들러
  const introEditConfirmHandler = () => {
    const textValue = introTextRef.current?.value.replace(/\n/g, ' ');

    if (!textValue) return openPopup({ title: '오류', content: '인트로 문구를 작성해주세요.' });

    if (textValue !== introTextData?.intro_text && textValue?.length > 50)
      return openPopup({ title: '오류', content: '띄어쓰기 포함 50자 이내로 작성해주세요.' });

    if (textValue === introTextData?.intro_text) return setIntroEdit(false);

    editIntroTextAPI({ apiBody: { finding_idx, intro_text: textValue } });
  };

  // 주류별 하위메뉴 불러오기
  const {
    data: { data: { section_list: sectionListData } } = { data: { section_list: [] } },
    isError: sectionListError,
    refetch: sectionListRefetch,
  } = useQueryInstance<{ data: FindingSectionType }>({
    queryKey: [QUERY_KEY.FINDING_SECTION_LIST, String(finding_idx), String(subCategory)],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.FINDING_SECTION_LIST,
    apiQueryParams: {
      finding_idx,
      sub_category_idx: subCategory,
    },
  });

  // 주류별 하위 섹션 추가
  const { mutate: addSectionAPI } = useMutationInstance<
    undefined,
    undefined,
    {
      finding_idx: number;
      sub_category_idx: number;
      title: string;
    }
  >({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.FINDING_SECTION_LIST_ADD,
    onSuccessFn: () => {
      sectionListRefetch();
      if (sectionTitle.current) {
        sectionTitle.current.value = '';
      }
    },
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
  });
  // 섹션추가 핸들러
  const addSectionHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const textValue = sectionTitle.current?.value;

    if (!textValue) return openPopup({ title: '오류', content: '섹션명을 입력해주세요.' });

    if (textValue?.length > 20)
      return openPopup({ title: '오류', content: '띄어쓰기 포함 20자 이내로 작성해주세요.' });

    addSectionAPI({
      apiBody: {
        finding_idx,
        sub_category_idx: subCategory,
        title: textValue,
      },
    });
  };

  // 주류별 하위 섹션 수정
  const { mutate: editSectionAPI } = useMutationInstance<
    { data: string },
    undefined,
    { finding_idx: number; sub_category_idx: number; section_id: string; title: string | undefined }
  >({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.FINDING_SECTION_LIST_EDIT,
    onSuccessFn: (response) => {
      if (response?.data) {
        const id = response.data;
        setOnEdit((cur) => ({ ...cur, [id]: false }));
        setOpenValues((cur) => ({ ...cur, [id]: false }));
        sectionListRefetch();
      }
    },
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
  });
  //  주류별 하위 섹션 수정 핸들러
  const submitEditHandler = (
    e: KeyboardEvent<HTMLInputElement> | null,
    id: string,
    preName: string,
  ) => {
    if ((e && e.key === 'Enter') || !e) {
      if (preName === editInputRef.current[id]?.value)
        return openPopup({ title: '오류', content: '변경사항이 없습니다.' });

      const newTitle = editInputRef.current[id]?.value;

      editSectionAPI({
        apiBody: { finding_idx, sub_category_idx: subCategory, section_id: id, title: newTitle },
      });
    }
  };

  // 주류별 하위 섹션 삭제
  const { mutate: removeSectionAPI } = useMutationInstance<
    { message: string },
    { finding_idx: number; sub_category_idx: number; section_id: string }
  >({
    apiMethod: 'delete',
    apiEndPoint: USE_MUTATE_POINT.FINDING_SECTION_LIST_DELETE,
    onSuccessFn: (_, variables) => {
      const { section_id } = variables.apiQueryParams ?? {};

      openPopup({ title: '안내', content: '삭제 성공' });
      queryClient.removeQueries({
        queryKey: [QUERY_KEY.PRODUCT_LIST, section_id, String(PRODUCT_LIST_TYPE.IS_SUB_LIST)],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: [QUERY_KEY.PRODUCT_LIST, section_id],
        exact: true,
      });
      sectionListRefetch();
    },
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
  });

  if (introIsError || sectionListError) return <Box color="text.secondary">Fetching Error</Box>;

  return (
    <Box
      sx={{ position: 'relative', width: '100%', padding: { xs: '40px 20px', sm: '40px 50px' } }}
    >
      {onProductList.on && (
        <ListPopup
          sectionTitle={onProductList.title}
          sectionId={onProductList.id}
          conSx={{ height: '70vh' }}
          onClickEvent={() => setOnProductList((cur) => ({ ...cur, on: false, title: '', id: '' }))}
          title="추천 메뉴 추가"
          titleSx={{ color: COLORS.text.secondary, fontWeight: '600', fontSize: '15px' }}
        />
      )}

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

        <Box
          component="form"
          onSubmit={addSectionHandler}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            padding: '20px 0',
          }}
        >
          <InputText
            title="섹션 추가"
            labelSx={{ fontSize: '16px' }}
            textSx={{
              color: 'text.secondary',
              fontSize: '16px',
            }}
            conSx={{ padding: '0' }}
            ref={sectionTitle}
          />
          <ButtonNomal type="submit" sx={{ padding: '10px 0' }}>
            <FaPlus size={25} />
          </ButtonNomal>
        </Box>

        <Box sx={{ padding: { xs: '20px 0', md: '20px 40px' } }}>
          {sectionListData?.length === 0 ? (
            <Empty title="등록된 섹션이 없습니다." />
          ) : (
            sectionListData?.map((el: SectionListType) => (
              <CollapseBarMap
                labelColor="primary"
                inputLabelSx={{ fontWeight: '600' }}
                inputTextSx={{ color: !onEdit[el._id] ? 'text.primary' : 'text.secondary' }}
                key={el._id}
                onClickEditMode={() => onEditHandler(el._id)}
                onEdit={onEdit[el._id]}
                onClickEditConfirm={() => submitEditHandler(null, el._id, el.title)}
                onKeyDownEditConfirm={(e) => submitEditHandler(e, el._id, el.title)}
                onClickCollapse={() => !onEdit[el._id] && oneDepthHandler(el._id)}
                openCollapseValue={openValues[el._id]}
                onClickRemove={() =>
                  openPopup({
                    title: '안내',
                    content: (
                      <span style={{ whiteSpace: 'pre-line' }}>
                        {`[${el.title}]\n*추천 메뉴도 모두 삭제 됩니다.\n정말 삭제하시겠습니까?`}
                      </span>
                    ),
                    onConfirm: () => {
                      removeSectionAPI({
                        apiQueryParams: {
                          finding_idx,
                          sub_category_idx: subCategory,
                          section_id: el._id,
                        },
                      });
                    },
                  })
                }
                title={el.title}
                editModeTitle="섹션명 수정"
                editInputRef={(dom) => {
                  editInputRef.current[el._id] = dom;
                }}
                sxBar={{ bgcolor: COLORS.background.paper }}
                sxTitle={{
                  color: !openValues[el._id] ? COLORS.text.primary : COLORS.text.secondary,
                }}
                onClickPluse={() =>
                  setOnProductList((cur) => ({ ...cur, on: true, title: el.title, id: el._id }))
                }
              >
                <SubProductList sectionId={el._id} sectionTitle={el.title} />
              </CollapseBarMap>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(FindLayout);
