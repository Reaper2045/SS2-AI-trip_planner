// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC43aQzoyNe0QkqlaQ4AIhW00FzLMciTMY",
  authDomain: "ss2-trippytravelcompanion.firebaseapp.com",
  projectId: "ss2-trippytravelcompanion",
  storageBucket: "ss2-trippytravelcompanion.firebasestorage.app",
  messagingSenderId: "716465406287",
  appId: "1:716465406287:web:e704e8bc582697f6dd853a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
