// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrl6rJQSx0DlJHTSfCvQ83oC6HmhGriFg",
  authDomain: "truthswipe.firebaseapp.com",
  projectId: "truthswipe",
  storageBucket: "truthswipe.firebasestorage.app",
  messagingSenderId: "273788818212",
  appId: "1:273788818212:web:d56deef3513fc76e9d19b1",
  measurementId: "G-N74Z57BE08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };