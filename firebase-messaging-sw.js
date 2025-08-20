// app.js

// 1️⃣ تهيئة Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAm0hh9I6i58ywW1D2gZg09liG-wG-tBsU",
  authDomain: "chat-fat-4f082.firebaseapp.com",
  projectId: "chat-fat-4f082",
  storageBucket: "chat-fat-4f082.appspot.com",
  messagingSenderId: "297367474930",
  appId: "1:297367474930:web:a05b983e05a0ba257fb66b"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 2️⃣ تسجيل Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker مسجل:', registration);
    })
    .catch((err) => {
      console.error('❌ فشل تسجيل Service Worker:', err);
    });
}

// 3️⃣ طلب إذن الإشعارات والحصول على FCM Token
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('👍 تم السماح بالإشعارات');
    getToken(messaging, { vapidKey: 'wf0M42ddJDLMSFkMst6y8iVaYM5_pk2mJHGG8LRiWhw' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('🔑 FCM Token:', currentToken);
          // هنا يمكن إرسال التوكن إلى السيرفر لتلقي الإشعارات لاحقًا
        } else {
          console.log('⚠️ لم يتم الحصول على توكن FCM، تأكد من السماح بالإشعارات');
        }
      })
      .catch((err) => {
        console.error('❌ خطأ أثناء الحصول على توكن FCM:', err);
      });
  } else {
    console.warn('⚠️ تم رفض الإشعارات من قبل المستخدم');
  }
});

// 4️⃣ الاستماع للرسائل أثناء فتح الصفحة
onMessage(messaging, (payload) => {
  console.log('💬 رسالة FCM أثناء فتح الصفحة:', payload);
  // يمكنك هنا عرض إشعار داخل الصفحة أو تحديث واجهة المستخدم
});
