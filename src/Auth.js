// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpthm_XufF32znag3SobxeNLBkkEO8UVY",
  authDomain: "auth-61dad.firebaseapp.com",
  projectId: "auth-61dad",
  storageBucket: "auth-61dad.appspot.com",
  messagingSenderId: "598636077695",
  appId: "1:598636077695:web:d3cb75b920e1442a88554a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth =  getAuth(app)