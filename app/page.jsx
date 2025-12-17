"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="max-w-7xl mx-auto px-6 my-12">
          <h2 className="text-4xl md:text-5xl font-thin text-center tracking-tight">
            Discover From More Than
            <span className="text-[var(--color-primary)]">+200</span> Doctors
          </h2>
        </div>
        <Services />
        <div className="max-w-7xl mx-auto px-6 my-10">
          <h2 className="text-4xl md:text-5xl font-thin text-center tracking-tight">
            Who Am I?
          </h2>
        </div>
        <About />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
