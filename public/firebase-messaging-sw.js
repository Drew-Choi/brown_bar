importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const PROXY = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://brownbar.vercel.app';

// Firebase 프로젝트 설정으로 초기화
firebase.initializeApp({
  apiKey: "AIzaSyBYA85JiSd-kwn_4Wd9EZ9ybdUMqGsfW2c",
  authDomain: "the-brown-e1c79.firebaseapp.com",
  projectId: "the-brown-e1c79",
  storageBucket: "the-brown-e1c79.appspot.com",
  messagingSenderId: "758151178307",
  appId: "1:758151178307:web:f4c3266b5227ac8b2f8cf6",
  measurementId: "G-74LE4WF146"
});


const messaging = firebase.messaging();

// 푸시 메시지 수신 시 처리
self.addEventListener('push', function(event) {
  const payload = event.data.json(); 
  const title = payload.notification.title; 
  const options = {
    body: payload.notification.body,
    icon: payload.notification.image,
    image: payload.notification.image,
  };
  
  // 알림 표시
  event.waitUntil(self.registration.showNotification(title, options));
});

// 사용자가 알림을 클릭했을 때의 처리
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // 알림 창 닫기
  // 페이지 이동
  event.waitUntil(
    clients.openWindow(`${PROXY}/admin/start/sales`)
  );
});