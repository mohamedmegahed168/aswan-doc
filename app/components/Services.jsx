import { motion, useReducedMotion } from "framer-motion";
export default function Services() {
  const items = [
    {
      title: "Find Doctors",
      desc: "Search by specialty, location, and availability.",
    },
    {
      title: "Pharmacies",
      desc: "Locate pharmacies with working hours and contacts.",
    },
    {
      title: "Verified",
      desc: "Listings are checked for accuracy and quality.",
    },
  ];

  const reduce = useReducedMotion();

  return (
    <motion.section
      id="services"
      className="bg-[#f6f9fb] py-20"
      initial="hidden"
      animate="show"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Helpful tools to connect you with local healthcare professionals and
          pharmacies.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              className="bg-white rounded-xl p-6 shadow-sm"
              whileHover={reduce ? {} : { scale: 1.03 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center text-white mb-4"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary), var(--primary-dark))",
                }}
              >
                ✓
              </div>
              <h3 className="font-semibold text-lg">{it.title}</h3>
              <p className="text-gray-600 mt-2">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/*  return (
      <motion.section id="services" className="bg-[#f6f9fb] py-20" initial="hidden" animate="show">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">Our Services</h2>
          <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">Helpful tools to connect you with local healthcare professionals and pharmacies.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((it, idx) => (
              <motion.div key={it.title} className="bg-white rounded-xl p-6 shadow-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className="w-12 h-12 rounded-md flex items-center justify-center text-white mb-4" style={{ background: 'linear-gradient(135deg,var(--color-primary), var(--primary-dark))' }}>✓</div>
                <h3 className="font-semibold text-lg">{it.title}</h3>
                <p className="text-gray-600 mt-2">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    ); */
