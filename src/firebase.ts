import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBDeDjrSvUYI45LklrQ2DBkap1m2_9D-Dk",
    authDomain: "vista-19b3e.firebaseapp.com",
    projectId: "vista-19b3e",
    storageBucket: "vista-19b3e.appspot.com",
    messagingSenderId: "903634761946",
    appId: "1:903634761946:web:4b260d2dd8f0d399f38de3",
    measurementId: "G-JFFPCQ3956"
}).auth();