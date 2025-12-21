"use client";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth, db } from "@/storage/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  limit,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DoctorCard({ doctor, index = 0 }) {
  return (
    <div
      style={{ animationDelay: `${index * 70}ms` }}
      className="opacity-0 animate-fade-up bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center font-semibold text-lg">
          {doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{doctor.name}</h3>
          <p className="text-sm text-slate-500">{doctor.speciality}</p>
        </div>
        <div className="ml-auto text-sm text-slate-400">
          {doctor.city || "—"}
        </div>
      </div>

      <div className="text-sm text-slate-600">City: {doctor.city || "—"}</div>

      {doctor.phone && (
        <div className="flex gap-3">
          <a
            href={`tel:${doctor.phone}`}
            className="text-sm text-indigo-600 hover:underline"
          >
            Call
          </a>
          <a
            href={`mailto:${doctor.email || ""}`}
            className="text-sm text-indigo-600 hover:underline"
          >
            Email
          </a>
        </div>
      )}

      <div className="mt-auto flex gap-2">
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-md shadow-sm hover:shadow-lg transition">
          Book
        </button>
        <button className="px-4 py-2 border rounded-md">View</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
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

  useEffect(() => {
    if (!user) return;
    const usersRef = collection(db, "users");
    async function fetchUser() {
      setLoading(true);
      try {
        const userRef = doc(usersRef, user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) setUserInfo(snap.data());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [user]);

  useEffect(() => {
    const doctorsRef = collection(db, "doctors");
    async function fetchDoctors() {
      setLoading(true);
      setError("");
      try {
        const filters = [];
        if (city) filters.push(where("city", "==", city));
        if (speciality) filters.push(where("speciality", "==", speciality));
        const q =
          filters.length > 0
            ? query(doctorsRef, ...filters)
            : query(doctorsRef, limit(50));
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setDoctors(list);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [city, speciality]);

  async function handleSignOut() {
    await signOut(auth);
    router.push("/");
  }

  function resetFilters() {
    setCity("");
    setSpeciality("");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold animate-fade-in">Dashboard</h1>
          <p className="text-sm text-slate-600 animate-fade-in">
            Find available doctors in your area
          </p>
        </div>
        <motion.div whileTap={{ scale: 0.98 }}>
          <Link href="/" className="text-2xl font-semibold">
            Aswan-Med
          </Link>
        </motion.div>
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
              {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-700">
                {userInfo?.name || "User"}
              </div>
              <div className="text-xs text-slate-500">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-3 py-1 rounded bg-red-500 text-white text-sm"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <motion.select
            whileHover={{ scale: 1.02 }}
            whileFocus={{ borderColor: "#4346f1ff" }}
            className=" rounded-xl p-2 border border-gray-400 cursor-pointer w-full md:w-64 outline-none font-normal"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          >
            <option value="">All Cities</option>
            <option value="Komombo">Komombo</option>
            <option value="Aswan">Aswan</option>
            <option value="Daraw">Daraw</option>
          </motion.select>

          <motion.select
            whileHover={{ scale: 1.02 }}
            whileFocus={{ borderColor: "#4346f1ff " }}
            className="border border-gray-400 cursor-pointer outline-none font-normal p-2 rounded-xl w-full md:w-64"
            onChange={(e) => setSpeciality(e.target.value)}
            value={speciality}
          >
            <option value="">All Specialities</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Internal Medicine">Internal Medicine</option>
          </motion.select>

          <div className="ml-auto flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetFilters}
              className="px-5 py-1 bg-transparent border border-gray-300 text-gray-500 rounded-xl cursor-pointer hover:border-gray-400 transition-colors hover:text-gray-700"
            >
              Reset
            </motion.button>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton rounded-xl p-4 h-36 shadow" />
            ))}
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-50 text-rose-700 rounded">{error}</div>
        ) : doctors.length === 0 ? (
          <div className="p-6 bg-yellow-50 rounded text-slate-700">
            No doctors found. Try different filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
