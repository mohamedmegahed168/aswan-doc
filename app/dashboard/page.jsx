"use client";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/storage/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);
  async function handleSignOut() {
    await signOut(auth);
  }
  if (!user) {
    return <div>Redirecting...</div>;
  }
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user.email}!</p>
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
