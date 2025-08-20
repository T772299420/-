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

messaging.onBackgroundMessage((payload) => {
  console.log('رسالة في الخلفية:', payload);
  
  const notificationTitle = payload.notification?.title || 'رسالة جديدة';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: 'chat-message',
    requireInteraction: true,
    actions: [
      {
        action: 'reply',
        title: 'رد',
        icon: '/reply-icon.png'
      },
      {
        action: 'view',
        title: 'عرض',
        icon: '/view-icon.png'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// معالجة النقر على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'reply') {
    // فتح نافذة الرد
    event.waitUntil(
      clients.openWindow('/?action=reply&from=' + event.notification.data?.from)
    );
  } else {
    // فتح التطبيق
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
