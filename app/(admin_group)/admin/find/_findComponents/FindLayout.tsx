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

const data = {
  intro_text: '처음은 어저구 저쩌구처음은',
  sub_cagtegory: {
    MaltWhiskey: [
      {
        title: '처음 접하기 좋은 3종',
        products: [
          {
            _id: '',
            pd_name: 'BB&R',
            price: 13000,
            desc: '좋음',
            img_url: '',
          },
        ],
      },
    ],
    AmericanWhiskey: [],
    Wine: [],
    Brandy: [],
    Rum: [],
    Tequila: [],
  },
};

const FindLayout = ({ children }: FindLayoutProps) => {
  const { openPopup } = usePopup();
  const introTextRef = useRef<HTMLInputElement>(null);
  const [introEdit, setIntroEdit] = useState<boolean>(false);
  // sub카테고리 선택
  const [subCategory, setSubCategory] = useState<string>('MaltWhiskey');

  // 문구 수정 핸들러
  // api 추가 예정
  const introEditConfirmHandler = () => {
    const textValue = introTextRef.current?.value.replace(/\n/g, ' ');

    if (!textValue) return openPopup({ title: '오류', content: '인트로 문구를 작성해주세요.' });

    if (textValue !== data.intro_text && textValue?.length > 50)
      return openPopup({ title: '오류', content: '띄어쓰기 포함 50자 이내로 작성해주세요.' });

    if (textValue === data.intro_text) return setIntroEdit(false);

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
            {data.intro_text}
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
            defaultValue={data.intro_text}
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
          onChangeEvent={(e) => setSubCategory(e.target.value as string)}
          optionArr={FINDING_SUB_CATEGORIES}
        />
        <Box></Box>
      </Box>
    </Box>
  );
};

export default React.memo(FindLayout);
