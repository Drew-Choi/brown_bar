'use client';
import { FormControl, Input, InputLabel, SxProps } from '@mui/material';
import React, { ChangeEvent, forwardRef } from 'react';

const InputText = forwardRef<
  HTMLInputElement,
  {
    conSx?: SxProps;
    textSx?: SxProps;
    labelSx?: SxProps;
    title?: string;

    onChangeEvent?: ((e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined;
    value?: string | number;
  }
>(
  (
    {
      conSx,
      textSx,
      title = 'ID',
      labelSx,

      onChangeEvent,
      value,
    },
    ref,
  ) => {
    return (
      <FormControl sx={{ width: '100%', ...conSx }} variant="standard">
        <InputLabel htmlFor="standard" sx={{ ...labelSx }}>
          {title} {'-'}
        </InputLabel>
        <Input
          value={value}
          onChange={onChangeEvent}
          inputRef={ref}
          sx={{ ...textSx }}
          type="text"
        />
      </FormControl>
    );
  },
);

InputText.displayName = 'InputText';
export default React.memo(InputText);
