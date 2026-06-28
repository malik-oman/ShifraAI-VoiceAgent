import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifraai-e1a18.firebaseapp.com",
  projectId: "shifraai-e1a18",
  storageBucket: "shifraai-e1a18.firebasestorage.app",
  messagingSenderId: "559860790706",
  appId: "1:559860790706:web:db89e7dc64f6659654a0ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}