import {getApp, getApps, initializeApp} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAy0O1QlGsRLmQQtkdskP2_25HlrObz0rg",
    authDomain: "kekflix-b431d.firebaseapp.com",
    projectId: "kekflix-b431d",
    storageBucket: "kekflix-b431d.appspot.com",
    messagingSenderId: "1058706107817",
    appId: "1:1058706107817:web:387eff5449adaf794c68b8"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const auth = getAuth();

export default app;

export { db, auth };