"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { auth } from "@/storage/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion, useReducedMotion } from "framer-motion";

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
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Navbar />
      <div className="max-w-md bg-white w-full rounded-lg shadow-xl  p-8">
        <h1 className="text-3xl font-bold mb-4"> Sign In Page </h1>
        <form className="space-y-6 text-gray-700" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-md font-normal mb-2">
              Email:
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="font-normal w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-[var(--color-primary)]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-normal mb-2"
            >
              Password:
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-[var(--color-primary)]"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            className="w-full text-white bg-[var(--color-primary)] px-2 py-3 rounded-xl cursor-pointer"
          >
            Sign In
          </motion.button>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
