"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "@/storage/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion, useReducedMotion } from "framer-motion";

function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  function validateForm() {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }
  async function handleSignIn(event) {
    event.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({ email: "", password: "", general: "" });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      handleFirebaseErrors(error?.code || error?.message || "unknown");
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleFirebaseErrors(errorCode) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
        break;
      case "auth/network-request-failed":
        setErrors((prev) => ({
          ...prev,
          general: "Network error. Check your connection.",
        }));
        break;
      case "auth/wrong-password":
        setErrors((prev) => ({ ...prev, password: "Incorrect password" }));
        break;
      case "auth/user-not-found":
        setErrors((prev) => ({
          ...prev,
          email: "No account found with this email",
        }));
        break;
      case "auth/invalid-credential":
        setErrors((prev) => ({
          ...prev,
          general: "Invalid email or password",
        }));
        break;
      case "auth/too-many-requests":
        setErrors((prev) => ({
          ...prev,
          password: "Too many attempts. Try again later.",
        }));
        break;
      case "auth/weak-password":
        setErrors((prev) => ({
          ...prev,
          password: "Password is too weak. Use at least 6 characters.",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Navbar />
      <div className="max-w-md bg-white w-full rounded-xl shadow-xl  p-8">
        <h1 className="text-3xl font-bold mb-4"> Sign In Page </h1>
        {errors.general && (
          <p className="text-sm font-normal text-red-500"> {errors.general} </p>
        )}
        <form className="space-y-6 text-gray-700" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-md font-normal mb-2">
              Email:
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              id="email"
              className="font-normal w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-[var(--color-primary)]"
            />
            {errors.email && (
              <p className="pl-2 text-sm font-normal text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-normal mb-2"
            >
              Password:
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-[var(--color-primary)]"
            />
            {errors.password && (
              <p className="pl-2 text-sm font-normal text-red-600">
                {errors.password}
              </p>
            )}
          </div>
          <motion.button
            type="submit"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full text-white bg-[var(--color-primary)] px-2 py-3 rounded-xl text-lg font-semibold cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in "
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
