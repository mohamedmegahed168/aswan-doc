"use client";
import { signOut, onAuthStateChanged } from "firebase/auth";
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

function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
          {doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
        </div>
        <div>
          <h3 className="font-medium text-lg">{doctor.name}</h3>
          <p className="text-sm text-slate-500">{doctor.speciality}</p>
        </div>
      </div>
      <div className="text-sm text-slate-600">City: {doctor.city || "—"}</div>
      {doctor.phone && (
        <div className="flex gap-2">
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
        <button className="px-3 py-1 bg-indigo-600 text-white rounded">
          Book
        </button>
        <button className="px-3 py-1 border rounded">View</button>
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
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-600">
            Find available doctors in your area
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-700">
              {userInfo?.name || "User"}
            </div>
            <div className="text-xs text-slate-500">{user?.email}</div>
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
          <select
            className="border border-gray-400 p-2 rounded w-full md:w-64 outline-none font-normal"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          >
            <option value="">All Cities</option>
            <option value="Komombo">Komombo</option>
            <option value="Aswan">Aswan</option>
            <option value="Daraw">Daraw</option>
          </select>

          <select
            className="border p-2 rounded w-full md:w-64"
            onChange={(e) => setSpeciality(e.target.value)}
            value={speciality}
          >
            <option value="">All Specialities</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Internal Medicine">Internal Medicine</option>
          </select>

          <div className="ml-auto flex gap-2">
            <button onClick={resetFilters} className="px-3 py-1 border rounded">
              Reset
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-50 text-rose-700 rounded">{error}</div>
        ) : doctors.length === 0 ? (
          <div className="p-6 bg-yellow-50 rounded text-slate-700">
            No doctors found. Try different filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
