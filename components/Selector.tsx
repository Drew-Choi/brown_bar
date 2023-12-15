import { COLORS } from '@/asset/style';
import React from 'react';

interface SelectorProps {
  optionArr: { label: string; value: string | number | boolean }[];
  width?: string;
}

const Selector = ({
  optionArr = [
    { label: '샘플1', value: 1200 },
    { label: '샘플2', value: 1200 },
  ],
  width = '40%',
}: SelectorProps) => {
  return (
    <select
      style={{
        width: width,
        fontSize: '12px',
        padding: '2px',
        backgroundColor: COLORS.primary,
        border: 'none',
        color: COLORS.text.secondary,
      }}
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
