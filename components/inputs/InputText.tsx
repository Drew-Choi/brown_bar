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
    multiline?: boolean;
    type?:
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'number'
      | 'radio'
      | 'range'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time';
    onChangeEvent?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
    value?: string | number;
  }
>(
  (
    {
      conSx,
      textSx,
      title = 'ID',
      labelSx,
      multiline = false,
      type = 'text',
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
          multiline={multiline}
          value={value}
          onChange={onChangeEvent}
          inputRef={ref}
          sx={{ ...textSx }}
          type={type}
        />
      </FormControl>
    );
  },
);

InputText.displayName = 'InputText';
export default React.memo(InputText);
