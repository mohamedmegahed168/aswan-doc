"use client";
import { motion } from "framer-motion";
import { useState } from "react";
function Faq() {
  const [questionIndex, setQuestionIndex] = useState(null);
  const faq = [
    {
      question: "Is Aswan-Med free to use?",
      answer:
        "Yes, Aswan-Med is a voluntary website which is meant to help the people in our beloved city",
    },
    {
      question: "How do I find a doctor?",
      answer:
        "Simply use the search bar to provide your location, and the speciality you're looking for to find the best doctor for your needs",
    },
    {
      question: "Do I need to create an account?",
      answer: "Yes, you'll need to create an account",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach me out through any of the provided means in the contact page, I typically respond within 24 hours",
    },
  ];
  return (
    <motion.section
      id="faq"
      className="relative bg-gradient-to-br from-[#eaf6ff] to-white max-w-7xl mx-auto rounded-xl py-16 px-6 sm:px-10"
    >
      <div className="absolute -top-10 -right-10 opacity-20 pointer-events-none">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="110" cy="110" r="110" fill="#8cc9ff" />
        </svg>
      </div>

      <motion.div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Got questions? I&apos;ve got answers
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          If you can&apos;t find what you&apos;re looking for, feel free to
          contact me — I typically reply within 24 hours.
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {faq.map((item, index) => (
          <motion.article
            key={index}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white overflow-hidden rounded-lg shadow-xl transition-shadow"
          >
            <button
              onClick={() =>
                setQuestionIndex(questionIndex === index ? null : index)
              }
              aria-expanded={questionIndex === index}
              aria-controls={`faq-panel-${index}`}
              id={`faq-button-${index}`}
              className="flex items-center justify-between w-full px-6 py-6 hover:bg-[#f6f9fb] transition-colors text-left cursor-pointer"
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: questionIndex === index ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="ml-4 text-xl transform"
                aria-hidden
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5v14"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 12h14"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </button>

            <motion.div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              initial={false}
              animate={{
                opacity: questionIndex === index ? 1 : 0,
                height: questionIndex === index ? "auto" : 0,
              }}
              className="overflow-hidden text-sm text-gray-700 "
            >
              <p className="leading-relaxed p-4">{item.answer}</p>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
export default Faq;
