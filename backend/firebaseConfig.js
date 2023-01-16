"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var app_1 = require("firebase-admin/app");
var firebaseConfig = {
    apiKey: "AIzaSyAQ5HZZrz_Q0Yv1leG4fos-_z8mluJwg88",
    authDomain: "note-app-efce8.firebaseapp.com",
    projectId: "note-app-efce8",
    storageBucket: "note-app-efce8.appspot.com",
    messagingSenderId: "941849079425",
    appId: "1:941849079425:web:96ce785a1873a7c03d2780",
    measurementId: "G-8WQLYS7X0X"
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(firebaseConfig);
