'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import NextAppDirEmotionCacheProvider from './EmotionCache';

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default ThemeRegistry;
