import React, { CSSProperties } from 'react';

const Light = ({ size = '330px', style }: { size?: string; style?: CSSProperties }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        viewBox="0 0 321 404"
        fill="none"
        style={{ ...style }}
      >
        <g style={{ mixBlendMode: 'lighten' }} filter="url(#filter0_bif_2_16)">
          <path
            d="M317 329.5C317 388.5 171.5 400 152.5 400C133.5 400 4.5 395 4.5 329.5C4.5 264 126.5 35.5 157 4.5C187 37.5 317 270.5 317 329.5Z"
            fill="url(#paint0_linear_2_16)"
          />
        </g>
        <defs>
          <filter
            id="filter0_bif_2_16"
            x="0.5"
            y="0.5"
            width="320.5"
            height="403.5"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2_16" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_2_16"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2_16" />
            <feGaussianBlur stdDeviation="2" result="effect3_foregroundBlur_2_16" />
          </filter>
          <linearGradient
            id="paint0_linear_2_16"
            x1="152.5"
            y1="-50"
            x2="166.102"
            y2="399.513"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF862E" stopOpacity="0.47" />
            <stop offset="0.873808" stopColor="#FFBF90" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default React.memo(Light);
