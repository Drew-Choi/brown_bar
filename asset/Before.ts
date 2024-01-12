import { COLORS } from '@/asset/style';
import { styled } from '@mui/material';

// 가상요소선택자 스타일
export const Before = styled('div')(({ height }: { height: string }) => ({
  position: 'relative',
  display: 'block',
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '50%',
    transform: 'translateY(50%)',
    width: '0.5px',
    height: height,
    backgroundColor: COLORS.text.disabled,
  },
}));
