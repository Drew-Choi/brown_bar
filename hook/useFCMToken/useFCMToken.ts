// 이 부분은 클라이언트 사이드 코드로, 사용자의 브라우저에서 실행됩니다.

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useFCMToken = () => {
  const { data } = useSession();
};
