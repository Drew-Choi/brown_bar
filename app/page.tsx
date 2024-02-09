'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Light from '@/components/svg/Light';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionContainer from '@/components/layout/SectionContainer';
import { usePopup } from '@/hook/usePopup/usePopup';

const Screen = () => {
  const [intro, setIntro] = useState<boolean>(true);
  const router = useRouter();
  const tb = useSearchParams().get('tb');
  const { openPopup } = usePopup();

  useEffect(() => {
    if (!tb) {
      sessionStorage.removeItem('tb');
      router.push('/not_tb');
      return;
    }

    const nowTime = new Date().getTime();
    //5시간
    const expireInterval = 5 * 60 * 60 * 1000;
    const expire = new Date(nowTime + expireInterval).toUTCString();
    const tbDate = {
      tb,
      expire,
    };

    sessionStorage.setItem('tb', JSON.stringify(tbDate));

    const time = setTimeout(() => {
      setIntro(false);
    }, 500);

    const timeTwo = setTimeout(() => {
      router.push('/main');
    }, 1500);

    return () => {
      clearTimeout(time);
      clearTimeout(timeTwo);
    };
  }, []);

  return (
    <SectionContainer
      sx={{
        zIndex: '999',
        bgcolor: 'background.default',
        height: '100vh',
        top: '0',
        transition: '2s opacity ease',
        opacity: intro ? '1' : '0',
      }}
    >
      <Image
        style={{
          position: 'absolute',
          display: 'block',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        src="/img/lightHead.png"
        width={50}
        height={50}
        alt="조명"
      />
      <Light
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-49%)',
          zIndex: '990',
          top: '25px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '350px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textShadow: '0 0 1px #FFFFFF, 0 0 6px #ffffff',
        }}
      >
        <Typography
          textAlign="center"
          fontSize={40}
          fontWeight={700}
          color="text.secondary"
          zIndex="10"
        >
          The Brown Bar
        </Typography>
        <Typography
          textAlign="center"
          fontSize={24}
          fontWeight={400}
          fontStyle="italic"
          color="text.secondary"
          zIndex="10"
        >
          - Guide -
        </Typography>
      </Box>
    </SectionContainer>
  );
};

export default Screen;
