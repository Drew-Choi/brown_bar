// 팝업창 커스텀 훅

import { useRecoilState } from 'recoil';
import { usePopupState } from './usePopupState';

interface UsePopupProps {
  title: string;
  content: string;
  onConfirm?: (() => void) | null;
}

export const usePopup = () => {
  const [popup, setPopup] = useRecoilState(usePopupState);

  const openPopup = ({ title = '', content = '', onConfirm = null }: UsePopupProps) => {
    setPopup({
      show: true,
      title,
      content,
      onConfirm,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      title: '',
      content: '',
      onConfirm: null,
    });
  };

  return { popup, openPopup, closePopup };
};
