// 팝업창 커스텀 훅

import { useRecoilState } from 'recoil';
import { usePopupState } from './usePopupState';

export const usePopup = () => {
  const [popup, setPopup] = useRecoilState(usePopupState);

  const openPopup = ({ title = '', content = '' }: { title: string; content: string }) => {
    setPopup({
      show: true,
      title,
      content,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      title: '',
      content: '',
    });
  };

  return { popup, openPopup, closePopup };
};
