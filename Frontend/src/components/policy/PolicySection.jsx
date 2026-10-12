import { motion } from "framer-motion";

export default function PolicySection({
  title,
  children,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .45 }}
      className="rounded-3xl border border-rose-100 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <div className="space-y-4 leading-8 text-gray-600">
        {children}
      </div>
    </motion.section>
  );
}