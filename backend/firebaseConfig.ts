import { initializeApp } from "firebase-admin/app";

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