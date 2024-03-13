import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
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

export const useFCMToken = () => {
  const { data, status } = useSession();

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

  const getTokenFunc = async () => {
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
      console.error('deviceToken error', err);
    }
  };

  useEffect(() => {
    if (status !== 'loading' && status === 'authenticated') {
      getTokenFunc();
    }
  }, [status]);

  return { data, status };
};
