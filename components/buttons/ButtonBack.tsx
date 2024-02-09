'use client';
import React from 'react';
import { SvgIcon, IconButton, SxProps } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const ButtonBack = ({ skeleton = false, sx }: { skeleton?: boolean; sx?: SxProps }) => {
  const router = useRouter();

  return (
    <IconButton
      color="info"
      onClick={() => router.back()}
      disabled={skeleton}
      sx={{ opacity: skeleton ? '0' : '1', ...sx }}
    >
      <SvgIcon component={FaArrowLeft} inheritViewBox sx={{ fontSize: '100%' }} />
    </IconButton>
  );
};

export default React.memo(ButtonBack);
