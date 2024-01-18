import moment from 'moment-timezone';

export const nowDayAndTimeOnlyNumber = ({
  format = 'YYYYMMDDHHmmss',
}: {
  format?: 'YYYYMMDDHHmmss' | 'YYYYMMDDHHmm' | 'YYYYMMDDHH' | 'YYYYMMDD' | 'YYYYMM' | 'YYYY';
}) => {
  const koreanTime = moment().tz('Asia/Seoul');

  return koreanTime.format(format);
};

// day형식: '01152244' 등
export const changeFlatFormat = ({
  day,
  inputFormat = 'YYYYMMDD',
  format = 'YYYY-MM-DD',
}: {
  day: string;
  inputFormat?: 'YYYYMMDDHHmmss' | 'YYYYMMDDHHmm' | 'YYYYMMDDHH' | 'YYYYMMDD' | 'YYYYMM' | 'YYYY';
  format?:
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY-MM-DD HH:mm'
    | 'YYYY-MM-DD HH'
    | 'YYYY-MM-DD'
    | 'YYYY-MM'
    | 'YYYY';
}): string => {
  return moment(day, inputFormat).format(format);
};

// 매개변수 형태: '00:00', day는 'YYYY-MM-DD'
export const pointChangeToUTC = ({
  startTime,
  endTime,
  day,
}: {
  startTime: string;
  endTime: string;
  day: string;
}): { start: string; end: string } => {
  const start = moment.tz(`${day} ${startTime}`, 'Asia/Seoul').utc().format();
  const end = moment.tz(`${day} ${endTime}`, 'Asia/Seoul').utc().format();

  return { start, end };
};

export const convertUtcToKst = ({
  utcTime,
  format = 'YYYY-MM-DD HH:mm',
}: {
  utcTime: string | Date | undefined;
  format:
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY-MM-DD HH:mm'
    | 'YYYY-MM-DD HH'
    | 'YYYY-MM-DD'
    | 'YYYY-MM'
    | 'YYYY'
    | 'YYYYMMDDHHmmss'
    | 'YYYYMMDDHHmm'
    | 'YYYYMMDDHH'
    | 'YYYYMMDD'
    | 'YYYYMM';
}): string => {
  return moment.utc(utcTime).tz('Asia/Seoul').format(format);
};
