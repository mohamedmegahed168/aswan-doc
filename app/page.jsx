"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  function signUp() {
    router.push("/signup");
  }
  function signIn() {
    router.push("/signin");
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 h-screen">
      <h1 className="text-4xl font-bold"> Thats Where Everthing Starts </h1>
      <button
        className="w-40 h-10 text-white bg-slate-700 rounded-xl font-semibold hover:bg-slate-900 cursor-pointer transition-all"
        onClick={signUp}
      >
        {" "}
        Sign Up{" "}
      </button>
      <button
        className="cursor-pointer text-slate-700 w-40 h-10 hover:bg-slate-50 transition-all rounded-xl border border-slate-300 font-semibold"
        onClick={signIn}
      >
        Sign In
      </button>
      <div className="bg-gray-200 rounded-lg h-64 p-8">
        <span className="text-5xl"> 🔍 </span>
      </div>
    </div>
  );
}

export default HomePage;
