import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.36 } },
  };

  return (
    <motion.section
      id="about"
      aria-labelledby="about-title"
      className="max-w-7xl mx-auto px-6 py-10"
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.18 }}
      variants={container}
    >
      <div>
        <div className="flex flex-col gap-5">
          <h2
            id="about-title"
            className="text-2xl md:text-3xl font-semibold text-center"
          >
            Why I built this — to make finding healthcare in Aswan simple and
            reliable.
          </h2>
          <p className="text-gray-600 text-center ">
            I grew up in Aswan and saw how difficult it was to locate
            up-to-date, trustworthy medical information. I built this site to
            make it easier for residents and visitors to find doctors, clinics
            and pharmacies — quickly and confidently.
          </p>
        </div>
        <motion.div
          variants={item}
          className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="block md:hidden relative h-44 rounded-lg overflow-hidden my-3">
            <Image
              src="/aswan1.jpg"
              alt="Aswan skyline along the Nile"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <motion.div
            variants={item}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg h-72 ">
              <Image
                src="/aswan1.jpg"
                alt="Aswan skyline along the Nile"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Feature
              title="Local coverage"
              desc="Curated listings for doctors, clinics and pharmacies across Aswan."
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="12" cy="9" r="2.2" fill="currentColor" />
                </svg>
              }
            />

            <Feature
              title="Verified information"
              desc="Contact details and hours are checked and updated when possible."
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              }
            />

            <Feature
              title="Clear directions"
              desc="Map links and addresses to help you get there, fast."
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M9 10l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Local-first and privacy-respecting — built to be useful and
            unobtrusive.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#eef8fb] to-[#f4fbff] text-[var(--color-primary)]">
        {icon}
      </span>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
