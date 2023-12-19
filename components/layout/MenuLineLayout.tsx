import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '@/asset/style';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import Selector from '../Selector';
import OnTheRock from '../svg/OnTheRock';
import ContentBox from './ContentBox';

interface MenuLineProps {
  data: {
    name: string;
    desc: string;
    price: number;
    optionArr?: { label: string; value: string | number | boolean }[];
  };
  changeOrderList?: boolean;
}

const MenuLineLayout = ({ data, changeOrderList = false }: MenuLineProps) => {
  const [optionValue, setOptionValue] = useState<string>('');

  return (
    <ContentBox>
      <div style={{ marginBottom: '5px' }}>
        <Typography
          marginBottom={changeOrderList ? '8px' : '0'}
          color="text.secondary"
          gutterBottom={true}
          fontWeight={400}
          sx={{ fontSize: { xs: '4vw', md: '36px' } }}
        >
          {data?.name}
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
            (data?.optionArr && data?.optionArr?.length !== 0) || changeOrderList
              ? 'space-between'
              : 'right',
          alignItems: 'center',
        }}
      >
        {data?.optionArr && !changeOrderList && data?.optionArr?.length !== 0 && (
          <Selector
            optionArr={data?.optionArr}
            onChangeEvent={(e) => setOptionValue(e.target.value)}
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
          {(data?.price + Number(optionValue)).toLocaleString('ko-KR')} ₩
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
