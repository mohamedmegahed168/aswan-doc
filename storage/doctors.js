import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from 'fs';


const doctors = JSON.parse(fs.readFileSync(new URL('../Doctors.json', import.meta.url), 'utf8'));
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
const doctorsReference= collection(db, "doctors"); 
   
async function doctorsSetUp() {
    let added = 0;
    let errors = 0;
    for (const doctor of doctors) {
        console.log('adding doctor', doctor.name || '(no-name)');
        try {
            await addDoc(doctorsReference, {
                name: doctor.name || "",
                specialty: doctor.specialty || "",
                area: doctor.area || "",
                address: doctor.address || "",
                location: doctor.location || "", 
                arrivalTime: doctor.arrivalTime || "",
                pharmacy: doctor.pharmacy || "",
                contact: doctor.contact || "",
                createdAt: new Date()
            });
            added++;
        } catch (error) {
            console.error('error adding', doctor.name || '(no-name)', error);
            errors++;
        }
    }
    console.log(`Import finished. Added: ${added}, Errors: ${errors}`);
    process.exit(errors ? 1 : 0);
}
doctorsSetUp()

