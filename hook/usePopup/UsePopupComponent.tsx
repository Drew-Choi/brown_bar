'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { SHADOW } from '../../asset/style';
import { usePopup } from './usePopup';
import ButtonNomal from '../../components/buttons/ButtonNomal';

const UsePopupComponent = () => {
  const { popup, closePopup } = usePopup();

  const { show, title, content } = popup;

  if (!show) return;

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '300px',
        height: '200px',
        bgcolor: 'background.paper',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '999',
        borderRadius: '10px',
        boxShadow: SHADOW.boxShadowMainColor,
      }}
    >
      <Typography textAlign="center" padding="30px" fontSize={20} fontWeight={700}>
        {title || '미입력'}
      </Typography>
      <Typography
        textAlign="center"
        padding="0 30px"
        height="70px"
        overflow="scroll"
        fontSize={18}
        fontWeight={600}
        marginBottom="5px"
        sx={{ wordBreak: 'break-all' }}
      >
        {content || '내용 미입력'}
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <ButtonNomal
          onClickEvent={() => closePopup()}
          color="secondary"
          sx={{
            fontSize: '14px',
            padding: '2px 5px',
          }}
        >
          확인
        </ButtonNomal>
      </Box>
    </Box>
  );
};

export default UsePopupComponent;
