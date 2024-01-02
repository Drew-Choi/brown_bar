import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useIsLogin = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathName !== '/admin/login')
      return router.replace('/admin/login');
  }, [status, pathName]);

  useEffect(() => {
    if ((data as SessionAdd)?.error === 'RefreshAccessTokenError') {
      router.replace('/admin/login');
    }
  }, [data]);

  return { data, status };
};
