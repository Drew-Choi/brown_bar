import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { SxProps } from '@mui/material';

interface ListPopupProps {
  title?: string;
  onClickEvent?: () => void;
  titleSx?: SxProps;
  conSx?: SxProps;
}

const ListPopup = ({
  title = '',
  onClickEvent,
  titleSx,
  conSx = { top: '50px', left: '50%', transform: 'translateX(-50%)' },
}: ListPopupProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '300px',
        height: '500px',
        bgcolor: COLORS.divider,
        borderRadius: '10px',
        border: '1px solid white',
        zIndex: '999',
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
        <Typography sx={{ ...titleSx }}>{title}</Typography>
        <ImCancelCircle
          color={COLORS.text.secondary}
          size={20}
          style={{ cursor: 'pointer' }}
          onClick={onClickEvent}
        />
      </Box>
    </Box>
  );
};

export default React.memo(ListPopup);
