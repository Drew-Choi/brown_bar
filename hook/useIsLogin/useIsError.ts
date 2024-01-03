import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useIsError = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if ((data as SessionAdd)?.error === 'RefreshAccessTokenError') {
      router.replace('/admin/login');
    }
  }, [data]);

  return { data, status };
};