import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APP_KEY,
    authDomain: "pit-stop-3ff35.firebaseapp.com",
    projectId: "pit-stop-3ff35",
    storageBucket: "pit-stop-3ff35.appspot.com",
    messagingSenderId: "1007486521237",
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;