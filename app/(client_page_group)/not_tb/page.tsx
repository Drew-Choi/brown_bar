import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const NotFound = () => {
  return (
    <Box sx={{ color: 'white', padding: '50px', fontSize: '15px' }}>
      <Typography>ERROR</Typography>
      <Typography>QR로 접속해주세요.</Typography>
    </Box>
  );
};

export default NotFound;
