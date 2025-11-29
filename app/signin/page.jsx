"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db, auth } from "@/storage/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const router = useRouter();
  async function handleSignIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md bg-white w-full rounded-lg shadow-xl  p-8">
        <h1 className="text-3xl font-bold mb-4"> Sign In Page </h1>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#2cacd5] px-2 py-3 rounded-xl cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
