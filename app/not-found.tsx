import ButtonBack from '@/components/buttons/ButtonBack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

const NotFound = () => {
  return (
    <Box style={{ color: 'white', padding: '50px' }}>
      <ButtonBack sx={{ padding: '0', marginBottom: '10px' }} />
      <Typography color="text.secondary">Not-Found</Typography>
    </Box>
  );
};

export default NotFound;
