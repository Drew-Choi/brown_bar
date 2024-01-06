'use client';
import { styled, keyframes, SxProps } from '@mui/material';
import React from 'react';

const action = keyframes`
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const Container = styled('div')`
  animation: ${action} 1s ease-out infinite;
`;

const Cork = ({ sx, pointerColor = '#CBA879' }: { sx?: SxProps; pointerColor?: string }) => {
  return (
    <Container sx={{ ...sx }}>
      <svg
        width="23"
        height="44"
        viewBox="0 0 23 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.360796 2.30879C0.171246 1.09583 1.10913 0 2.33681 0H20.4111C21.608 0 22.5366 1.04583 22.3973 2.23453C21.2953 11.6375 20.5828 17.7165 19.4678 27.2301C19.3497 28.2377 18.4956 29 17.481 29H6.24357C5.25823 29 4.41969 28.2823 4.26756 27.3088L0.360796 2.30879Z"
          fill="#CBA879"
        />
        <rect x="3.3988" y="3.22226" width="1.13296" height="3.22222" rx="0.56648" fill="#9E7743" />
        <rect
          x="16.9944"
          y="2.14812"
          width="1.13296"
          height="3.22222"
          rx="0.56648"
          fill="#9E7743"
        />
        <rect
          x="6.79785"
          y="22.5556"
          width="1.13296"
          height="3.22222"
          rx="0.56648"
          fill="#9E7743"
        />
        <rect x="9.0636" y="5.37038" width="1.13296" height="3.22222" rx="0.56648" fill="#9E7743" />
        <rect
          x="18.1274"
          y="7.51849"
          width="1.13296"
          height="3.22222"
          rx="0.56648"
          fill="#9E7743"
        />
        <rect
          x="15.8615"
          y="18.2592"
          width="1.13296"
          height="3.22222"
          rx="0.56648"
          fill="#9E7743"
        />
        <rect
          x="4.53186"
          y="12.8889"
          width="1.13296"
          height="3.22222"
          rx="0.56648"
          fill="#9E7743"
        />
        <path
          d="M11.2929 43.7071C11.6834 44.0976 12.3166 44.0976 12.7071 43.7071L19.0711 37.3431C19.4616 36.9526 19.4616 36.3195 19.0711 35.9289C18.6805 35.5384 18.0474 35.5384 17.6569 35.9289L12 41.5858L6.34315 35.9289C5.95262 35.5384 5.31946 35.5384 4.92893 35.9289C4.53841 36.3195 4.53841 36.9526 4.92893 37.3431L11.2929 43.7071ZM11 42V43H13V42H11Z"
          fill={pointerColor}
          opacity="0.5"
        />
      </svg>
    </Container>
  );
};

export default React.memo(Cork);
