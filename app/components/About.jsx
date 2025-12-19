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
      aria-label="About Aswan-Doc"
      role="region"
      aria-labelledby="about-title"
      className="max-w-7xl mx-auto px-6 mb-5 py-12 bg-gradient-to-b from-white to-[#fbfdff] rounded-xl"
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      variants={container}
    >
      <div>
        <div className="flex flex-col gap-5">
          <h2
            id="about-title"
            className="text-3xl md:text-4xl font-extrabold text-center tracking-tight"
          >
            Why I built this — to make finding healthcare in Aswan simple and
            reliable.
          </h2>
          <div
            className="mx-auto mt-4 w-24 h-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--primary-dark)]"
            aria-hidden="true"
          />
          <p className="text-gray-700 text-center leading-relaxed">
            I grew up in Aswan and built Aswan‑Doc to make it easier for
            residents and visitors to find doctors, clinics, and pharmacies —
            with verified information so you can choose confidently.
          </p>
        </div>
        <motion.div
          variants={item}
          className="my-10 grid grid-cols-1 md:grid-cols-2 gap-10 "
        >
          <div className="block md:hidden relative h-44 rounded-lg overflow-hidden my-3 shadow-md ring-1 ring-gray-50">
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
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-100 h-72 transition-transform duration-300">
              <Image
                src="/aswan1.jpg"
                alt="Aswan skyline along the Nile"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-2xl text-center"> What I stand for: </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
              <Feature
                title="Speed"
                desc="Find and book appointments in a few clicks — no long waits."
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 12a9 9 0 1118 0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12l4-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              <Feature
                title="Verified information"
                desc="Contact details and opening hours are checked and updated when possible."
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 2l6 2v4c0 4-3 8-6 10-3-2-6-6-6-10V4l6-2z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 12.5l1.8 1.8L15 10.3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                      d="M12 2l7 3v13l-7 4-7-4V5l7-3z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8v6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14l3-3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <Feature
                title="Care"
                desc="Getting you to focus on what truly matters: your health and the health of the people you love."
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M20.8 7.2a5.5 5.5 0 00-7.8 0L12 8.2l-1-1a5.5 5.5 0 00-7.8 7.8l7.8 7.8 7.8-7.8a5.5 5.5 0 000-7.8z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div
      role="listitem"
      tabIndex="0"
      className="flex items-start gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#eef8fb] to-[#f4fbff] text-[var(--color-primary)]">
        {icon}
      </span>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-gray-700">{desc}</p>
      </div>
    </div>
  );
}
