// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ5HZZrz_Q0Yv1leG4fos-_z8mluJwg88",
    authDomain: "note-app-efce8.firebaseapp.com",
    projectId: "note-app-efce8",
    storageBucket: "note-app-efce8.appspot.com",
    messagingSenderId: "941849079425",
    appId: "1:941849079425:web:96ce785a1873a7c03d2780",
    measurementId: "G-8WQLYS7X0X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);