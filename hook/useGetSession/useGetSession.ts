import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type TbType = {
  tb: string;
  expire: string;
};

export const useGetSession = <T = null>({
  key = 'tb',
  dependency,
}: {
  key?: string;
  dependency?: T | undefined;
}) => {
  const [value, setValue] = useState<TbType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const sessionData = sessionStorage.getItem(key);
    console.log('session', sessionData);

    if (sessionData) {
      const tb: TbType = JSON.parse(sessionData);

      const now = new Date().toUTCString();

      if (now < tb.expire) return setValue(tb);

      setValue(null);
      sessionStorage.removeItem(key);
      return router.push('/not-found');
    }
  }, [dependency ? dependency : null]);

  return { ...value };
};
