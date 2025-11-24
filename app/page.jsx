"use client";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { db, auth } from "../storage/firebase";
import { use, useEffect, useState } from "react";

function HomePage() {
  const router = useRouter();
  const namesRefrence = collection(db, "names");
  const [user, setUser] = useState(null);
  async function handleSignUp(e) {
    e.preventDefault();

    const email = String(e.target.email.value || "").trim();
    const password = String(e.target.password.value || "");
    await createUserWithEmailAndPassword(auth, email, password);
  }
  async function handleSignIn(e) {
    e.preventDefault();
    const email = String(e.target.email.value || "").trim();
    const password = String(e.target.password.value || "");
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    router.push(`/dashboard`);
  }

  return (
    <div className="flex flex-col items-center gap-8 h-screen">
      {" "}
      <h1 className="text-4xl font-bold"> Thats Where Everthing Starts </h1>
      <div className="border-1 border-slate-400 w-64">
        <form
          className="flex flex-col gap-4 w-60 items-center m-2"
          onSubmit={handleSignUp}
        >
          <input
            type="email"
            placeholder="email"
            className="border-1 border-slate-400"
            name="email"
          />
          <input
            type="password"
            placeholder="password"
            className="border-1 border-slate-400"
            name="password"
          />

          <button
            className="cursor-pointer block bg-slate-300 border border-slate-400 m-4"
            type="submit"
          >
            Click Me to Sign Up
          </button>
        </form>
      </div>
      <div className="border-1 border-slate-400 w-64">
        <form
          className="flex flex-col gap-4 w-60 items-center m-2"
          onSubmit={handleSignIn}
        >
          <input
            type="email"
            placeholder="email"
            className="border-1 border-slate-400"
            name="email"
          />
          <input
            type="password"
            placeholder="password"
            className="border-1 border-slate-400"
            name="password"
          />
          <button
            className="cursor-pointer block bg-slate-300 border border-slate-400 m-4"
            type="submit"
          >
            Click Me to Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
