import React, { LegacyRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { COLORS } from '@/asset/style';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import Selector from '../Selector';
import OnTheRock from '../svg/OnTheRock';
import ContentBox from './ContentBox';
import { SelectChangeEvent } from '@mui/material';

interface MenuLineProps {
  data: {
    pd_name: string;
    desc: string;
    price: number;
    option_arr?: { label: string; value: string | number; price?: number; _id: string }[];
  };
  changeOrderList?: boolean;
  divRef?: LegacyRef<HTMLDivElement> | undefined;
}

const MenuLineLayout = ({ data, changeOrderList = false, divRef }: MenuLineProps) => {
  const [optionValue, setOptionValue] = useState<string | number>(0);

  const indiMenuOptionSelectorHandler = (e: SelectChangeEvent<string | number>) => {
    const value = e.target.value;
    setOptionValue(value);
  };

  return (
    <ContentBox>
      <div style={{ marginBottom: '5px' }} ref={divRef}>
        <Typography
          marginBottom={changeOrderList ? '8px' : '0'}
          color="text.secondary"
          gutterBottom={true}
          fontWeight={400}
          sx={{ fontSize: { xs: '4vw', md: '36px' } }}
        >
          {data?.pd_name}
        </Typography>
        {!changeOrderList && (
          <Typography
            color="text.secondary"
            fontWeight={400}
            sx={{ fontSize: { xs: '3.2vw', md: '30px' } }}
          >
            - {data?.desc}
          </Typography>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent:
            (data?.option_arr && data?.option_arr?.length !== 0) || changeOrderList
              ? 'space-between'
              : 'right',
          alignItems: 'center',
        }}
      >
        {data?.option_arr && !changeOrderList && data?.option_arr?.length !== 0 && (
          <Selector
            value={optionValue}
            optionArr={data?.option_arr}
            onChangeEvent={indiMenuOptionSelectorHandler}
            height="30px"
            xsFontSize="14px"
            bgcolor={COLORS.divider}
          />
        )}

        {data && changeOrderList && (
          <Box
            width="fit-content"
            position="relative"
            color="text.secondary"
            display="flex"
            alignItems="flex-start"
            gap="7px"
            marginLeft="10px"
          >
            <FaPlus size="7%" />

            <Box position="absolute" width="7vw" height="7vw" borderRadius="50%" left="11%">
              <Typography
                position="absolute"
                left="50%"
                color="text.primary"
                fontWeight="700"
                fontSize="5vw"
                sx={{ transform: 'translateX(-50%)' }}
              >
                {'10'}
              </Typography>
            </Box>
            <OnTheRock size="15%" />

            <FaMinus size="7%" />
          </Box>
        )}

        <Typography
          color="text.secondary"
          minWidth="30vw"
          textAlign="right"
          sx={{ fontSize: { xs: '5vw', md: '36px' } }}
        >
          {(
            data?.price +
            (data.option_arr?.length !== 0
              ? Number(data.option_arr?.find((el) => el.value === optionValue)?.price)
              : 0)
          ).toLocaleString('ko-KR')}{' '}
          ₩
        </Typography>
      </div>
      {!changeOrderList ? (
        <FaPlus
          color={COLORS.text.secondary}
          style={{ position: 'absolute', fontSize: '20px', top: '10px', right: '10px' }}
        />
      ) : (
        <FaMinus
          color={COLORS.text.secondary}
          style={{ position: 'absolute', fontSize: '20px', top: '10px', right: '10px' }}
        />
      )}
    </ContentBox>
  );
};

export default React.memo(MenuLineLayout);
