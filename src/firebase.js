import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyBrAaSXE4GQTs4fdHgdKFM4k3hzft-G-28',
    authDomain: "pit-stop-3ff35.firebaseapp.com",
    projectId: "pit-stop-3ff35",
    storageBucket: "pit-stop-3ff35.appspot.com",
    messagingSenderId: "1007486521237",
    appId: '1:1007486521237:web:af1122d54906a89641f09c'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;