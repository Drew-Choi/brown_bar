import React from 'react';
import { Typography } from '@mui/material';
import ContentBox from './ContentBox';

interface MenuLineProps {
  data: {
    name: string;
    desc?: string | undefined;
    price: number;
    optionArr?: { label: string; value: string | number | boolean } | undefined;
  };
}

const FianlLineLayout = ({ data }: MenuLineProps) => {
  return (
    <ContentBox sx={{ border: 'none', backgroundColor: 'divider' }}>
      <div style={{ marginBottom: '5px' }}>
        <Typography
          color="text.secondary"
          gutterBottom={true}
          fontWeight={400}
          sx={{ fontSize: { xs: '4vw', md: '36px' } }}
        >
          {data?.name}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',

          gap: '20px',
        }}
      >
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ fontSize: { xs: '3.5vw', md: '30px' } }}
        >
          {data?.optionArr?.label}
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ fontSize: { xs: '4vw', md: '30px' } }}
        >
          {'10ea'}
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ fontSize: { xs: '5vw', md: '36px' } }}
        >
          {data?.price.toLocaleString('ko-KR')} ₩
        </Typography>
      </div>
    </ContentBox>
  );
};

export default React.memo(FianlLineLayout);
