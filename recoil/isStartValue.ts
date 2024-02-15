import { atom } from 'recoil';

export const isStartValue = atom<boolean>({
  key: 'isStartValue',
  default: false,
});
