// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC4DOx0dtE9Exp026qggvzCUNlM23b7yM",
  authDomain: "csci4177.firebaseapp.com",
  projectId: "csci4177",
  storageBucket: "csci4177.appspot.com",
  messagingSenderId: "601723415050",
  appId: "1:601723415050:web:e56cc71de78381e46fcdf3",
  measurementId: "G-N7EHGGV7WQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
