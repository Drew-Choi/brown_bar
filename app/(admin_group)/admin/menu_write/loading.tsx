'use client';
import React from 'react';
import ContentBox from '@/components/layout/ContentBox';
import Box from '@mui/material/Box';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { FaPlus } from 'react-icons/fa6';
import InputText from '@/components/inputs/InputText';
import Skeleton from '@mui/material/Skeleton';

const LoadingMenuWrite = () => {
  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 20px', sm: '40px 50px' } }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          textAlign: 'right',
          gap: '20px',
          padding: { xs: '20px 0px', sm: '20px' },
        }}
      >
        <InputText
          title="카테고리추가"
          textSx={{ flex: '9', fontSize: '18px', color: 'text.secondary' }}
        />
        <ButtonNomal type="submit" sx={{ flex: '1', padding: '10px 20px' }}>
          <FaPlus />
        </ButtonNomal>
      </Box>
      <ContentBox sx={{ padding: '30px' }}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <Box key={index} sx={{ marginBottom: '10px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '10px',
                }}
              >
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={25}
                  height={25}
                  sx={{ bgcolor: 'grey.900' }}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={25}
                  height={25}
                  sx={{ bgcolor: 'grey.900' }}
                />
              </Box>
              <Skeleton
                variant="rounded"
                animation="wave"
                width="100%"
                height={41}
                sx={{ bgcolor: 'grey.900' }}
              />
            </Box>
          ))}
      </ContentBox>
    </Box>
  );
};
export default LoadingMenuWrite;
