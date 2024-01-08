import Typography from '@mui/material/Typography';
import React from 'react';

const Empty = ({ title = '데이터가 없습니다.' }: { title?: string }) => {
  return (
    <Typography width="100%" textAlign="center" color="text.secondary">
      {title}
    </Typography>
  );
};

export default Empty;
