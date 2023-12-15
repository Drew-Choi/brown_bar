import React from 'react';
import { Typography } from '@mui/material';
import { COLORS } from '@/asset/style';
import { FaPlus } from 'react-icons/fa6';
import Selector from '../Selector';

interface MenuLineProps {
  data: {
    name: string;
    desc: string;
    price: number;
    optionArr?: { label: string; value: string | number | boolean }[];
  };
}

const MenuLineLayout = ({ data }: MenuLineProps) => {
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
        <Typography color="text.secondary" gutterBottom={true} fontWeight={400} fontSize="15px">
          {data?.name}
        </Typography>
        <Typography color="text.secondary" fontWeight={400} fontSize="12px">
          - {data?.desc}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent:
            data?.optionArr && data?.optionArr?.length !== 0 ? 'space-between' : 'right',
          alignItems: 'center',
        }}
      >
        {data?.optionArr && data?.optionArr?.length !== 0 && (
          <Selector optionArr={data?.optionArr} />
        )}

        <Typography color="text.secondary" minWidth="30vw" textAlign="right">
          {data?.price.toLocaleString('ko-KR')} ₩
        </Typography>
      </div>
      <FaPlus
        color={COLORS.text.secondary}
        style={{ position: 'absolute', fontSize: '20px', top: '10px', right: '10px' }}
      />
    </div>
  );
};

export default React.memo(MenuLineLayout);
