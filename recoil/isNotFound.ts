import { atom } from 'recoil';

export const isNotFound = atom<boolean>({
  key: 'isNotFound',
  default: false,
});
