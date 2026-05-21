import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADtdM-ZR10hI0rQEUHtlVZNmLXXSOb4wQ",
  authDomain: "khonggianhcm-e33b6.firebaseapp.com",
  projectId: "khonggianhcm-e33b6",
  storageBucket: "khonggianhcm-e33b6.firebasestorage.app",
  messagingSenderId: "576129243350",
  appId: "1:576129243350:web:96899e06fd7dac5a2d1177",
  measurementId: "G-F5FLJ61CSC"
};

// Khởi tạo Firebase App (tránh khởi tạo lại nếu đã tồn tại)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Analytics chỉ hoạt động ở phía client (browser)
export const initAnalytics = async () => {
  const supported = await isSupported();
  if (supported) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
