import React from 'react';
import { Typography } from '@mui/material';

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
    <div
      style={{
        position: 'relative',
        backgroundColor: 'rgba(169, 84, 24, 0.09)',
        borderRadius: '10px',
        border: '1px solid #773D14',
        padding: '5px 10px',
      }}
    >
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
    </div>
  );
};

export default React.memo(FianlLineLayout);
