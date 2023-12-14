'use client';
import { COLORS } from '@/asset/style';
import { Theme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const FooterContainer = styled('footer')(({ theme, flex }: { theme?: Theme; flex: string }) => ({
  flex: flex,
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: 'fit-content',
  color: COLORS.text.disabled,
  padding: '0px 10px',
  fontSize: '8px',
  [theme!.breakpoints.up('sm')]: {
    fontSize: '10px',
  },
}));

export const Footer = ({ flex = '1' }: { flex?: string }) => {
  return (
    <FooterContainer flex={flex}>
      <Typography fontSize="inherit">Copyright | The Brown Bar</Typography>
      <Typography fontSize="inherit" align="right">
        Designed by Drew.C
        <br />
        SVG Designed by Freepik
      </Typography>
    </FooterContainer>
  );
};

export default React.memo(Footer);
