'use client';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import moment, { Moment } from 'moment-timezone';
import { COLORS } from '@/asset/style';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import Typography from '@mui/material/Typography';
import { FaSearch } from 'react-icons/fa';
import ContentBox from '@/components/layout/ContentBox';
import { nowDayAndTimeOnlyNumber } from '@/utils/mometDayAndTime';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance from '@/axios/instance';
import useScrollObserver from '@/hook/useObserver/useScrollObserver';
import _ from 'lodash';
import OrderHistoryCard from './_orderHistoryComponents/OrderHistoryCard';

const isInOneMonth = (startTime: string, endTime: string) => {
  const oneMonth = moment(startTime).add(1, 'months');

  return moment(endTime).isSameOrBefore(oneMonth);
};

const OrderHistory = () => {
  const { openPopup } = usePopup();
  const [startTime, setStartTime] = useState<Moment | null>(
    moment().tz('Asia/Seoul').subtract(1, 'days'),
  );

  const [endTime, setEndTime] = useState<Moment | null>(moment().tz('Asia/Seoul'));

  const [searchDate, setSearchDate] = useState<{ start: Moment | null; end: Moment | null }>({
    start: moment().tz('Asia/Seoul').subtract(1, 'days'),
    end: moment().tz('Asia/Seoul'),
  });

  const dateSearchHandler = useCallback(() => {
    if (startTime && endTime) {
      const newStartTime = startTime.format('YYYYMMDDHHmm');
      const newEndTime = endTime.format('YYYYMMDDHHmm');
      const nowTime = nowDayAndTimeOnlyNumber({ format: 'YYYYMMDDHHmm' });

      if (newEndTime > nowTime)
        return openPopup({ title: '오류', content: '끝 시간을 현재 또는 과거로 해주세요.' });

      if (newStartTime >= newEndTime)
        return openPopup({
          title: '오류',
          content: '시작 시간을 현재 보다 과거로 해주세요.',
        });

      if (!isInOneMonth(startTime.toISOString(), endTime.toISOString()))
        return openPopup({ title: '오류', content: '범위는 1달을 초과할 수 없습니다.' });

      setSearchDate((cur) => ({ ...cur, start: startTime, end: endTime }));
    }
  }, [startTime, endTime]);

  const fetch = async ({ pageParam }: { pageParam: number }) => {
    const response = await axiosInstance.get(USE_QUERY_POINT.ORDER_HISTORY, {
      params: {
        start_time: searchDate?.start?.toISOString(),
        end_time: searchDate?.end?.toISOString(),
        page: pageParam,
      },
    });

    return response;
  };

  const {
    data: historyList,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      QUERY_KEY.ORDER_HISTORY,
      String(searchDate?.start?.toISOString()),
      String(searchDate?.end?.toISOString()),
    ],
    queryFn: fetch,
    initialPageParam: 1,
    getNextPageParam: (LastPage, allPage) => {
      if (LastPage.data.data?.length < 10) return undefined;

      const nextPage = allPage.length + 1;
      return nextPage;
    },
    select: (data) => {
      const newMessageList = data.pages.map((el) => el.data.data).flat();
      return newMessageList;
    },
  });

  // 바텀 자동 패칭
  const { isInView, elementRef } = useScrollObserver({ isOnlyTop: false });

  useEffect(() => {
    const debounceAPI = _.debounce(() => {
      if (isInView) {
        !isFetching && hasNextPage && fetchNextPage();
      }
    }, 300);

    debounceAPI();

    return () => {
      debounceAPI.cancel();
    };
  }, [isInView, hasNextPage, isFetching, fetchNextPage]);

  if (isError) return <Box color="text.secondary">Fetching Error</Box>;

  return (
    <Box
      sx={{
        color: 'text.secondary',
        boxSizing: 'border-box',
        padding: { xs: '50px 10px', sm: '50px 30px' },
      }}
    >
      <Box
        sx={{
          bgcolor: COLORS.background.paper,
          boxSizing: 'border-box',
          padding: '30px',
          minHeight: '700px',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '2px', sm: '10px' },
            marginBottom: '20px',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDateTimePicker
              sx={{
                bgcolor: COLORS.primary,
                textAlign: 'center',
                borderRadius: '10px',
                '& .mui-9425fu-MuiOutlinedInput-notchedOutline': { borderRadius: '10px' },
                '& .mui-1y9e5mu-MuiInputBase-root-MuiOutlinedInput-root': {
                  color: 'text.secondary',
                  fontSize: { xs: '14px', sm: '18px' },
                },
                '& .mui-1m9ub4b-MuiInputBase-input-MuiOutlinedInput-input': { textAlign: 'center' },
              }}
              value={startTime}
              onChange={(value) => setStartTime(value)}
              slotProps={{ textField: { size: 'small' } }}
              format="YYYY-MM-DD HH:mm"
            />
          </LocalizationProvider>
          <Typography sx={{ fontSize: '30px', fontWeight: '700', color: COLORS.primary }}>
            -
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDateTimePicker
              sx={{
                bgcolor: COLORS.primary,
                textAlign: 'center',
                borderRadius: '10px',
                '& .mui-9425fu-MuiOutlinedInput-notchedOutline': { borderRadius: '10px' },
                '& .mui-1y9e5mu-MuiInputBase-root-MuiOutlinedInput-root': {
                  color: 'text.secondary',
                  fontSize: { xs: '14px', sm: '18px' },
                },
                '& .mui-1m9ub4b-MuiInputBase-input-MuiOutlinedInput-input': { textAlign: 'center' },
              }}
              value={endTime}
              onChange={(value) => setEndTime(value)}
              slotProps={{ textField: { size: 'small' } }}
              format="YYYY-MM-DD HH:mm"
            />
          </LocalizationProvider>
          <Box
            sx={{
              width: '40px',
              height: '35px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FaSearch
              size={20}
              color={COLORS.text.primary}
              style={{ cursor: 'pointer' }}
              onClick={dateSearchHandler}
            />
          </Box>
        </Box>
        <ContentBox
          sx={{
            minHeight: '700px',
            margin: 'auto',
            bgcolor: 'none',
          }}
        >
          {historyList?.length !== 0 ? (
            historyList?.map((el: OrderCardProps) => (
              <OrderHistoryCard orderInfo={el} key={el.order_idx} />
            ))
          ) : (
            <Typography color="primary" textAlign="center">
              내역이 없습니다.
            </Typography>
          )}
          {status !== 'pending' && (
            <div ref={elementRef} style={{ width: '0', height: '0', visibility: 'hidden' }} />
          )}
        </ContentBox>
      </Box>
    </Box>
  );
};

export default OrderHistory;
