import { COLORS } from '@/asset/style';
import { styled } from '@mui/material';
import React from 'react';

const LineContainer = styled('div')<{ height: string; margin: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${COLORS.divider};
  margin: ${({ margin }) => margin};
`;

const Line = ({ height = '1px', margin = '0 0 0 0' }: { height?: string; margin?: string }) => {
  return <LineContainer height={height} margin={margin} />;
};

export default React.memo(Line);
