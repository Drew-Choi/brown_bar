const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fovvimage.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
      },
    ],
  },
  output: 'standalone',
};

module.exports = withPWA(nextConfig);
