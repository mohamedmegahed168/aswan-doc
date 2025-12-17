import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function About() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, duration: 0.45 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.section
      id="about"
      aria-label="About Aswan-Doc"
      className="max-w-7xl mx-auto my-20 px-6 sm:px-8"
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
      variants={container}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div variants={item} className="space-y-6">
          <p className="text-sm font-medium text-[var(--color-primary)]">
            About Aswan-Doc
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Find trusted doctors and pharmacies in Aswan — quickly and
            confidently.
          </h2>

          <p className="text-gray-600 max-w-xl">
            As a developer born and raised in Aswan, I built Aswan‑Doc to make
            it effortless for residents and visitors to search, compare, and
            contact local healthcare providers and pharmacies. Local-first,
            accurate, and easy to use.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5v14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p className="font-medium">Local directory</p>
                <p className="text-sm text-gray-500">
                  Accurate listings of doctors and clinics in Aswan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p className="font-medium">Verified info</p>
                <p className="text-sm text-gray-500">
                  Contacts, hours and locations are checked for accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Link
              href="/signup"
              aria-label="Sign up"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-primary)] text-white rounded-lg shadow hover:scale-102 transition-transform"
            >
              Get Started
            </Link>

            <Link
              href="#contact"
              aria-label="Contact us"
              className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Contact
            </Link>
          </div>
        </motion.div>

        {/* Image (kept second in DOM) */}
        <motion.div
          variants={item}
          className="relative w-full rounded-xl overflow-hidden shadow-xl h-56 md:h-72"
          whileHover={reduce ? {} : { scale: 1.02 }}
          whileTap={reduce ? {} : { scale: 0.98 }}
        >
          <Image
            src="/aswan1.jpg"
            alt="Nile view of Aswan city with palm trees"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={false}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
export default About;
