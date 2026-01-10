// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsvnwjgNCLRxKK50r-CZgQtsdJrAVvhd0",
  authDomain: "movie-gpt-dac20.firebaseapp.com",
  projectId: "movie-gpt-dac20",
  storageBucket: "movie-gpt-dac20.firebasestorage.app",
  messagingSenderId: "317428207446",
  appId: "1:317428207446:web:a26f03f4aeee0a81d410f7",
  measurementId: "G-XKPPMFBND9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);