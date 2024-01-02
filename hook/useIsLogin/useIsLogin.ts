import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useIsLogin = () => {
  const { data, status } = useSession();

  useEffect(() => {
    if ((data as SessionAdd)?.error === 'RefreshAccessTokenError') {
      signIn('kakao', {
        redirect: true,
        callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/admin`,
      });
    }
  }, [data]);

  return { data, status };
};
