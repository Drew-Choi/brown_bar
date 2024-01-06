import { atom } from 'recoil';

export const usePopupState = atom({
  key: 'usePopupState',
  default: {
    show: false,
    title: '',
    content: '',
    onConfirm: null as (() => void) | null,
  },
});
