// firebase-messaging-sw.js

// استيراد المكتبات اللازمة من Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getMessaging, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js';

// تهيئة Firebase باستخدام بيانات مشروعك
const firebaseConfig = {
    apiKey: "AIzaSyAm0hh9I6i58ywW1D2gZg09liG-wG-tBsU",
    authDomain: "chat-fat-4f082.firebaseapp.com",
    projectId: "chat-fat-4f082",
    storageBucket: "chat-fat-4f082.appspot.com",
    messagingSenderId: "297367474930",
    appId: "1:297367474930:web:a05b983e05a0ba257fb66b",
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// التعامل مع الرسائل عند وصولها في الخلفية
onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // استخراج عنوان ونص الإشعار من البيانات المرسلة
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://t772299420.github.io/-/IMG-20250810-WA0002.jpg', // مسار أيقونة الإشعار
        click_action: 'https://t772299420.github.io/-/', // الرابط الذي يفتح عند النقر على الإشعار
    };

    // عرض الإشعار للمستخدم
    self.registration.showNotification(notificationTitle, notificationOptions);
});
