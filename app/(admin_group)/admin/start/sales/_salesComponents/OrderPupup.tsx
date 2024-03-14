import { SHADOW } from '@/asset/style';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import { NotificationPayload } from 'firebase/messaging';
import { usePopup } from '@/hook/usePopup/usePopup';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import Image from 'next/image';

type OrderPupupProps = {
  orderMessage: NotificationPayload;
  onCloseEvent?: () => void;
};

export const OrderPupup = ({ orderMessage, onCloseEvent }: OrderPupupProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: { xs: '100%', sm: '80%', md: '85%', lg: '1000px' },
        height: '80%',
        zIndex: '998',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -70%)',
          width: '300px',
          height: '210px',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          boxShadow: SHADOW.boxShadowMainColor,
          zIndex: '998',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Image src={orderMessage?.image || ''} width={50} height={50} alt="주문이미지" />
        </Box>
        <Typography textAlign="center" padding="0px 30px 10px 30px" fontSize={20} fontWeight={700}>
          {orderMessage?.title}
        </Typography>
        <Typography
          textAlign="center"
          padding="0 30px"
          height="60px"
          overflow="scroll"
          fontSize={18}
          fontWeight={600}
          marginBottom="5px"
          sx={{ wordBreak: 'break-all' }}
        >
          {orderMessage?.body}
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <ButtonNomal
            onClickEvent={onCloseEvent}
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
    </Box>
  );
};
