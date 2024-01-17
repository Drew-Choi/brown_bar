'use client';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import moment, { Moment } from 'moment-timezone';
import { COLORS } from '@/asset/style';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';

const OrderHistory = () => {
  const [startTime, setStartTime] = useState<Moment | null>(
    moment().tz('Asia/Seoul').subtract(1, 'days'),
  );

  const [endTime, setEndTime] = useState<Moment | null>(moment().tz('Asia/Seoul'));
  // console.log(startTime?.format('YYYYMMDDHHmm') < endTime?.format('YYYYMMDDHHmm'));

  const { data: historyList, isError } = useQueryInstance({
    queryKey: [
      QUERY_KEY.ORDER_HISTORY,
      String(startTime?.toISOString()),
      String(endTime?.toISOString()),
    ],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.ORDER_HISTORY,
    apiQueryParams: {
      start_time: startTime?.toISOString(),
      end_time: endTime?.toISOString(),
    },
  });

  console.log(historyList);

  if (isError) return <Box color="text.secondary">Fetching Error</Box>;

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

export default OrderHistory;
