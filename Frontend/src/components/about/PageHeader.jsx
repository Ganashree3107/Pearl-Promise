import { motion } from "framer-motion";

export default function PageHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-16 sm:py-20 lg:py-28">

      {/* Decorative Blurs */}
      <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-pink-200/40 blur-3xl sm:h-52 sm:w-52" />
      <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl sm:h-64 sm:w-64" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-semibold uppercase tracking-[0.35em] text-pink-600"
        >
          About Pearl Promise
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-6xl"
        >
          Healthy Skin,
          <br />
          Beautiful Confidence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8"
        >
          At Pearl Promise, we believe skincare should be simple, effective,
          and enjoyable. Every product is inspired by nature,
          supported by science, and created to help your skin glow
          with confidence every day.
        </motion.p>

      </div>
    </section>
  );
}