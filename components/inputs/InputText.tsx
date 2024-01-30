'use client';
import { SxProps } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, forwardRef } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

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
    labelColor?: 'info' | 'error' | 'primary' | 'secondary' | 'success' | 'warning';
    inputColor?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
    onChangeEvent?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
    value?: string | number;
    placeholderText?: string;
    defaultValue?: string;
    onKeyUp?: ((event: KeyboardEvent<HTMLInputElement>) => void) | undefined;
    labelFocused?: boolean;
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
      placeholderText,
      defaultValue,
      onKeyUp,
      labelFocused = true,
      labelColor = 'info',
      inputColor,
    },
    ref,
  ) => {
    return (
      <FormControl sx={{ width: '100%', ...conSx }} variant="standard">
        <InputLabel
          focused={labelFocused}
          htmlFor="standard"
          color={labelColor}
          sx={{ ...labelSx }}
        >
          {title} {'-'}
        </InputLabel>
        <Input
          color={inputColor}
          defaultValue={defaultValue}
          placeholder={placeholderText}
          multiline={multiline}
          value={value}
          onChange={onChangeEvent}
          inputRef={ref}
          sx={{ ...textSx }}
          type={type}
          onKeyUp={onKeyUp}
        />
      </FormControl>
    );
  },
);

InputText.displayName = 'InputText';
export default React.memo(InputText);
