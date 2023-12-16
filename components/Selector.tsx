import { COLORS } from '@/asset/style';
import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

interface SelectorProps {
  optionArr: { label: string; value: string | number | boolean }[];
  width?: string;
  onChangeEvent?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  fontSize?: string;
  padding?: string;
  fontWeight?: FontWeightCrimson;
  height?: string;
  mdFontSize?: string;
}

const Selector = ({
  optionArr = [
    { label: '샘플1', value: 1200 },
    { label: '샘플2', value: 1200 },
  ],
  width = '40%',
  fontSize = '12px',
  padding = '2px',
  fontWeight = '400',
  height = 'auto',
  mdFontSize = '15px',
  onChangeEvent,
}: SelectorProps) => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <select
      style={{
        width: width,
        height: height,
        fontSize: !isMd ? fontSize : mdFontSize,
        fontWeight: fontWeight,
        padding: padding,
        backgroundColor: COLORS.primary,
        border: 'none',
        color: COLORS.text.secondary,
      }}
      onChange={onChangeEvent}
    >
      {optionArr?.map((el, index) => (
        <option value={String(el.value)} key={index}>
          {el.label}
        </option>
      ))}
    </select>
  );
};

export default React.memo(Selector);
