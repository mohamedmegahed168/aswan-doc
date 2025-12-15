"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mt-12 tracking-tight">
            Discover From More Than{" "}
            <span className="text-[var(--color-primary)]">+200</span> Doctors
          </h2>
        </div>
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
