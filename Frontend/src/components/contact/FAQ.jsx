import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "../../data/contactData";
import FAQItem from "./FAQItem";

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="bg-rose-50 py-20 mt-12 "
    >
      <div className="mx-auto max-w-5xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            FAQs
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Find quick answers to the most common questions about
            orders, shipping, payments, returns, and Pearl Promise products.
          </p>
        </motion.div>

        {/* FAQ List */}

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
            >
              <FAQItem
                faq={faq}
                isOpen={activeId === faq.id}
                onToggle={() => toggleFAQ(faq.id)}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}