import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'ping-88bb0.firebaseapp.com',
  projectId: 'ping-88bb0',
  storageBucket: 'ping-88bb0.appspot.com',
  messagingSenderId: '943298571290',
  appId: '1:943298571290:web:15314597b5c2d4b7dc35a3',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
