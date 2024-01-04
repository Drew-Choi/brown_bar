'use client';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import InputText from '@/components/inputs/InputText';
import ImageLayout from '@/components/layout/ImageLayout';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { MEGA_BYTE } from '@/constant/NUMBER';
import { IMAGE_TYPE } from '@/constant/TYPE';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { commaInput, resultCommaRemove } from '@/utils/numberComma';
import { Box, Typography } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';

const ProductWrite = () => {
  const { openPopup } = usePopup();
  const [blobURL, setBlobURL] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const pdNameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  // 인풋 제어용
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { mutate: writeProductApi } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.PRODUCT_WRITE,
    apiMultipartPost: true,
    onErrorFn: (err: any) => {
      console.error(err);
      if (err.response.status === 400)
        return openPopup({ title: '오류', content: err.response.data.message });
      openPopup({ title: '오류', content: '다시 시도해주세요.' });
    },
    onSuccessFn: () => {
      if (pdNameRef.current && priceRef.current && descRef.current && inputFileRef.current) {
        pdNameRef.current.value = '';
        priceRef.current.value = '';
        descRef.current.value = '';
        inputFileRef.current.value = '';
        setBlobURL(null);
        setImgFile(null);
        return;
      }
    },
  });

  // 이미지 관련
  const inputClickHandler = () => {
    inputFileRef.current?.click();
  };

  const inputFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!Object.values(IMAGE_TYPE).some((el) => el === file.type)) {
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
          setBlobURL(null);
          return openPopup({ title: '파일 오류', content: '사진 파일 형식이 맞지 않습니다.' });
        }
      }

      if (file.size > MEGA_BYTE.THREE) {
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
          setBlobURL(null);
          return openPopup({ title: '파일 오류', content: '사진 크기 3MB 이하로 등록해주세요.' });
        }
      }

      const blob = URL.createObjectURL(file);
      setImgFile(file);
      setBlobURL(blob);
    }
  };

  // 최종 등록
  const submitHandler = async () => {
    if (!pdNameRef.current?.value)
      return openPopup({ title: '오류', content: '상품명을 입력해주세요.' });

    if (!priceRef.current?.value)
      return openPopup({ title: '오류', content: '가격을 입력해주세요.' });

    if (!descRef.current?.value)
      return openPopup({ title: '오류', content: '상품설명을 입력해주세요.' });

    if (!imgFile) return openPopup({ title: '오류', content: '대표사진을 업로드해주세요.' });

    const formData = new FormData();
    formData.append('img_file', imgFile);
    formData.append('pd_name', pdNameRef.current?.value);
    formData.append('price', String(resultCommaRemove(priceRef.current?.value)));
    formData.append('desc', descRef.current?.value);

    writeProductApi({ apiBody: formData });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        top: '50%',
        transform: 'translateY(-50%)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '25px',
        color: 'white',
        maxWidth: '700px',
        padding: { xs: '30px 60px', sm: '0 50px' },
        margin: 'auto',
      }}
    >
      <Box sx={{ width: { xs: '70%', sm: '50%' }, cursor: 'pointer' }} onClick={inputClickHandler}>
        <ImageLayout
          src={!blobURL ? '/img/ready_file.png' : blobURL}
          innerWidth={!blobURL ? '50%' : '100%'}
          innerLeft={!blobURL ? '50%' : '0'}
          innerTranslate={!blobURL ? 'translate(-50%, -50%)' : 'translate(0, -50%)'}
          alt="등록상품이미지"
        />
        <Typography fontSize="15px" textAlign="center" marginTop={1}>
          1:1 비율 <br />
          <span style={{ fontSize: '13px', fontWeight: '600' }}>jpg, jpeg, png, gif, webp</span>
        </Typography>
      </Box>

      <InputText
        ref={inputFileRef}
        type="file"
        conSx={{ display: 'none' }}
        onChangeEvent={inputFileHandler}
      />

      <InputText
        ref={pdNameRef}
        title="상품명"
        textSx={{ fontSize: '20px', color: 'text.secondary' }}
        labelSx={{ fontSize: '18px' }}
      />

      <InputText
        ref={priceRef}
        title="가격"
        textSx={{ fontSize: '20px', color: 'text.secondary' }}
        labelSx={{ fontSize: '18px' }}
        onChangeEvent={(e) =>
          commaInput(
            e,
            (newValue: string) => {
              priceRef.current ? (priceRef.current.value = newValue) : null;
            },
            priceRef,
          )
        }
      />

      <InputText
        ref={descRef}
        multiline={true}
        title="설명"
        textSx={{ fontSize: '18px', color: 'text.secondary' }}
        labelSx={{ fontSize: '18px' }}
      />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
        <ButtonNomal
          sx={{ fontSize: '15px', fontWeight: '600', padding: '5px' }}
          onClickEvent={submitHandler}
        >
          등록
        </ButtonNomal>
      </Box>
    </Box>
  );
};

export default ProductWrite;
