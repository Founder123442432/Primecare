// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZWYEPspdx-kq6kNhAVCyKfCu6YDF1gME",
  authDomain: "e-shop-8326d.firebaseapp.com",
  projectId: "e-shop-8326d",
  storageBucket: "e-shop-8326d.appspot.com",
  messagingSenderId: "704698787493",
  appId: "1:704698787493:web:c370c00469532bf0cf0f4c",
  measurementId: "G-J0XX1D3GZ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
