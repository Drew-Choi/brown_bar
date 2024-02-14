import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FCM_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FCM_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FCM_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FCM_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FCM_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FCM_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FCM_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

let messaging: Messaging;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  // Firebase 메시징 인스턴스를 클라이언트 사이드에서만 생성
  messaging = getMessaging(app);
}

export const useIsLogin = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const { mutate: fcmDevieTokenAPI } = useMutationInstance<
    undefined,
    undefined,
    { id: string; device_token: string }
  >({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.FCM_SAVE,
    onErrorFn: () => {
      signOut({ redirect: true, callbackUrl: `/admin/login/?error=fcm` });
    },
  });

  const getTokenFunc = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FCM_VAP,
        });
        if (currentToken) {
          fcmDevieTokenAPI({
            apiBody: {
              id: (data as SessionAdd)?.user_id as string,
              device_token: currentToken,
            },
          });
        }
      }
    } catch (err) {
      console.error('An error occurred while retrieving token. ', err);
    }
  }, [data]);

  const { mutate: idCheckAPI } = useMutationInstance<
    undefined,
    undefined,
    { id: string; nick_name: string; profile_img: string }
  >({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.LOGIN,
    onErrorFn: (error: any) => {
      const statusCode = error.response.status;
      signOut({ redirect: true, callbackUrl: `/admin/login/?error=${statusCode}` });
    },
    onSuccessFn: () => {
      getTokenFunc();
    },
  });

  //--
  useEffect(() => {
    if (status !== 'loading') {
      if ((data as SessionAdd)?.error === 'RefreshAccessTokenError') {
        router.replace('/admin/login');
      }

      if ((data as SessionAdd)?.user_id) {
        idCheckAPI({
          apiBody: {
            id: String((data as SessionAdd)?.user_id),
            nick_name: String(data?.user?.name),
            profile_img: String(data?.user?.image),
          },
        });
      }
    }
  }, [data, status]);

  return { data, status };
};
