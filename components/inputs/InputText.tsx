'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, SxProps } from '@mui/material';
import React, { MouseEvent, useState } from 'react';

const InputText = ({
  conSx,
  textSx,
  title = 'ID',
  labelSx,
}: {
  conSx?: SxProps;
  textSx?: SxProps;
  labelSx?: SxProps;
  title?: string;
}) => {
  return (
    <FormControl sx={{ width: '100%', ...conSx }} variant="standard">
      <InputLabel htmlFor="standard" sx={{ ...labelSx }}>
        {title} {'-'}
      </InputLabel>
      <Input sx={{ ...textSx }} id="standard" type="text" />
    </FormControl>
  );
};

export default React.memo(InputText);
