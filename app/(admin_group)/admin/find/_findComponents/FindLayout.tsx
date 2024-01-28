import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { ReactNode, useRef, useState } from 'react';
import ContentBox from '@/components/layout/ContentBox';
import { FaRegEdit } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { COLORS } from '@/asset/style';
import InputText from '@/components/inputs/InputText';
import { usePopup } from '@/hook/usePopup/usePopup';
import Selector from '@/components/Selector';
import { FINDING_SUB_CATEGORIES } from '@/constant/FINDING_MY_TASTE_LIST';

interface FindLayoutProps {
  children: ReactNode;
}

const introData = {
  finding_idx: 10,
  intro_text: '처음은 어저구 저쩌구처음은',
};

const subCategoryData = {
  finding_idx: 10,
  sub_category_idx: 100,
  sub_category_list: [
    {
      title: '처음 접하기 좋은 3종',
      products: [
        {
          _id: '',
          pd_name: 'BB&R',
          price: 13000,
          desc: '좋음1',
          img_url: '',
        },
        {
          _id: '',
          pd_name: 'BB&R셰리',
          price: 13000,
          desc: '좋음2',
          img_url: '',
        },
        {
          _id: '',
          pd_name: 'BB&R피트',
          price: 13000,
          desc: '좋음3',
          img_url: '',
        },
      ],
    },
    {
      title: '완전추천',
      products: [
        {
          _id: '',
          pd_name: '맥켈란12년',
          price: 13000,
          desc: '좋음6',
          img_url: '',
        },
        {
          _id: '',
          pd_name: '맥켈란15년',
          price: 13000,
          desc: '좋음7',
          img_url: '',
        },
      ],
    },
  ],
};

// sub_cagtegory: {
//   MaltWhiskey: [
//     {
//       title: '처음 접하기 좋은 3종',
//       products: [
//         {
//           _id: '',
//           pd_name: 'BB&R',
//           price: 13000,
//           desc: '좋음1',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: 'BB&R셰리',
//           price: 13000,
//           desc: '좋음2',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: 'BB&R피트',
//           price: 13000,
//           desc: '좋음3',
//           img_url: '',
//         },
//       ],
//     },
//     {
//       title: '완전추천',
//       products: [
//         {
//           _id: '',
//           pd_name: '맥켈란12년',
//           price: 13000,
//           desc: '좋음6',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: '맥켈란15년',
//           price: 13000,
//           desc: '좋음7',
//           img_url: '',
//         },
//       ],
//     },
//   ],
//   AmericanWhiskey: [
//     {
//       title: '안돼',
//       products: [
//         {
//           _id: '',
//           pd_name: '브랜디',
//           price: 13000,
//           desc: '좋음6',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: '하하',
//           price: 13000,
//           desc: '좋음7',
//           img_url: '',
//         },
//       ],
//     },
//   ],
//   Wine: [
//     {
//       title: '이야',
//       products: [
//         {
//           _id: '',
//           pd_name: 'BB&R',
//           price: 13000,
//           desc: '좋음1',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: 'BB&R셰리',
//           price: 13000,
//           desc: '좋음2',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: 'BB&R피트',
//           price: 13000,
//           desc: '좋음3',
//           img_url: '',
//         },
//       ],
//     },
//     {
//       title: '오예',
//       products: [
//         {
//           _id: '',
//           pd_name: '맥켈란12년',
//           price: 13000,
//           desc: '좋음6',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: '맥켈란15년',
//           price: 13000,
//           desc: '좋음7',
//           img_url: '',
//         },
//       ],
//     },
//     {
//       title: '샵',
//       products: [
//         {
//           _id: '',
//           pd_name: '맥켈란12년',
//           price: 13000,
//           desc: '좋음6',
//           img_url: '',
//         },
//         {
//           _id: '',
//           pd_name: '맥켈란15년',
//           price: 13000,
//           desc: '좋음7',
//           img_url: '',
//         },
//       ],
//     },
//   ],
//   Brandy: [],
//   Rum: [],
//   Tequila: [],
// },

const FindLayout = ({ children }: FindLayoutProps) => {
  const { openPopup } = usePopup();
  const introTextRef = useRef<HTMLInputElement>(null);
  const [introEdit, setIntroEdit] = useState<boolean>(false);
  // sub카테고리 선택
  const [subCategory, setSubCategory] = useState<number>(100);

  // 문구 수정 핸들러
  // api 추가 예정
  const introEditConfirmHandler = () => {
    const textValue = introTextRef.current?.value.replace(/\n/g, ' ');

    if (!textValue) return openPopup({ title: '오류', content: '인트로 문구를 작성해주세요.' });

    if (textValue !== introData.intro_text && textValue?.length > 50)
      return openPopup({ title: '오류', content: '띄어쓰기 포함 50자 이내로 작성해주세요.' });

    if (textValue === introData.intro_text) return setIntroEdit(false);

    // apiset

    setIntroEdit(false);
  };

  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 20px', sm: '40px 50px' } }}>
      <Typography color="text.secondary" fontSize="14px" fontWeight={600}>
        *{children} 인트로 문구 -
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
            {introData.intro_text}
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
            defaultValue={introData.intro_text}
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
