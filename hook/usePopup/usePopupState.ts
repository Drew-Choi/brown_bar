import { atom } from 'recoil';

export const usePopupState = atom<UsePopupProps>({
  key: 'usePopupState',
  default: {
    show: false,
    title: '',
    content: '',
    onConfirm: null as (() => void) | null,
  },
});
