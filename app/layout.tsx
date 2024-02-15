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
import Container from '@mui/material/Container';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

import Nav from './Nav';
import UsePopupComponent from '@/hook/usePopup/UsePopupComponent';
import RecoilProvider from '@/providers/RecoilProvider';
import ThemeRegistry from '@/asset/muiTheme/ThemeRegistry';
import Spinner from '@/components/spinner/Spinner';
import Head from 'next/head';

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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* 모바일 웹 사용시 타이틀  */}
        <meta name="application-name" content="The Brown Bar" />
        {/* 모바일환경에서 제목  */}
        <meta name="apple-mobile-web-app-title" content="The Brown Bar" />
        {/* 중복URL 방지 위한 대표 URL 설정  */}
        <link rel="canonical" href="https://brownbar.vercel.app" />
        {/* 전화번호 링크생성 막기  */}
        <meta name="format-detection" content="telephone=no" />
        {/* Explore환경에서 최신 엔진을 쓸 수 있도록  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* https->http로 넘어가는 경우 헤더에 중요 정보가 넘어가지 않게 막기  */}
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/* 모바일환경에서 전체화면 허용  */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* 애플 모바일환경에서 전체화면 허용  */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* 모바일 ms환경에서 백그라운드색  */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        {/* 모바일 ms환경에서 탭하이라이트 제어  */}
        <meta name="msapplication-tap-highlight" content="no" />

        {/* og ------  */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Brown Bar" />
        <meta property="og:description" content="더 브라운바 가이드" />
        <meta property="og:image" content="/pwa_icon/icon-512x512.png" />
        <meta property="og:image:alt" content="대표이미지" />
        <meta property="og:url" content="https://brownbar.vercel.app" />
        {/* twitterCard --------  */}

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="The Brown Ba" />
        <meta property="twitter:description" content="더 브라운바 가이드" />
        <meta property="twitter:image" content="/pwa_icon/icon-512x512.png" />
        <meta name="twitter:image:alt" content="대표이미지" />
        <meta property="twitter:url" content="https://brownbar.vercel.app" />

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <html lang="en">
        <body className={crimson_Text.className} style={{ position: 'relative' }}>
          <ThemeRegistry>
            <ReactQueryProvider>
              <RecoilProvider>
                {/* 레이아웃 */}
                <Spinner position="fixed" top="50%" />
                <Container
                  maxWidth="lg"
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
                  <UsePopupComponent />
                </Container>
              </RecoilProvider>
            </ReactQueryProvider>
          </ThemeRegistry>
        </body>
      </html>
    </>
  );
}
