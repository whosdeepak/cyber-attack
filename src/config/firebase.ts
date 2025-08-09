// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2IT1Lr9aDU00CoGff2iLvmrDEmkXIe6k",
  authDomain: "power-bi-bd687.firebaseapp.com",
  projectId: "power-bi-bd687",
  storageBucket: "power-bi-bd687.firebasestorage.app",
  messagingSenderId: "1025337174351",
  appId: "1:1025337174351:web:449f5c6065e3ef3b24bd3a",
  measurementId: "G-KLLLT1LRWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;