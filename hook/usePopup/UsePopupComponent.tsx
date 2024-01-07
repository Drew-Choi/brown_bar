'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { SHADOW } from '../../asset/style';
import { usePopup } from './usePopup';
import ButtonNomal from '../../components/buttons/ButtonNomal';
import Container from '@mui/material/Container';
import { usePathname } from 'next/navigation';

const UsePopupComponent = () => {
  const pathName = usePathname();
  const { popup, closePopup } = usePopup();

  const { show, title, content, onConfirm } = popup;

  if (!show) return;

  return (
    <Container
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: '998',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '220px',
          bgcolor: 'background.paper',
          top: '40%',
          left: !pathName.includes('/admin') ? '50%' : { xs: '50%', sm: '57.5%' },
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          boxShadow: SHADOW.boxShadowMainColor,
          zIndex: '999',
        }}
      >
        <Typography textAlign="center" padding="30px" fontSize={20} fontWeight={700}>
          {title || '미입력'}
        </Typography>
        <Typography
          textAlign="center"
          padding="0 30px"
          height="80px"
          overflow="scroll"
          fontSize={18}
          fontWeight={600}
          marginBottom="5px"
          sx={{ wordBreak: 'break-all' }}
        >
          {content || '내용 미입력'}
        </Typography>
        {!onConfirm ? (
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
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <ButtonNomal
              onClickEvent={() => closePopup()}
              color="info"
              sx={{
                fontSize: '14px',
                padding: '2px 5px',
              }}
            >
              취소
            </ButtonNomal>
            <ButtonNomal
              onClickEvent={onConfirm}
              color="secondary"
              sx={{
                fontSize: '14px',
                padding: '2px 5px',
              }}
            >
              확인
            </ButtonNomal>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UsePopupComponent;
