"use client";
import { useSearchParams } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/storage/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("user") || "Guest";
  /*useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current user:", currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);*/
  async function handleSignOut() {
    await signOut(auth);
    router.push("/");
  }
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {userEmail}!</p>
      <button
        className="border border-slate-400 rounded bg-slate-200 w-24 cursor-pointer"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}
export default DashboardPage;
