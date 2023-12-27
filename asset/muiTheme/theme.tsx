import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#773D14', // 대표색상
    },
    secondary: {
      main: '#A95418', // 보조색상
    },
    info: {
      main: '#CBA879',
    },
    error: {
      main: '#a30000',
    },
    warning: {
      main: '#BFBFBF',
    },
    success: {
      main: '#556cd6',
    },
    text: {
      primary: '#070707',
      secondary: '#f1f1f1',
      disabled: '#999999',
    },
    background: {
      default: '#0c0c0c', // 페이지 배경색
      paper: '#BFBFBF', // 카드, 메뉴 등의 배경색
    },
    divider: '#2C2C2C',
  },
  typography: {
    fontSize: 15,
    fontFamily: 'inherit',
  },
});

export default theme;
