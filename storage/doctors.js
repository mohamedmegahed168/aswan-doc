import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCnDjCaqGlK1Sd7Bg0SBwbpjWGE74s_L1g", 
  authDomain: "aswan-doc.firebaseapp.com", 
  projectId: "aswan-doc", 
  storageBucket: "aswan-doc.firebasestorage.app", 
  messagingSenderId: "460513740798", 
  appId: "460513740798:web:8e6333a68e2639b518e2af", 
};
const app= initializeApp(firebaseConfig); 
const db= getFirestore(app); 
export const doctorsReference= collection(db, "doctors"); 
const doctors= [{
    id: "doc1", 
    name: "Peter Romany", 
    speciality: "Cardiologist", 
    city: "Komombo", 
    fees: 300, 
}, {
    id: "doc2", 
    name: "Abdo Mohsen", 
    speciality: "Dermatologist", 
    city: "Aswan", 
    fees: 400, 
}, {
    id: "doc3", 
    name: "Mohamed El-Dewehy", 
    speciality: "Internal Medicine", 
    city: "Daraw", 
    fees: 500, 
}
]
connectFirestoreEmulator(db, "localhost", 8080);
async function doctorsSetUp() {
    for(const doctor of doctors) {
        console.log("adding doctor", doctor)
       try {
        await  addDoc(doctorsReference, doctor)
       } catch(error) {
        console.log("error loading", doctor.name)
       }
       
    }
    process.exit(0); 
}
doctorsSetUp()

