import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYu3j12tomuuvKWAboZKJIR6PK1Yo0GCE",
  authDomain: "mycrud-db-c2e40.firebaseapp.com",
  projectId: "mycrud-db-c2e40",
  storageBucket: "mycrud-db-c2e40.appspot.com",
  messagingSenderId: "159119206744",
  appId: "1:159119206744:web:bf1b89b2dc25a76290dd2d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);