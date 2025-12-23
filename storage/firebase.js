import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnDjCaqGlK1Sd7Bg0SBwbpjWGE74s_L1g", 
  authDomain: "aswan-doc.firebaseapp.com", 
  projectId: "aswan-doc", 
  storageBucket: "aswan-doc.firebasestorage.app", 
  messagingSenderId: "460513740798", 
  appId: "460513740798:web:8e6333a68e2639b518e2af", 
};

const app= initializeApp(firebaseConfig); 
export const db= getFirestore(app); 
export const auth= getAuth(app); 
