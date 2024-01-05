import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

interface ImageLayoutProps {
  src: string;
  marginBottom?: string;
  borderRadius?: string;
  priority?: boolean;
  imgWidth?: number;
  imgHeight?: number;
  innerWidth?: string;
  innerLeft?: string;
  innerTranslate?: string;
  alt: string;
}

const ImageLayout = ({
  src,
  marginBottom,
  borderRadius = '10px',
  priority = false,
  imgWidth = 500,
  imgHeight = 500,
  alt,
  innerWidth = '100%',
  innerLeft = '0',
  innerTranslate = 'translate(0, -50%)',
}: ImageLayoutProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '0',
        paddingTop: '100%',
        overflow: 'hidden',
        borderRadius,
        border: `0.5px solid ${COLORS.info}`,
        marginBottom,
      }}
    >
      <Image
        src={src}
        priority={priority}
        width={imgWidth}
        height={imgHeight}
        alt={alt}
        style={{
          position: 'absolute',
          display: 'block',
          width: innerWidth,
          height: 'auto',
          top: '50%',
          left: innerLeft,
          transform: innerTranslate,
        }}
      />
    </Box>
  );
};

export default React.memo(ImageLayout);
