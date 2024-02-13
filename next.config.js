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
    ],
  },
};

module.exports = withPWA(nextConfig);
