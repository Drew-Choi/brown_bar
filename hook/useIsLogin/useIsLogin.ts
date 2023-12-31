import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useIsLogin = () => {
  const { status, data } = useSession();

  const router = useRouter();

  const { mutate: refreshApi } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.RE,
    onErrorFn: () => {
      localStorage.removeItem('rt');
      router.push('/admin/login');
    },
    onSuccessFn(response) {
      //auth.js 토큰재발행
      signIn('credentials', {
        refresh: true,
        id: response.id,
      });
    },
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      refreshApi({ apiBody: {} });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return { status, data };
};
