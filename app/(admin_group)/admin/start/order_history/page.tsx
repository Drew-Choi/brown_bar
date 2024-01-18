'use client';
import Box from '@mui/material/Box';
import React, { useCallback, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import moment, { Moment } from 'moment-timezone';
import { COLORS } from '@/asset/style';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import Typography from '@mui/material/Typography';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import { FaSearch } from 'react-icons/fa';
import ContentBox from '@/components/layout/ContentBox';
import Grid from '@mui/material/Unstable_Grid2';
import { After } from '@/asset/After';
import { Before } from '@/asset/Before';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BiReset } from 'react-icons/bi';
import { convertUtcToKst } from '@/utils/mometDayAndTime';
import { usePopup } from '@/hook/usePopup/usePopup';

const isInOneMonth = (startDate: string, endDate: string) => {
  const oneMonthLater = moment(startDate).add(1, 'months');
  return moment(endDate).isSameOrBefore(oneMonthLater);
};

const OrderHistory = () => {
  const { openPopup } = usePopup();
  const [startTime, setStartTime] = useState<Moment | null>(
    moment().tz('Asia/Seoul').subtract(1, 'days'),
  );

  const [endTime, setEndTime] = useState<Moment | null>(moment().tz('Asia/Seoul'));
  // console.log(startTime?.format('YYYYMMDDHHmm') < endTime?.format('YYYYMMDDHHmm'));

  const [searchDate, setSearchDate] = useState<{ start: Moment | null; end: Moment | null }>({
    start: moment().tz('Asia/Seoul').subtract(1, 'days'),
    end: moment().tz('Asia/Seoul'),
  });

  const dateSearchHandler = useCallback(() => {
    if (startTime && endTime) {
      const newStartTime = startTime.format('YYYYMMDDHHmm');
      const newEndTime = endTime.format('YYYYMMDDHHmm');
      if (newStartTime >= newEndTime)
        return openPopup({ title: '오류', content: '현재 보다 과거 날짜를 선택해주세요.' });

      // if (isInOneMonth(newStartTime, newEndTime))
      //   return openPopup({ title: '오류', content: '범위는 1달을 초과할 수 없습니다.' });

      setSearchDate((cur) => ({ ...cur, start: startTime, end: endTime }));
    }
  }, [startTime, endTime]);

  const {
    data: { data: historyList },
    isError,
  } = useQueryInstance({
    queryKey: [
      QUERY_KEY.ORDER_HISTORY,
      String(searchDate?.start?.toISOString()),
      String(searchDate?.end?.toISOString()),
    ],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.ORDER_HISTORY,
    apiQueryParams: {
      start_time: searchDate?.start?.toISOString(),
      end_time: searchDate?.end?.toISOString(),
    },
  });

  if (isError) return <Box color="text.secondary">Fetching Error</Box>;

  return (
    <Box sx={{ color: 'text.secondary', padding: { xs: '50px 10px', sm: '50px 30px' } }}>
      <Box
        sx={{
          bgcolor: COLORS.background.paper,
          padding: '30px 10px',
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
            width: { xs: '95%', sm: '90%' },
            minHeight: '700px',
            margin: 'auto',
            bgcolor: 'none',
          }}
        >
          {historyList?.map((el: OrderCardProps) => (
            <OrderHistoryCard orderInfo={el} key={el.order_idx} />
          ))}
        </ContentBox>
      </Box>
    </Box>
  );
};

export default OrderHistory;

const generateTotalPrice = (menuList: MenuType[]): number => {
  return menuList.reduce((acc, menu) => (acc += menu.price * menu.ea), 0);
};

const OrderHistoryCard = React.memo(({ orderInfo }: { orderInfo: OrderCardProps }) => {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '90%',
        padding: '20px',
        bgcolor: COLORS.info,
        margin: '20px auto',
        borderRadius: '10px',
        height: 'fit-content',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: '15px', color: 'text.primary' }}>
            주문번호: {orderInfo.order_idx}
          </Typography>{' '}
          <Typography sx={{ fontSize: '15px', color: 'text.primary' }}>
            날짜: {convertUtcToKst({ utcTime: orderInfo?.created_at, format: 'YYYY-MM-DD HH:mm' })}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '15px', color: 'text.primary' }}>
          {orderInfo.tb_idx}번 테이블
        </Typography>
      </Box>

      <Typography textAlign="right" sx={{ color: COLORS.text.primary }}>
        Total: {generateTotalPrice(orderInfo.menu).toLocaleString('ko-KR')} ₩
      </Typography>

      <Grid container rowGap={1} color="text.primary">
        <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
          <After height="15px">
            <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
              메뉴
            </Typography>
          </After>
        </Grid>
        <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
          <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
            총가격
          </Typography>
        </Grid>
        <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
          <Before height="15px">
            <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
              수량
            </Typography>
          </Before>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', height: '100px', overflowY: 'scroll', color: COLORS.text.primary }}>
        {orderInfo?.menu?.map((menu, menuIndex) => (
          <Grid container key={`complete_menu_${menuIndex}`}>
            <Grid xs={4}>
              <Typography>{menu.pd_name}</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography textAlign="center" lineHeight="1">
                {(menu.price * menu.ea).toLocaleString('ko-KR')} ₩ <br />
                <span style={{ fontSize: '12px' }}>({menu.price.toLocaleString('ko-KR')})</span>
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography textAlign="center">{menu.ea.toLocaleString('ko-KR')} 개</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      {/* {menuList?.length !== 0 && (
        <Typography color={COLORS.divider} textAlign="right" sx={{ fontSize: '14px' }}>
          {orderDate}
        </Typography>
      )} */}
    </Box>
  );
});
OrderHistoryCard.displayName = 'OrderHistoryCard';
