import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQItem({
  faq,
  isOpen,
  onToggle,
}) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-md"
    >
      {/* Question */}

      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-pink-50"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {faq.question}
        </h3>

        <div className="rounded-full bg-pink-100 p-2 text-pink-600">
          {isOpen ? (
            <Minus size={18} />
          ) : (
            <Plus size={18} />
          )}
        </div>
      </button>

      {/* Answer */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-pink-100 px-6 py-5 leading-8 text-gray-600">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}