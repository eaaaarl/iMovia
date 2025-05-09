import { FIREBASE_CONFIG } from "@/constants/config";
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
  apiKey: FIREBASE_CONFIG.apiKey,
  authDomain: FIREBASE_CONFIG.authDomain,
  projectId: FIREBASE_CONFIG.projectId,
  storageBucket: FIREBASE_CONFIG.storageBucket,
  messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
  appId: FIREBASE_CONFIG.appId,
};

const app = initializeApp(firebaseConfig);

export const authFirebase = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

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

export default app;
