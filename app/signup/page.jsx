"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/storage/firebase";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { motion, useReducedMotion } from "framer-motion";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });
  const router = useRouter();
  const usersCollection = collection(db, "users");
  function validateForm() {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      general: "",
    };
    if (!name) {
      ((newErrors.name = "name is required"), (isValid = false));
    } else if (name.trim().length < 3) {
      newErrors.name = "name must be at least 3 characters";
      isValid = false;
    }
    if (!email) {
      ((newErrors.email = "email is required"), (isValid = false));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      ((newErrors.email = "please enter a valide email"), (isValid = false));
    }
    if (!password) {
      ((newErrors.password = "password is required"), (isValid = false));
    } else if (password.trim().length < 6) {
      ((newErrors.password = "password must be at least 6 characters"),
        (isValid = false));
    }
    setErrors(newErrors);
    return isValid;
  }
  async function handleSignUp(event) {
    event.preventDefault();
    if (!validateForm()) return;
    setErrors({ name: "", email: "", password: "", general: "" });
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      await setDoc(doc(usersCollection, user.uid), {
        name: name.trim(),
        email: email.trim(),
        createdAt: serverTimestamp(),
      });
      router.push("/dashboard");
    } catch (error) {
      handleFirebaseErrors(error.code);
    }
  }
  function handleFirebaseErrors(errorCode) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setErrors((prev) => ({
          ...prev,
          email: "This Email is already registered",
        }));
        break;
      case "auth/network-request-failed":
        setErrors((prev) => ({
          ...prev,
          general: "Network error. Check your connection.",
        }));
        break;
      case "auth/too-many-requests":
        setErrors((prev) => ({
          ...prev,
          password: "Too many attempts. Try again later.",
        }));
        break;
      default:
        setErrors((prev) => ({
          ...prev,
          general: "Something went wrong. Please try again",
        }));
    }
  }
  const reduce = useReducedMotion();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-xl p-8 min-h-96 space-y-4">
            <h1 className="text-3xl font-bold"> Sign Up Page </h1>
            {errors.general && (
              <p className="text-sm font-normal text-red-500">
                {errors.general}
              </p>
            )}
            <form className=" text-gray-600 space-y-3" onSubmit={handleSignUp}>
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium ">
                  Name:
                </label>
                <input
                  required
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="full name"
                  id="name"
                  className="w-full font-normal  px-4 py-3 border border-gray-300 focus:outline-[var(--color-primary)] rounded-xl"
                />
                {errors.name && (
                  <p className="text-sm font-normal pl-2 text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email:
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="email"
                  id="email"
                  className="w-full font-normal  px-4 py-3 border border-gray-300 rounded-xl focus:outline-[var(--color-primary)]"
                />
                {errors.email && (
                  <p className="text-sm font-medium text-red-500 pl-2">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium "
                >
                  Password:
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  name="password"
                  type="password"
                  placeholder="password"
                  id="password"
                  className="w-full font-normal px-4 py-3 border border-gray-300 rounded-xl focus:outline-[var(--color-primary)]"
                />
                {errors.password && (
                  <p className="text-sm font-normal font-red-500 pl-2">
                    {errors.password}
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                whileHover={reduce ? {} : { scale: 1.02 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                className="w-full bg-[var(--color-primary)] text-white text-lg py-3 rounded-xl font-semibold hover:bg-[var(--primary-dark)] active:scale-95 transition-all cursor-pointer"
              >
                Sign Up
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
