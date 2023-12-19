import { SxProps, styled } from '@mui/material';
import React, { ReactNode } from 'react';

const ContentBoxLayout = styled('div')`
  position: relative;
  background-color: rgba(169, 84, 24, 0.09);
  border-radius: 10px;
  border: 1px solid #773d14;
  padding: 5px 10px;
`;

export const ContentBox = ({ children, sx }: { children?: ReactNode; sx?: SxProps }) => {
  return <ContentBoxLayout sx={{ ...sx }}>{children}</ContentBoxLayout>;
};

export default React.memo(ContentBox);
