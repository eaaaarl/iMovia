import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    // @ts-ignore
    getReactNativePersistence,
    initializeAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfOX4rRB1zX3L0zVrccqKTpiPGWxnaWgI",
  authDomain: "imovia-d4c02.firebaseapp.com",
  projectId: "imovia-d4c02",
  storageBucket: "imovia-d4c02.firebasestorage.app",
  messagingSenderId: "1017542184340",
  appId: "1:1017542184340:web:bdbed99f1e3d6cc1acd381",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
export const authFirebase = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

// Export authentication functions
export const signUpWithEmail = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => createUserWithEmailAndPassword(authFirebase, email, password);

export const loginWithEmail = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => signInWithEmailAndPassword(authFirebase, email, password);

// Default export for the Firebase app instance
export default app;
