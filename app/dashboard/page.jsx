"use client";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/storage/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const doctorsReference = collection(db, "doctors");
    const q = query(
      doctorsReference,
      where("city", "==", city),
      where("speciality", "==", speciality)
    );
    async function fetchDoctors() {
      if (city.trim() !== "" && speciality.trim() !== "") {
        setLoading(true);
        const queryDocuments = await getDocs(q);
        const doctorsList = [];
        queryDocuments.forEach((doc) => {
          doctorsList.push(doc.data());
        });
        setDoctors(doctorsList);
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [city, speciality]);
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
      <select
        className="border border-slate-400 rounded"
        onChange={(e) => (setCity(e.target.value), setSpeciality(""))}
        value={city}
      >
        <option value=""> Select City </option>
        <option value="Komombo"> Komombo </option>
        <option value="Aswan"> Aswan </option>
        <option value="Daraw"> Daraw </option>
      </select>
      <select
        className="border border-slate-400 rounded"
        onChange={(e) => setSpeciality(e.target.value)}
        value={speciality}
      >
        <option value=""> Select Speciality </option>
        <option value="Cardiologist"> Cardiologist </option>
        <option value="Dermatologist"> Dermatologist </option>
        <option value="Pediatrician"> Pediatrician </option>
        <option value="Internal Medicine"> Internal Medicine </option>
      </select>
      <div>
        {loading ? (
          <p> loading.......</p>
        ) : doctors === null ? (
          <p> Search For Doctors IN Your Area </p>
        ) : doctors.length === 0 ? (
          <p> No Doctors Were Found </p>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor.name}>
              <h2> Name: {doctor.name} </h2>
              <p> Speciality: {doctor.speciality} </p>
              <p> City: {doctor.city} </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default DashboardPage;
