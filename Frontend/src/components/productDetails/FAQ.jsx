import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this product suitable for sensitive skin?",
    answer:
      "Yes. Pearl Promise products are formulated to be gentle and suitable for most skin types, including sensitive skin.",
  },
  {
    question: "Can I use this product every day?",
    answer:
      "Absolutely! Most Pearl Promise products are designed for daily use. Follow the recommended usage instructions for best results.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Results vary depending on your skin type, but many customers notice visible improvements within 2–4 weeks of regular use.",
  },
  {
    question: "Are Pearl Promise products cruelty free?",
    answer:
      "Yes. All Pearl Promise products are cruelty free and are never tested on animals.",
  },
  {
    question: "Do these products contain harmful chemicals?",
    answer:
      "No. Pearl Promise focuses on skin-friendly formulations and avoids unnecessary harsh ingredients wherever possible.",
  },
];

function FAQ() {

  const [active, setActive] = useState(0);

  return (

    <section className="max-w-5xl mx-auto px-6 py-20">

      <div className="text-center mb-14">

        <p className="uppercase tracking-[4px] text-pink-500 text-sm font-semibold">
          Need Help?
        </p>

        <h2 className="text-4xl font-bold mt-3 text-gray-900">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-gray-500">
          Everything you need to know before purchasing.
        </p>

      </div>

      <div className="space-y-5">

        {faqs.map((faq, index) => (

          <motion.div
            key={index}
            layout
            className="rounded-3xl border border-pink-100 bg-white shadow-sm overflow-hidden"
          >

            <button
              onClick={() =>
                setActive(active === index ? -1 : index)
              }
              className="flex w-full items-center justify-between p-6 text-left"
            >

              <h3 className="text-lg font-semibold text-gray-900">
                {faq.question}
              </h3>

              <ChevronDown
                className={`transition duration-300 ${
                  active === index
                    ? "rotate-180 text-pink-500"
                    : ""
                }`}
              />

            </button>

            <AnimatePresence>

              {active === index && (

                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="px-6 pb-6 text-gray-600 leading-7"
                >

                  {faq.answer}

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        ))}

      </div>

    </section>

  );

}

export default FAQ;