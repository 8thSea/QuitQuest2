// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi6DTctyOTnyIKOppKTnPUBnGYTHm-SjA",
  authDomain: "quit-quest-3.firebaseapp.com",
  projectId: "quit-quest-3",
  storageBucket: "quit-quest-3.firebasestorage.app",
  messagingSenderId: "874380122706",
  appId: "1:874380122706:web:d541102d3f7e0a40acdd8b",
  measurementId: "G-1BPSWYQ1L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);

// Export the FirebaseService object for compatibility
export const FirebaseService = {
  auth,
  firestore
};

export default app;