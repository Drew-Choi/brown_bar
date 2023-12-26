'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, SxProps } from '@mui/material';
import React, { MouseEvent, useState } from 'react';

const InputPassword = ({
  conSx,
  textSx,
  title = 'Password',
  labelSx,
  iconSx,
}: {
  conSx?: SxProps;
  textSx?: SxProps;
  iconSx?: SxProps;
  labelSx?: SxProps;
  title?: string;
}) => {
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
        sx={{ ...textSx }}
        id="standard-adornment-password"
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
};

export default React.memo(InputPassword);
