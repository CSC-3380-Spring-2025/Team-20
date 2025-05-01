// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3N-Uf-5qqe2VnZSmwIeU6EqbXoe2s61o",
  authDomain: "unifriend-sync-b73cd.firebaseapp.com",
  projectId: "unifriend-sync-b73cd",
  storageBucket: "unifriend-sync-b73cd.appspot.com",
  messagingSenderId: "469605020222",
  appId: "1:469605020222:web:1cabb4ade236c4efbc576f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
