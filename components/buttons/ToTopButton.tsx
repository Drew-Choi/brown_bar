import Box from '@mui/material/Box';
import React from 'react';
import Cork from '../svg/Cork';
import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/material';

interface ToTopButtonProps {
  boxSx?: SxProps;
  onClickEvent?: () => void;
}

const ToTopButton = ({ onClickEvent, boxSx }: ToTopButtonProps) => {
  return (
    <Box
      onClick={onClickEvent}
      sx={{
        position: 'fixed',
        bottom: '10px',
        right: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: 'rotate(180deg)',
        cursor: 'pointer',
        bgcolor: '#84848442',
        borderRadius: '10px',
        padding: '3px',
        ...boxSx,
      }}
    >
      <Cork
        pointerColor={COLORS.primary}
        sx={{
          position: 'relative',
          display: 'block',
        }}
      />
      <Typography sx={{ transform: 'rotate(180deg)', color: 'text.secondary' }}>to Top</Typography>
    </Box>
  );
};
export default ToTopButton;
