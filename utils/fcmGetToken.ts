// 이 부분은 클라이언트 사이드 코드로, 사용자의 브라우저에서 실행됩니다.
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const {
  NEXT_PUBLIC_FCM_API_KEY,
  NEXT_PUBLIC_FCM_AUTH_DOMAIN,
  NEXT_PUBLIC_FCM_PROJECT_ID,
  NEXT_PUBLIC_FCM_BUCKET,
  NEXT_PUBLIC_FCM_SENDER_ID,
  NEXT_PUBLIC_FCM_APP_ID,
  NEXT_PUBLIC_FCM_MEASUREMENT_ID,
  NEXT_PUBLIC_FCM_VAP,
} = process.env;

const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FCM_API_KEY,
  authDomain: NEXT_PUBLIC_FCM_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FCM_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FCM_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FCM_SENDER_ID,
  appId: NEXT_PUBLIC_FCM_APP_ID,
  measurementId: NEXT_PUBLIC_FCM_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const fcmGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { vapidKey: NEXT_PUBLIC_FCM_VAP });
      if (currentToken) {
        console.log(currentToken);
        // 필요한 경우 서버로 토큰을 전송하는 로직을 여기에 추가할 수 있습니다.
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};
