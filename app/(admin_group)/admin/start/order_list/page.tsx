'use client';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import moment, { Moment } from 'moment-timezone';
import { COLORS } from '@/asset/style';

const OrderList = () => {
  const [startTime, setStartTime] = useState<Moment | null>(
    moment().tz('Asia/Seoul').subtract(1, 'days'),
  );

  const [endTime, setEndTime] = useState<Moment | null>(moment().tz('Asia/Seoul'));
  // console.log(startTime?.format('YYYYMMDDHHmm') < endTime?.format('YYYYMMDDHHmm'));

  return (
    <Box sx={{ color: 'text.secondary' }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDateTimePicker
          sx={{ bgcolor: COLORS.background.paper }}
          value={startTime}
          onChange={(value) => setStartTime(value)}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDateTimePicker
          sx={{ bgcolor: COLORS.background.paper }}
          value={endTime}
          onChange={(value) => setEndTime(value)}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default OrderList;
