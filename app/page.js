"use client";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db, auth } from "../storage/firebase";
import { useEffect, useState } from "react";

function HomePage() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();
  const namesRefrence = collection(db, "names");
  const docRef = doc(namesRefrence, "3DlJKh2hcPSya6gUT0F8");
  const newDoc = doc(namesRefrence);
  async function handleName(event) {
    const currentName = event.target.value;
    setName(currentName);
    setDoc(docRef, { name: currentName }, { merge: true });
  }
  async function signIn() {
    console.log(auth.currentUser);
    const userCredential = await signInAnonymously(auth);
    router.push("/dashboard");
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(namesRefrence, (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(fetchedData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {" "}
      <h1 className="text-4xl font-bold"> Thats Where Everthing Starts </h1>
      <h2>
        {data.map((item) => (
          <div key={item.id}>
            <h3> {item.name} </h3>
            <h3> {item.age} </h3>
            <h3> {item.college} </h3>
            <h3> {item.state} </h3>
          </div>
        ))}
      </h2>
      <input
        type="text"
        placeholder="Type Something"
        className="border-2"
        onChange={handleName}
      />
      <button
        className="cursor-pointer block bg-slate-300 border border-black m-4"
        onClick={signIn}
      >
        {" "}
        Click Me to Sign In
      </button>
    </div>
  );
}

export default HomePage;
