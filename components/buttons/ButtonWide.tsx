import { Button } from '@mui/material';
import React, { ReactNode } from 'react';

interface ButtonWideProps {
  children: ReactNode;
  padding?: string;
  width?: string;
  flexDirection?: string;
  fontSize?: FontSizeSx;
  fontWeight?: FontWeightCrimson;
  borderRadius?: string;
  onClickEvent?: () => void;
}

const ButtonWide = ({
  children,
  padding = '7% 2%',
  borderRadius = '20px',
  width = '100%',
  flexDirection = 'column',
  fontSize = '11vw',
  fontWeight = '700',
  onClickEvent,
}: ButtonWideProps) => {
  return (
    <Button
      onClick={onClickEvent}
      color="warning"
      variant="contained"
      sx={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        textTransform: 'none',
        flexDirection: flexDirection,
        width: width,
        padding: padding,
        boxSizing: 'border-box',
        borderRadius: borderRadius,
      }}
    >
      {children}
    </Button>
  );
};

export default React.memo(ButtonWide);
