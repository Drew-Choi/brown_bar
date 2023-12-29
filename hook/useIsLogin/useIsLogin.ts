import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useIsLogin = () => {
  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') return router.push('/admin/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return { status, data };
};
