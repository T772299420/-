// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAm0hh9I6i58ywW1D2gZg09liG-wG-tBsU",
  authDomain: "chat-fat-4f082.firebaseapp.com",
  projectId: "chat-fat-4f082",
  storageBucket: "chat-fat-4f082.appspot.com",
  messagingSenderId: "297367474930",
  appId: "1:297367474930:web:a05b983e05a0ba257fb66b"
});

const messaging = firebase.messaging();

// معالج الرسائل في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('رسالة FCM في الخلفية:', payload);
  
  const notificationTitle = payload.notification?.title || 'رسالة جديدة';
  const notificationOptions = {
    body: payload.notification?.body || 'لديك رسالة جديدة في ChatPro',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'chat-message',
    requireInteraction: true,
    data: {
      url: payload.data?.url || '/',
      fromUid: payload.data?.fromUid
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// معالجة النقر على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        let clientToFocus = null;
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            clientToFocus = client;
            break;
          }
        }

        if (clientToFocus) {
          return clientToFocus.focus();
        } else {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// تثبيت وتفعيل Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: تثبيت');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: تفعيل');
  event.waitUntil(self.clients.claim());
});
