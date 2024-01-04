import moment from 'moment-timezone';

export const dayAndTimeOnlyNumber = () => {
  const koreanTime = moment().tz('Asia/Seoul');

  return koreanTime.format('YYYYMMDDHHmmss');
};
