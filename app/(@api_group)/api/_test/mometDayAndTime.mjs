// import moment from 'moment-timezone';

// export const nowDayAndTimeOnlyNumber = ({ format = 'YYYYMMDDHHmmss' }) => {
//   const koreanTime = moment().tz('Asia/Seoul');

//   return koreanTime.format(format);
// };

// // day형식: '01152244' 등
// export const changeFlatFormat = ({ day, inputFormat = 'YYYYMMDD', format = 'YYYY-MM-DD' }) => {
//   return moment(day, inputFormat).format(format);
// };

// // 매개변수 형태: '00:00', day는 'YYYY-MM-DD'
// export const pointChangeToUTC = ({ startTime, endTime, day }) => {
//   const start = moment.tz(`${day} ${startTime}`, 'Asia/Seoul').utc().format();
//   const end = moment.tz(`${day} ${endTime}`, 'Asia/Seoul').utc().format();

//   return { start, end };
// };

// export const convertUtcToKst = ({ utcTime, format = 'YYYY-MM-DD HH:mm' }) => {
//   return moment.utc(utcTime).tz('Asia/Seoul').format(format);
// };
