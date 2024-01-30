'use client';
import Box from '@mui/material/Box';
import { useIsMutating } from '@tanstack/react-query';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { usePathname } from 'next/navigation';

const Spinner = ({
  width = '100vw',
  height = '100vh',
  position = 'fixed',
  top = '50%',
  left = '50%',
}: {
  width?: string;
  height?: string;
  position?: 'fixed' | 'absolute' | 'sticky';
  top?: string;
  left?: string;
}) => {
  const pathName = usePathname();

  // useMutate시 스피너 훅
  const isMutating = useIsMutating();

  if (isMutating)
    return (
      <Box
        sx={{
          position: position,
          zIndex: '999',
          width: width,
          height: height,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: left,
            top: top,
            transform: pathName?.includes('/admin')
              ? { xs: 'translate(-50%, -50%)', sm: 'translate(80%, -50%)' }
              : 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress color="info" size={70} />
        </Box>
      </Box>
    );
};

export default Spinner;
