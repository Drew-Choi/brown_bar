import React from 'react';
import { SvgIcon, IconButton } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const ButtonBack = ({ skeleton = false }: { skeleton?: boolean }) => {
  const router = useRouter();

  return (
    <IconButton
      color="info"
      onClick={() => router.back()}
      disabled={skeleton}
      sx={{ opacity: skeleton ? '0' : '1' }}
    >
      <SvgIcon component={FaArrowLeft} inheritViewBox sx={{ fontSize: '100%' }} />
    </IconButton>
  );
};

export default React.memo(ButtonBack);
