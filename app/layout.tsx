import React from 'react';
import type { Metadata } from 'next';
import { Crimson_Text } from 'next/font/google';

import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Header from '@/app/Header';

import Footer from './Footer';
import { Container } from '@mui/material';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ThemeProviderCustom from '@/asset/muiTheme/ThemeProviderCustom';
import Nav from './Nav';

const crimson_Text = Crimson_Text({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Brown Bar',
  description: '더 브라운바 가이드',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={crimson_Text.className}>
        <ReactQueryProvider>
          <ThemeProviderCustom>
            {/* 레이아웃 */}
            <Container
              maxWidth="md"
              disableGutters={true}
              sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* 고정헤더 */}
              <Header flex="1" />
              <Container disableGutters={true} component="main" sx={{ flex: '5' }}>
                {children}
              </Container>
              <Nav flex="1" />
              <Footer flex="0.5" />
            </Container>
          </ThemeProviderCustom>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
