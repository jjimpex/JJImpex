import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/faq.css";

const faqs = [
  {
    question: "Do you deal in bulk orders?",
    answer:
      "Yes, we specialize in bulk and wholesale distribution for retailers and distributors across India.",
  },
  {
    question: "Which brands do you supply?",
    answer:
      "We deal in premium FMCG and retail brands listed in our Collections section.",
  },
  {
    question: "What is the delivery timeline?",
    answer:
      "Delivery typically takes 5–7 working days across India depending on location.",
  },
  {
    question: "How can I enquire about pricing?",
    answer:
      "Click the Enquire button in the footer and our team will contact you shortly.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />

      {/* SEO FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        })}
      </script>

      <div className="faq-wrapper">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="faq-container">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              className="faq-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="faq-question" onClick={() => toggle(index)}>
                {item.question}

                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <FaChevronDown />
                </motion.span>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Faq;
