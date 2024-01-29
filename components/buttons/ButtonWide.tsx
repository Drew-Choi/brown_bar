import Button from '@mui/material/Button';
import React, { ReactNode } from 'react';

interface ButtonWideProps {
  children: ReactNode;
  padding?: string;
  width?: string;
  flexDirection?: string;
  fontSize?: FontSizeSx;
  fontWeight?: FontWeightCrimson;
  borderRadius?: string;
  justifyContent?: string;
  display?: string;
  onClickEvent?: () => void;
  margin?: string;
}

const ButtonWide = ({
  children,
  padding = '7% 2%',
  borderRadius = '20px',
  width = '100%',
  flexDirection = 'column',
  fontSize = '11vw',
  fontWeight = '700',
  justifyContent = 'center',
  display = 'flex',
  margin = '0',
  onClickEvent,
}: ButtonWideProps) => {
  return (
    <Button
      onClick={onClickEvent}
      color="warning"
      variant="contained"
      sx={{
        display: display,
        fontWeight: fontWeight,
        fontSize: fontSize,
        textTransform: 'none',
        flexDirection: flexDirection,
        width: width,
        padding: padding,
        boxSizing: 'border-box',
        borderRadius: borderRadius,
        justifyContent: justifyContent,
        margin: margin,
      }}
    >
      {children}
    </Button>
  );
};

export default React.memo(ButtonWide);
