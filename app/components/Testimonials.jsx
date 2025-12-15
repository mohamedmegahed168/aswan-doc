import { motion, useReducedMotion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      name: "Amina",
      quote: "Found an excellent doctor within minutes. Very easy!",
    },
    {
      name: "Hassan",
      quote: "The pharmacy info saved me a lot of time — highly recommended.",
    },
    { name: "Sara", quote: "Simple, fast, and free. Exactly what I needed." },
  ];

  const reduce = useReducedMotion();

  return (
    <motion.section
      className="py-20"
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">
          What People Say
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <motion.div
              key={r.name}
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={reduce ? undefined : { delay: idx * 0.08 }}
            >
              <p className="text-gray-700">“{r.quote}”</p>
              <div className="mt-4 font-semibold">{r.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
