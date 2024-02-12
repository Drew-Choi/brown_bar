import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import ContentBox from '@/components/layout/ContentBox';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { SelectChangeEvent, SxProps } from '@mui/material';
import ImageLayout from '@/components/layout/ImageLayout';
import Selector from '@/components/Selector';

interface DetailPopupProps {
  conSx?: SxProps;
  titleSx?: SxProps;
  onClickClose?: () => void;
  data: {
    on: boolean;
    _id: string;
    pd_name: string;
    price: number;
    desc: string;
    img_url: string;
    option_arr: ProductOptionType[];
  };
  onClickAddCart?: (
    data: {
      _id: string;
      pd_name: string;
      price: number;
      option_arr: ProductOptionType[];
    },
    value: string | number,
  ) => void;
}

const DetailPopup = ({ conSx, titleSx, onClickClose, data, onClickAddCart }: DetailPopupProps) => {
  // 옵션 항목
  const [optionValue, setOptionValue] = useState<string | number>(0);
  const indiMenuOptionSelectorHandler = (e: SelectChangeEvent<string | number>) => {
    const value = e.target.value;
    setOptionValue(value);
  };

  if (!data) return <Box sx={{ padding: '20px' }}>Fetching Error</Box>;

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
        transform: 'translateX(-50%)',
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
        <Typography sx={{ ...titleSx }}>상품상세정보</Typography>
        <ImCancelCircle
          color={COLORS.text.secondary}
          size={20}
          style={{ cursor: 'pointer' }}
          onClick={onClickClose}
        />
      </Box>

      <Box sx={{ padding: '0 20px' }}>
        <Typography
          color="text.secondary"
          marginBottom="5px"
          textAlign="center"
          sx={{ fontSize: '20px' }}
        >
          {data.pd_name}
        </Typography>
        <Box width="50%" margin="auto">
          <ImageLayout
            priority
            src={data?.img_url ? data.img_url : '/'}
            alt="제품사진"
            marginBottom="10px"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: data.option_arr?.length !== 0 ? 'space-between' : 'center',
            marginBottom: '10px',
          }}
        >
          <Typography color="text.secondary" fontSize="16px">
            {(
              data?.price +
              (data.option_arr?.length !== 0
                ? Number(data.option_arr?.find((el) => el.value === optionValue)?.price)
                : 0)
            ).toLocaleString('ko-KR')}{' '}
            ₩
          </Typography>
          {data.option_arr?.length !== 0 && (
            <Selector
              width="60%"
              value={optionValue}
              optionArr={data?.option_arr}
              onChangeEvent={indiMenuOptionSelectorHandler}
              height="30px"
              xsFontSize="13px"
              bgcolor={COLORS.divider}
            />
          )}
        </Box>
        <ContentBox sx={{ height: '170px', overflow: 'scroll', marginBottom: '10px' }}>
          <Typography
            padding={1}
            sx={{ fontSize: '15px', wordBreak: 'break-all' }}
            color="text.secondary"
          >
            {data.desc}
          </Typography>
        </ContentBox>
      </Box>

      <Box sx={{ marginTop: '5px', marginBottom: '5px', padding: '0 15px', textAlign: 'right' }}>
        <ButtonNomal
          sx={{ padding: '5px 10px', fontSize: '12px', fontWeight: '600' }}
          onClickEvent={() => {
            onClickAddCart &&
              onClickAddCart(
                {
                  _id: data._id,
                  pd_name: data.pd_name,
                  price: data.price,
                  option_arr: data.option_arr,
                },
                optionValue,
              );
            setOptionValue(0);
          }}
        >
          카트담기
        </ButtonNomal>
      </Box>
    </Box>
  );
};

export default React.memo(DetailPopup);
