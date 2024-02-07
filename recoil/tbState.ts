import { atom } from 'recoil';

export const tbState = atom<number | null>({
  key: 'tbState',
  default: null,
});
