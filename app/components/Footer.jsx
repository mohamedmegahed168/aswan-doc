import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0f1724] text-white py-8"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Aswan-Doc
          </div>
          <div className="text-sm text-gray-300 mt-1">
            Helping you find care in Aswan
          </div>
        </div>

        <div className="flex gap-6">
          <motion.a
            whileHover={{ scale: 1.03 }}
            href="#"
            className="text-gray-300 hover:text-white"
          >
            Contact
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            href="#"
            className="text-gray-300 hover:text-white"
          >
            Privacy
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            href="#"
            className="text-gray-300 hover:text-white"
          >
            Terms
          </motion.a>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Aswan-Doc. All rights reserved.
      </div>
    </motion.footer>
  );
}
