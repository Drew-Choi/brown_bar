'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import React, { ChangeEvent, MouseEvent, forwardRef, useState } from 'react';

const InputPassword = forwardRef<
  HTMLInputElement,
  {
    conSx?: SxProps;
    textSx?: SxProps;
    iconSx?: SxProps;
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
      title = 'Password',
      labelSx,
      iconSx,

      onChangeEvent,
      value,
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    };

    return (
      <FormControl sx={{ width: '100%', ...conSx }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password" sx={{ ...labelSx }}>
          {title} {'-'}
        </InputLabel>
        <Input
          inputRef={ref}
          onChange={onChangeEvent}
          value={value}
          sx={{ ...textSx }}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((cur) => !cur)}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ ...iconSx }} />
                ) : (
                  <Visibility sx={{ ...iconSx }} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  },
);

InputPassword.displayName = 'InputPassword';
export default React.memo(InputPassword);
