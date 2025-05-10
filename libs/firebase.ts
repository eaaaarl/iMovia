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
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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

export const updateSearchCount = async (queryText: string, movie: Movie) => {
  try {
    const colRef = collection(db, "search");
    const q = query(colRef, where("searchTerm", "==", queryText));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const existingDoc = snapshot.docs[0];
      const existingData = existingDoc.data();
      const docRef = doc(db, "search", existingDoc.id);

      await updateDoc(docRef, {
        count: (existingData.count || 0) + 1,
      });
    } else {
      await addDoc(colRef, {
        searchTerm: queryText,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const colRef = collection(db, "search");

    const q = query(colRef, orderBy("count", "desc"), limit(5));
    const querySnapshot = await getDocs(q);

    const trendingMovies: TrendingMovie[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<TrendingMovie, "id">),
    }));

    return trendingMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
};
