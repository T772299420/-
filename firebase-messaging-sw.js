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

// رسائل الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('رسالة FCM في الخلفية:', payload);
  
  const notificationTitle = payload.notification?.title || 'رسالة جديدة';
  const notificationOptions = {
    body: payload.notification?.body || 'لديك رسالة جديدة',
    icon: 'icon-192x192.png',
    badge: 'icon-192x192.png',
    tag: 'chat-notification',
    renotify: true,
    requireInteraction: false,
    actions: [
      {
        action: 'reply',
        title: 'رد'
      },
      {
        action: 'close',
        title: 'إغلاق'
      }
    ]
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// فتح التبويب عند النقر
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'reply') {
    // فتح التطبيق للرد
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        for (const client of clientList) {
          if ('focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('./');
      })
    );
  } else if (event.action === 'close') {
    // إغلاق الإشعار فقط
    return;
  } else {
    // النقر العادي على الإشعار
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        for (const client of clientList) {
          if ('focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('./');
      })
    );
  }
});
