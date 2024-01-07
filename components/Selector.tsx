import { COLORS } from '@/asset/style';
import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';

interface SelectorProps {
  optionArr: { label: string; value: string | number; price?: number }[];
  value?: string | number;
  onChangeEvent?: (e: SelectChangeEvent<string | number>) => void | undefined;
  width?: string;
  height?: string;
  fontWeight?: FontWeightCrimson;
  xsFontSize?: string;
  padding?: string;
  mdFontSize?: string;
  titleLabel?: string;
  subText?: string;
  subSx?: SxProps;
  boxPadding?: string;
  textAlign?: string;
  bgcolor?: string;
  titleColor?: string;
}

const Selector = ({
  optionArr = [
    { label: '샘플1', value: '1' },
    { label: '샘플2', value: '2' },
  ],
  width = '100%',
  height = '40px',
  fontWeight = '600',
  xsFontSize = '12px',
  mdFontSize = '15px',
  onChangeEvent,
  value = '1',
  subText,
  subSx,
  boxPadding,
  textAlign = 'left',
  bgcolor = COLORS.primary,
  titleColor = 'text.secondary',
}: SelectorProps) => {
  return (
    <FormControl sx={{ width, padding: boxPadding }}>
      <Select
        sx={{
          height,
          color: titleColor,
          padding: '0px',
          fontSize: { xs: xsFontSize, md: mdFontSize },
          bgcolor,
          fontWeight,
          textAlign,
        }}
        value={value}
        onChange={onChangeEvent}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {optionArr?.map((el) => (
          <MenuItem
            sx={{
              color: 'text.primary',
              fontSize: { xs: xsFontSize, md: mdFontSize },
              fontWeight,
            }}
            key={el.value}
            value={el.value}
          >
            {el.label}
          </MenuItem>
        ))}
      </Select>
      {subText && <FormHelperText sx={{ ...subSx }}>{subText}</FormHelperText>}
    </FormControl>
  );
};

export default React.memo(Selector);
