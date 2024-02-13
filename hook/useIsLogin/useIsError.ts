import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export const useIsError = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const { mutate: idCheckAPI } = useMutationInstance<undefined, undefined, { id: string }>({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.LOGIN,
    onErrorFn: (error: any) => {
      const statusCode = error.response.status;
      signOut({ redirect: true, callbackUrl: `/admin/login/?error=${statusCode}` });
    },
  });

  useEffect(() => {
    if ((data as SessionAdd)?.error === 'RefreshAccessTokenError') {
      router.replace('/admin/login');
    }

    if ((data as SessionAdd)?.user_id) {
      idCheckAPI({ apiBody: { id: (data as SessionAdd)?.user_id as string } });
    }
  }, [data]);

  return { data, status };
};
